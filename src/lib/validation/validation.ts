import * as z from "zod";

// Authentication
export const SignUpValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Too short" })
    .max(30, { message: "Too long" }),
  username: z.string().min(2).max(30),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const SigInpValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

// Create Post
export const PostFormValidationSchema = z.object({
  caption: z.string().min(2).max(2200, {
    message: "Maximum 2200 characters.",
  }),
  file: z.string().min(2).max(30),
  location: z.string().min(2).max(30),
  tags: z.string().min(2).max(30),
});
