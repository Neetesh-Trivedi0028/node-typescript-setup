import { z } from "zod";

// Zod schema for header validation
export const headerValidationSchema = z.object({
  "x-vip-chat-club-version": z.enum(["1.0.0"]),
  "x-vip-chat-club-accept-language": z.enum(["en"]),
  "x-vip-chat-club-platform": z.enum(["ios", "web", "android"]),
});
