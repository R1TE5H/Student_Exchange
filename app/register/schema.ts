import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*_)"
  );

const schema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(50, { message: "First name must be less than 50 characters" }),

    last_name: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(50, { message: "Last name must be less than 50 characters" }),

    email: z
      .string()
      .email("Invalid email address")
      .refine((email) => email.endsWith(".edu"), {
        message: "Email must end with .edu",
      }),

    password: passwordSchema,

    confirm_password: passwordSchema,
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirm_password"],
      });
    }
  });

export default schema;
