"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeSession = exports.createSession = exports.findExistUser = exports.setupPassword = exports.createUser = exports.findUser = exports.findUserById = void 0;
const user_model_1 = require("../models/user-model");
const user_session_1 = require("../models/user-session");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("./../config/env");
/**
 * Function findUserById
 * @param id - take id  to get user
 * @description here we are finding user based on id
 * @returns  information to client regarding that logout successfully!
 */
// Helper function to find user by ID
const findUserById = async (_id) => {
    try {
        return await user_model_1.User.findOne({ _id });
    }
    catch (err) {
        return null; // Return null if user is not found
    }
};
exports.findUserById = findUserById;
/**
 * Function findUser
 * @param username   getting username
 * @param email  geting email
 * @param role  getting role
 * @description based on above param we are searching user  !!
 * @returns  user
 */
const findUser = async (username, email, role) => {
    try {
        return await user_model_1.User.findOne({ username, email, roles: role });
    }
    catch (err) {
        return null; // Return null if user is not found
    }
};
exports.findUser = findUser;
/**
 * Function createUser
 * @param username   getting username
 * @param email  geting email
 * @param role  getting role
 * @description based on above param we are creating  user  !!
 * @returns  user
 */
const createUser = async (username, email, role) => {
    try {
        const createdUser = await user_model_1.User.create({ username, email, roles: role });
        return createdUser;
    }
    catch (err) {
        return null; // Return null if user is not found
    }
};
exports.createUser = createUser;
/**
 * Function setupPassword
 * @param id   getting username
 * @param password  geting email
 * @description based on above param we are setup user password   !!
 * @returns  updated one
 */
const setupPassword = async (_id, password) => {
    try {
        // Hash the password before updating
        const saltRounds = parseInt(env_1.config.bcryptIterations, 10) || 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const updatePasswordUser = await user_model_1.User.findOneAndUpdate({ _id }, // Filter by _id
        { $set: { passwordHash: hashedPassword } }, // Update the passwordHash field
        { new: true } // Return the updated document
        );
        return updatePasswordUser;
    }
    catch (err) {
        console.error("Error updating password:", err);
        return null; // Return null if update fails
    }
};
exports.setupPassword = setupPassword;
/**
 * Function findExistUser
 * @param email   getting email
 * @description based on above param we are search user  !!
 * @returns  searched user
 */
const findExistUser = async (email) => {
    try {
        return await user_model_1.User.findOne({ email });
    }
    catch (err) {
        console.error("Error:", err);
        return null; // Return null if user is not found
    }
};
exports.findExistUser = findExistUser;
/**
 * Function createSession
 * @param userId   getting userid
 *  @param deviceType   getting deviceType
 * @description based on above param we are creating session   !!
 * @returns  created sessions
 */
// creating session
const createSession = async (userId, deviceType) => {
    try {
        const createdSession = await user_session_1.UserSession.create({ userId, deviceType });
        return createdSession;
    }
    catch (err) {
        console.error("Error :", err);
        return null; // Return null if user is not found
    }
};
exports.createSession = createSession;
// for logut , deactivated the session
/**
 * Function createSession
 * @param userId   getting userid
 *  @param deviceType   getting deviceType
 * @description based on above param we are deactivated session   !!
 * @returns  deactivated sessions
 */
// finding active session and makeing deactivated !
const activeSession = async (userId, deviceType) => {
    try {
        const activeSession = await user_session_1.UserSession.findOneAndUpdate({ userId, deviceType, isActive: true }, { $set: { isActive: false } }, { new: true } // Return the updated document
        );
        return activeSession;
    }
    catch (err) {
        console.error("Error deactivating session:", err);
        return null; // Return null if user is not found
    }
};
exports.activeSession = activeSession;
//# sourceMappingURL=user-service.js.map