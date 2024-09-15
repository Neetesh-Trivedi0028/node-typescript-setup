import { Response } from "express";
import { ApiError, ApiResponse } from "./responseHandler";
// Adjust the import path

export function sendApiResponse(
  res: Response,
  statusCode: number,
  data: any,
  message: string = "Success"
) {
  const apiResponse = new ApiResponse(statusCode, data, message);
  return res.status(statusCode).json(apiResponse);
}

export function sendApiError(
  res: Response,
  statusCode: number,
  message: string = "Something went wrong",
  errors: Array<object> = []
) {
  const apiError = new ApiError(statusCode, message, errors);

  return res.status(statusCode).json({
    statusCode: apiError.statusCode,
    message: apiError.message,
    success: apiError.success,
    errors: apiError.errors,
    data: apiError.data, // Add data in case you need it in error responses
  });
}
