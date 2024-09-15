import { Request, Response } from "express";
import {
  findUser,
  createUser,
  createSession,
  setupPassword,
  findExistUser,
  activeSession,
} from "../services/user-service";
import { createTokens } from "../utils/jwt";
import { ObjectId } from "mongoose";
import { CustomRequest } from "../interfaces/IUser";
import { sendApiResponse } from "../responseHandler/responsesHelper";
import { statusCodes } from "../constants/statusCodes";

/**
 * Function register
 * @param req - take req  to get user
 * @param res -just to send response to client
 *  @description here we are insert new user in to Database !!
 * @returns access token, refresh token and user details as wel.
 */

export const register = async (req: Request, res: Response) => {
  const { email, role, username } = req.body;

  // 1) Check if the user already exists
  const findUsers = await findUser(username, email, role);
  if (findUsers) {
    return sendApiResponse(res, statusCodes.BadRequest, "User already exists!");

    // return res.status(400).json({ message: "User already exists!" });
  }

  // 2) Create a new user
  const newUser = await createUser(username, email, role);
  if (!newUser) {
    return sendApiResponse(
      res,
      statusCodes.InternalServerError,
      "Error creating user!"
    );

    // return res.status(500).json({ message: "Error creating user!" });
  }

  // creating session
  // Ensure newUser._id is treated as ObjectId
  const userId = newUser._id as ObjectId;
  // Ensure platform is a string or provide a default value
  const platform = req.headers["x-vip-chat-club-platform"];
  const platformString = Array.isArray(platform)
    ? platform[0]
    : platform ?? "ios";
  const session = await createSession(userId, platformString);
  if (!session) {
    return sendApiResponse(
      res,
      statusCodes.InternalServerError,
      "Error creating session!"
    );
    // return res.status(500).json({ message: "Error creating session!" });
  }

  // 3) Generate tokens
  const { accessToken, refreshToken } = createTokens({
    userId: newUser._id,
    sessionId: session._id,
    role: newUser.roles,
  });

  // 4) Send response with tokens
  return res.status(200).json({
    message: "Registration successful!",
    accessToken,
    refreshToken,
    user: {
      id: newUser._id,
      email: newUser.email,
      roles: newUser.roles,
    },
  });
};

/**
 * Function passwordsetup
 * @param req - take req  to get payload data
 *  @description here we are setuping the password for new user  !!
 * @param res - just to send response to client
 * @returns  information to client regarding that Password updated successfully!
 */

// password setup
export const passwordsetup = async (req: CustomRequest, res: Response) => {
  const { password } = req.body;
  console.log("req.body", req.body);
  console.log("req.user", req.user);

  const { _id } = req.user;

  const updatedPassword = await setupPassword(_id, password);

  if (updatedPassword) {
    return res.status(200).json({ message: "Password updated successfully!" });
  } else {
    return res.status(500).json({ message: "Error updating password!" });
  }
};

/**
 * Function login
 * @param req - take req  to get payload data
 * @param res - just to send response to client
 *  @description here we are performing login operation !!
 * @returns  access token, refresh token and user details as wel.
 */

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log("reqbody", req.body);
  console.log("look on login controller==", email, password);

  // 1) Check if the user exists
  const findUser = await findExistUser(email);
  if (!findUser) {
    return res.status(404).json({ message: "Invalid credentials!!" });
  }

  // 2) Verify the password
  const isPasswordCorrect = await findUser.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // 3) If user is found and password matches, proceed with login and generate tokens
  // create session
  // Ensure newUser._id is treated as ObjectId
  const userId = findUser._id as ObjectId;
  const platform = req.headers["x-vip-chat-club-platform"];
  const platformString = Array.isArray(platform)
    ? platform[0]
    : platform ?? "ios";
  // check is there any active session on basic of user and deviceType makeing it deactivated !
  await activeSession(userId, platformString);
  const session = await createSession(userId, platformString);
  if (!session) {
    return res.status(500).json({ message: "Error creating session!" });
  }
  // Generate tokens
  const { accessToken, refreshToken } = createTokens({
    userId,
    sessionId: session._id,
    role: findUser.roles,
  });
  return res.status(200).json({
    message: "Login successful!",
    accessToken,
    refreshToken,
    user: {
      id: findUser._id,
      email: findUser.email,
      roles: findUser.roles,
    },
  });
};

/**
 * Function logout
 * @param req - take req  to get user
 * @param res - just to send response to client
 *  @description here we are performing logout operation !!
 * @returns  information to client regarding that logout successfully!
 */

// logout
export const logout = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  const platform = req.headers["x-vip-chat-club-platform"];
  const platformString = Array.isArray(platform)
    ? platform[0]
    : platform ?? "ios";
  // check is there any active session on basic of user and deviceType makeing it deactivated !
  const logout = await activeSession(_id, platformString);

  if (logout) {
    return res.status(200).json({ message: "successfully logout !" });
  } else {
    return res.status(500).json({ message: "already logout!" });
  }
};

/**
 * Function logout
 * @param req - take req  to get user
 * @param res - just to send response to client
 * @description It is for testing perpose only !!
 * @returns  information to client regarding that logout successfully!
 */
export const testapi = async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;
  return res
    .status(200)
    .json({ userId: _id, message: "successfully access this api  !" });
};
