"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeaders = void 0;
const header_validation_1 = require("./../validators/header-validation");
const statusCodes_1 = require("../constants/statusCodes");
const responsesHelper_1 = require("../responseHandler/responsesHelper");
const zod_1 = require("zod");
// Middleware to validate headers
const validateHeaders = (req, res, next) => {
    const headers = {
        "x-vip-chat-club-version": req.headers["x-vip-chat-club-version"],
        "x-vip-chat-club-accept-language": req.headers["x-vip-chat-club-accept-language"],
        "x-vip-chat-club-platform": req.headers["x-vip-chat-club-platform"],
    };
    try {
        header_validation_1.headerValidationSchema.parse(headers);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const validationErrors = error.errors
                .map((err) => err.message)
                .join(", ");
            return (0, responsesHelper_1.sendApiError)(res, statusCodes_1.statusCodes.BadRequest, `Invalid headers: ${validationErrors}`);
        }
        next(error); // Pass any other errors to the error handling middleware
    }
};
exports.validateHeaders = validateHeaders;
//# sourceMappingURL=validate-headers-middleware.js.map