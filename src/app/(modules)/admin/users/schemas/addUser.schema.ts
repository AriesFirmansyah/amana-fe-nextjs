import { z } from "zod";

export const addUserSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(5, "Name must be at least 5 characters long."),
    email: z
      .string({
        required_error: "Email address is required",
      })
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(12, "Password must be at most 12 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      ),
    password_confirm: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(12, "Password must be at most 12 characters long.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirm) {
      const defaultErrorData = {
        code: z.ZodIssueCode.custom,
        fatal: true,
        message: "Passwords don't match.",
      };
      ctx.addIssue({
        ...defaultErrorData,
        path: ["password_confirm"],
      });
    }
  });
