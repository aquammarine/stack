import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(12, "Password must be at least 12 characters long"),
});

type loginFormValues = z.infer<typeof loginSchema>;

export { loginSchema, type loginFormValues };
