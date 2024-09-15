"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.ApiResponse = void 0;
//This will handle all type of response all over the project
class ApiResponse {
    constructor(statusCode, data, message = "Success", link, count) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.link = link;
        this.count = count;
    }
}
exports.ApiResponse = ApiResponse;
//This will handle all type of errors all over the project
class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", // Ensure a default message is provided
    errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message; // Set the message property
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=responseHandler.js.map