import { ObjectId } from "mongoose";
import { User } from "../models/user-model";
import { UserSession } from "../models/user-session";
import bcrypt from "bcrypt";
import { config } from "./../config/env";

/**
 * Function findUserById
 * @param id - take id  to get user
 * @description here we are finding user based on id
 * @returns  information to client regarding that logout successfully!
 */

// Helper function to find user by ID
export const findUserById = async (_id: string) => {
  try {
    return await User.findOne({ _id });
  } catch (err) {
    return null; // Return null if user is not found
  }
};

/**
 * Function findUser
 * @param username   getting username
 * @param email  geting email
 * @param role  getting role
 * @description based on above param we are searching user  !!
 * @returns  user
 */
export const findUser = async (
  username: string,
  email: string,
  role: string
) => {
  try {
    return await User.findOne({ username, email, roles: role });
  } catch (err) {
    return null; // Return null if user is not found
  }
};

/**
 * Function createUser
 * @param username   getting username
 * @param email  geting email
 * @param role  getting role
 * @description based on above param we are creating  user  !!
 * @returns  user
 */

export const createUser = async (
  username: string,
  email: string,
  role: string
) => {
  try {
    const createdUser = await User.create({ username, email, roles: role });
    return createdUser;
  } catch (err) {
    return null; // Return null if user is not found
  }
};

/**
 * Function setupPassword
 * @param id   getting username
 * @param password  geting email
 * @description based on above param we are setup user password   !!
 * @returns  updated one
 */

export const setupPassword = async (_id: ObjectId, password: string) => {
  try {
    // Hash the password before updating
    const saltRounds = parseInt(config.bcryptIterations as string, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const updatePasswordUser = await User.findOneAndUpdate(
      { _id }, // Filter by _id
      { $set: { passwordHash: hashedPassword } }, // Update the passwordHash field
      { new: true } // Return the updated document
    );
    return updatePasswordUser;
  } catch (err) {
    console.error("Error updating password:", err);
    return null; // Return null if update fails
  }
};

/**
 * Function findExistUser
 * @param email   getting email
 * @description based on above param we are search user  !!
 * @returns  searched user
 */

export const findExistUser = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    console.error("Error:", err);
    return null; // Return null if user is not found
  }
};

/**
 * Function createSession
 * @param userId   getting userid
 *  @param deviceType   getting deviceType
 * @description based on above param we are creating session   !!
 * @returns  created sessions
 */

// creating session
export const createSession = async (userId: ObjectId, deviceType: string) => {
  try {
    const createdSession = await UserSession.create({ userId, deviceType });
    return createdSession;
  } catch (err) {
    console.error("Error :", err);
    return null; // Return null if user is not found
  }
};

// for logut , deactivated the session

/**
 * Function createSession
 * @param userId   getting userid
 *  @param deviceType   getting deviceType
 * @description based on above param we are deactivated session   !!
 * @returns  deactivated sessions
 */

// finding active session and makeing deactivated !
export const activeSession = async (userId: ObjectId, deviceType: string) => {
  try {
    const activeSession = await UserSession.findOneAndUpdate(
      { userId, deviceType, isActive: true },
      { $set: { isActive: false } },
      { new: true } // Return the updated document
    );
    return activeSession;
  } catch (err) {
    console.error("Error deactivating session:", err);
    return null; // Return null if user is not found
  }
};
