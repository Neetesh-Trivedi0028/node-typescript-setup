import { NextFunction } from "express";

// Define a custom interface to extend the default Request object
import { CustomRequest } from "./../interfaces/custom-header";

// Middleware to set custom properties in req object
export const setReqHeaders = (req: CustomRequest, next: NextFunction) => {
  req.customHeaders = {
    version: "1.0.0",
    acceptLanguage: "en",
    platform: "ios", // Or any other platform you want to dynamically set
  };
  next();
};
