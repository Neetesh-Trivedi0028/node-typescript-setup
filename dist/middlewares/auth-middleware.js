"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user-service");
/**
 * Helper function to verify tokens (either access or refresh).
 * If an access token is expired, return null. For refresh tokens, return null if invalid.
 */
const verifyTokenWithType = (token, type) => {
    try {
        return (0, jwt_1.verifyToken)(token, type);
    }
    catch (err) {
        if (type === "access" && err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return null; // Access token expired
        }
        return null; // Invalid token (for both access or refresh)
    }
};
/**
 * Middleware to handle token refresh when access token expires.
 * Refreshes tokens if valid refresh token is present.
 */
const handleTokenExpiration = async (req, res, next) => {
    const accessToken = req.headers["authorization"];
    const refreshToken = req.headers["refreshauthorization"];
    // Skip authentication for specific routes (e.g., Swagger or favicon)
    if (req.url.startsWith("/api/swagger/") ||
        req.url.startsWith("/favicon.ico") ||
        req.url.startsWith("/api/register") ||
        req.url.startsWith("/api/login")) {
        console.log("Skipping auth for Swagger or favicon route");
        return next();
    }
    // Step 1: Verify access token
    if (!accessToken) {
        return res.status(401).json({ message: "Access token missing" });
    }
    const decodedAccessToken = verifyTokenWithType(accessToken, "access");
    if (decodedAccessToken) {
        const { userId } = decodedAccessToken;
        const user = await (0, user_service_1.findUserById)(userId);
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
    const { userId, sessionId, role } = decodedRefreshToken;
    const user = await (0, user_service_1.findUserById)(userId);
    console.log("look on user", user);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Step 4: Create new tokens and attach to headers
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (0, jwt_1.createTokens)({
        userId,
        sessionId,
        role,
    });
    res.setHeader("x-access-token", newAccessToken);
    res.setHeader("x-refresh-token", newRefreshToken);
    req.user = user;
    return next();
};
exports.default = handleTokenExpiration;
//# sourceMappingURL=auth-middleware.js.map