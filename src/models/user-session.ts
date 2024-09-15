import mongoose, { Schema } from "mongoose";
import { UserSessionDocument } from "./../interfaces/user-session";

// Session Table
const sessionSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    deviceType: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const UserSession = mongoose.model<UserSessionDocument>(
  "userSession",
  sessionSchema
);

export { UserSession };
