import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[A-Za-z\d!@#$%^&*_]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*_)"
    ),
});

export default schema;
