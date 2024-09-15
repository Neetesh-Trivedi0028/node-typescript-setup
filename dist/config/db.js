"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
/**
 * Function createSession
 * @description we are connecting Database !
 * @returns  db function
 */
const connectDB = async () => {
    try {
        const mongoURI = env_1.config.mongoURI;
        if (!mongoURI) {
            throw new Error("Mongo URI is not defined");
        }
        await mongoose_1.default.connect(mongoURI);
        console.info("MongoDB connected");
    }
    catch (error) {
        console.error("Database connection error:", error instanceof Error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map