"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("./../config/env");
const IUser_1 = require("./../interfaces/IUser");
// User Table
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false },
    profilePicture: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    roles: {
        type: String,
        enum: Object.values(IUser_1.UserRole),
        default: IUser_1.UserRole.fan,
    },
    isActive: { type: Boolean, default: true },
    deleteAt: { type: Date, default: null },
}, { timestamps: true });
// converting password plain text to hashpassword
UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    /*
      Used user.passwordHash! to assert that passwordHash is defined (since it's already checked with isModified).
      This helps TypeScript understand that passwordHash will not be undefined at this point.
    */
    try {
        const saltRounds = parseInt(env_1.config.bcryptIterations, 10) || 10;
        user.passwordHash = await bcrypt_1.default.hash(user.passwordHash, saltRounds);
        next();
    }
    catch (error) {
        next(error); // Cast the error to CallbackError
    }
});
// Method to compare the plain text password with the hashed password
UserSchema.methods.comparePassword = async function (password) {
    try {
        // bcrypt.compare compares the plain password with the hashed password stored in the database
        return await bcrypt_1.default.compare(password, this.passwordHash);
    }
    catch (e) {
        return false; // Return false in case of any error
    }
};
const User = mongoose_1.default.model("user", UserSchema);
exports.User = User;
//# sourceMappingURL=user-model.js.map