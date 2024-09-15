import { Response, NextFunction } from "express";
import { verifyToken, createTokens } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { findUserById } from "../services/user-service";
import { CustomRequest } from "../interfaces/IUser";
/**
 * Helper function to verify tokens (either access or refresh).
 * If an access token is expired, return null. For refresh tokens, return null if invalid.
 */
const verifyTokenWithType = (token: string, type: "access" | "refresh") => {
  try {
    return verifyToken(token, type);
  } catch (err) {
    if (type === "access" && err instanceof jwt.TokenExpiredError) {
      return null; // Access token expired
    }
    return null; // Invalid token (for both access or refresh)
  }
};

/**
 * Middleware to handle token refresh when access token expires.
 * Refreshes tokens if valid refresh token is present.
 */
const handleTokenExpiration = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"] as string | undefined;
  const refreshToken = req.headers["refreshauthorization"] as
    | string
    | undefined;

  // Skip authentication for specific routes (e.g., Swagger or favicon)
  if (
    req.url.startsWith("/api/swagger/") ||
    req.url.startsWith("/favicon.ico") ||
    req.url.startsWith("/api/register") ||
    req.url.startsWith("/api/login")
  ) {
    console.log("Skipping auth for Swagger or favicon route");
    return next();
  }
  // Step 1: Verify access token
  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing" });
  }

  const decodedAccessToken = verifyTokenWithType(accessToken, "access");
  if (decodedAccessToken) {
    const { userId } = decodedAccessToken as { userId: string };
    const user = await findUserById(userId);
    req.user = user;
    return next(); // Valid access token, proceed to next middleware/route
  }

  // Step 2: If access token expired, verify refresh token
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const decodedRefreshToken = verifyTokenWithType(refreshToken, "refresh");
  if (!decodedRefreshToken) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  // Step 3: Find user and issue new tokens
  const { userId, sessionId, role } = decodedRefreshToken as {
    userId: string;
    sessionId: string;
    role: string;
  };
  const user = await findUserById(userId);
  console.log("look on user", user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Step 4: Create new tokens and attach to headers
  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    createTokens({
      userId,
      sessionId,
      role,
    });

  res.setHeader("x-access-token", newAccessToken);
  res.setHeader("x-refresh-token", newRefreshToken);

  req.user = user;
  return next();
};

export default handleTokenExpiration;
