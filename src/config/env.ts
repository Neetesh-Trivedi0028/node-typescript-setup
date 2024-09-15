import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// configuring env values
dotenv.config();

/**
 * Object config
 * @description we are implementing some validation on env's values  !!
 * @returns  all env's object with key value pair
 */

export const config = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.DB_URL,
  bcryptIterations: process.env.BCRYPT_ITERATIONS,
  jwt: {
    privateKey: fs.readFileSync(
      path.resolve(__dirname, "../../", process.env.JWT_PRIVATE_KEY as string),
      "utf8"
    ),
    publicKey: fs.readFileSync(
      path.resolve(__dirname, "../../", process.env.JWT_PUBLIC_KEY as string),
      "utf8"
    ),
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION,
  },
};
