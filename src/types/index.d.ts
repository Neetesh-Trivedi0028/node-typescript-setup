import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define this with a more specific type if possible
    }
  }
}
