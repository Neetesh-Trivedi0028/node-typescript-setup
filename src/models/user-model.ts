import mongoose, { Schema, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import { config } from "./../config/env";
import { UserRole, UserDocument } from "./../interfaces/IUser";

// User Table
const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false },
    profilePicture: { type: String, required: false },
    status: { type: Boolean, required: true, default: true },
    roles: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.fan,
    },
    isActive: { type: Boolean, default: true },
    deleteAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// converting password plain text to hashpassword

UserSchema.pre<UserDocument>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  /*    
    Used user.passwordHash! to assert that passwordHash is defined (since it's already checked with isModified). 
    This helps TypeScript understand that passwordHash will not be undefined at this point.
  */
  try {
    const saltRounds = parseInt(config.bcryptIterations as string, 10) || 10;
    user.passwordHash = await bcrypt.hash(user.passwordHash!, saltRounds);
    next();
  } catch (error) {
    next(error as CallbackError); // Cast the error to CallbackError
  }
});

// Method to compare the plain text password with the hashed password

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    // bcrypt.compare compares the plain password with the hashed password stored in the database
    return await bcrypt.compare(password, this.passwordHash);
  } catch (e) {
    return false; // Return false in case of any error
  }
};

const User = mongoose.model<UserDocument>("user", UserSchema);

export { User };
