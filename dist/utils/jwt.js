"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = createTokens;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./../config/env");
// Load private and public keys from your environment variables or files
const privateKey = env_1.config.jwt.privateKey;
const publicKey = env_1.config.jwt.publicKey;
// Access Token expiration time (e.g., 15 minutes)
const accessTokenExpiration = env_1.config.jwt.accessExpiration;
// Refresh Token expiration time (e.g., 7 days)
const refreshTokenExpiration = env_1.config.jwt.refreshExpiration;
/**
 * Function to create both Access and Refresh tokens
 * @param payload - The payload data to encode in the token (e.g., user information)
 * @returns accessToken, refreshToken
 */
function createTokens(payload) {
    try {
        // Create Access Token
        const accessToken = jsonwebtoken_1.default.sign(payload, privateKey, {
            algorithm: "RS256", // Specify the signing algorithm
            expiresIn: accessTokenExpiration,
        });
        // Create Refresh Token
        const refreshToken = jsonwebtoken_1.default.sign(payload, privateKey, {
            algorithm: "RS256", // Specify the signing algorithm
            expiresIn: refreshTokenExpiration,
        });
        return { accessToken, refreshToken };
    }
    catch (err) {
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
function verifyToken(token, type) {
    try {
        const secretKey = type === "access" ? publicKey : publicKey;
        const decoded = jsonwebtoken_1.default.verify(token, secretKey, { algorithms: ["RS256"] });
        return decoded;
    }
    catch (err) {
        console.error("Error verifying token:", err);
        throw new Error("Invalid token");
    }
}
//# sourceMappingURL=jwt.js.map