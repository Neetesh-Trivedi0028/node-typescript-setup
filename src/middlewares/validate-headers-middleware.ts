import { Request, Response, NextFunction } from "express";
import { headerValidationSchema } from "./../validators/header-validation";
import { statusCodes } from "../constants/statusCodes";
import { sendApiError } from "../responseHandler/responsesHelper";
import { ZodError } from "zod";

// Middleware to validate headers
export const validateHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = {
    "x-vip-chat-club-version": req.headers["x-vip-chat-club-version"],
    "x-vip-chat-club-accept-language":
      req.headers["x-vip-chat-club-accept-language"],
    "x-vip-chat-club-platform": req.headers["x-vip-chat-club-platform"],
  };
  try {
    headerValidationSchema.parse(headers);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const validationErrors = error.errors
        .map((err) => err.message)
        .join(", ");
      return sendApiError(
        res,
        statusCodes.BadRequest,
        `Invalid headers: ${validationErrors}`
      );
    }
    next(error); // Pass any other errors to the error handling middleware
  }
};
