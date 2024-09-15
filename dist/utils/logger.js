"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// logger.ts
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
// Define the log format
const logFormat = winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});
// Create a daily rotate file transport
const dailyRotateFileTransport = new winston_1.default.transports.DailyRotateFile({
    filename: "application-%DATE%.log",
    dirname: "logs",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
});
// Create a console transport
const consoleTransport = new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp(), logFormat),
});
// Create the logger instance
const logger = winston_1.default.createLogger({
    level: "info", // Set the default log level
    transports: [dailyRotateFileTransport, consoleTransport],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map