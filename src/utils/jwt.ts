import jwt from "jsonwebtoken";
import { config } from "./../config/env";

// Load private and public keys from your environment variables or files
const privateKey = config.jwt.privateKey;
const publicKey = config.jwt.publicKey;

// Access Token expiration time (e.g., 15 minutes)
const accessTokenExpiration = config.jwt.accessExpiration;
// Refresh Token expiration time (e.g., 7 days)
const refreshTokenExpiration = config.jwt.refreshExpiration;

/**
 * Function to create both Access and Refresh tokens
 * @param payload - The payload data to encode in the token (e.g., user information)
 * @returns accessToken, refreshToken
 */
export function createTokens(payload: object) {
  try {
    // Create Access Token
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256", // Specify the signing algorithm
      expiresIn: accessTokenExpiration,
    });

    // Create Refresh Token
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256", // Specify the signing algorithm
      expiresIn: refreshTokenExpiration,
    });

    return { accessToken, refreshToken };
  } catch (err) {
    console.error("Error creating JWT tokens:", err);
    throw new Error("Token creation failed");
  }
}

/**
 * Function to verify a token (access or refresh)
 * @param token - The token to verify
 * @param type - The type of token ('access' or 'refresh')
 * @returns decoded token payload if valid, or throws error
 */
export function verifyToken(token: string, type: "access" | "refresh") {
  try {
    const secretKey = type === "access" ? publicKey : publicKey;
    const decoded = jwt.verify(token, secretKey, { algorithms: ["RS256"] });
    return decoded;
  } catch (err) {
    console.error("Error verifying token:", err);
    throw new Error("Invalid token");
  }
}
