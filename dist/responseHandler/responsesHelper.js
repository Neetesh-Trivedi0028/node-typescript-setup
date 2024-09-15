"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendApiResponse = sendApiResponse;
exports.sendApiError = sendApiError;
const responseHandler_1 = require("./responseHandler");
// Adjust the import path
function sendApiResponse(res, statusCode, data, message = "Success") {
    const apiResponse = new responseHandler_1.ApiResponse(statusCode, data, message);
    return res.status(statusCode).json(apiResponse);
}
function sendApiError(res, statusCode, message = "Something went wrong", errors = []) {
    const apiError = new responseHandler_1.ApiError(statusCode, message, errors);
    return res.status(statusCode).json({
        statusCode: apiError.statusCode,
        message: apiError.message,
        success: apiError.success,
        errors: apiError.errors,
        data: apiError.data, // Add data in case you need it in error responses
    });
}
//# sourceMappingURL=responsesHelper.js.map