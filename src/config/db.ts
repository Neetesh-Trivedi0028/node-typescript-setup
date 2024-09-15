import mongoose from "mongoose";
import { config } from "./env";

/**
 * Function createSession
 * @description we are connecting Database !
 * @returns  db function
 */

const connectDB = async () => {
  try {
    const mongoURI = config.mongoURI;
    if (!mongoURI) {
      throw new Error("Mongo URI is not defined");
    }
    await mongoose.connect(mongoURI);
    console.info("MongoDB connected");
  } catch (error) {
    console.error("Database connection error:", error instanceof Error);
    process.exit(1);
  }
};

export default connectDB;
