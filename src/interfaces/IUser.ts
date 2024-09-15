import { Document } from "mongoose";
import { Request } from "express";

/**
 * UserRole interface
 * @description we are defining user role interface  !!
 */
export enum UserRole {
  vvip = "vvip",
  fan = "fan",
}

/**
 * UserDocument interface
 * @description we are defining user  interface for user schema  !!
 */
export interface UserDocument extends Document {
  username: string;
  email: string;
  passwordHash?: string;
  profilePicture?: string;
  status: boolean;
  roles: UserRole;
  isActive: boolean;
  deleteAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// Extend the Express Request type to include 'user'
export interface CustomRequest extends Request {
  user?: any; // You can change `any` to a specific type, like `User` if you have a user model
}

/*
export enum DeviceType {
  Mobile = 'mobile',
  Desktop = 'desktop',
  Tablet = 'tablet',
}

*/
