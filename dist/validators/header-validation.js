"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.headerValidationSchema = void 0;
const zod_1 = require("zod");
// Zod schema for header validation
exports.headerValidationSchema = zod_1.z.object({
    "x-vip-chat-club-version": zod_1.z.enum(["1.0.0"]),
    "x-vip-chat-club-accept-language": zod_1.z.enum(["en"]),
    "x-vip-chat-club-platform": zod_1.z.enum(["ios", "web", "android"]),
});
//# sourceMappingURL=header-validation.js.map