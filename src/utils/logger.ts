// logger.ts
import winston from "winston";
import "winston-daily-rotate-file";

// Define the log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create a daily rotate file transport
const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: "application-%DATE%.log",
  dirname: "logs",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

// Create a console transport
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    logFormat
  ),
});

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Set the default log level
  transports: [dailyRotateFileTransport, consoleTransport],
});

export default logger;
