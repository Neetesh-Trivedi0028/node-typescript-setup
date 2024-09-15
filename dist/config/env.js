"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// configuring env values
dotenv_1.default.config();
/**
 * Object config
 * @description we are implementing some validation on env's values  !!
 * @returns  all env's object with key value pair
 */
exports.config = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.DB_URL,
    bcryptIterations: process.env.BCRYPT_ITERATIONS,
    jwt: {
        privateKey: fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../", process.env.JWT_PRIVATE_KEY), "utf8"),
        publicKey: fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../../", process.env.JWT_PUBLIC_KEY), "utf8"),
        refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
        accessExpiration: process.env.JWT_ACCESS_EXPIRATION,
    },
};
//# sourceMappingURL=env.js.map