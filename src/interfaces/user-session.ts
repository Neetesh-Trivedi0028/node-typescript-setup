import { Document } from "mongoose";

// Interface for the session schema fields
export interface IUserSession {
  userId: string;
  deviceType: string;
  isActive: boolean;
  deleteAt: Date | null;
}

// Document interface extending mongoose.Document
export interface UserSessionDocument extends IUserSession, Document {
  createdAt: Date;
  updatedAt: Date;
}
