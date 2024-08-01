import { z } from "zod";

export const userSchema = z
  .object({
    userName: z.string().trim().min(3),
    phone: z.string().min(0),
    email: z.string().email().trim(),
    password: z.string().min(6).max(255).trim(),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
