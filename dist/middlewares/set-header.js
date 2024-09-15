"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReqHeaders = void 0;
// Middleware to set custom properties in req object
const setReqHeaders = (req, next) => {
    req.customHeaders = {
        version: "1.0.0",
        acceptLanguage: "en",
        platform: "ios", // Or any other platform you want to dynamically set
    };
    next();
};
exports.setReqHeaders = setReqHeaders;
//# sourceMappingURL=set-header.js.map