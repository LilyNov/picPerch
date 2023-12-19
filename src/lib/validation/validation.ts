import * as z from "zod";

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
