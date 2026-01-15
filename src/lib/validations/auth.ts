import * as z from "zod"

export const loginSchema = z.object({
  username: z.string().min(1, "Email or username or phone number is required"),
  password: z.string().min(1, "Password is required"),
})

export const signupSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().regex(/^62[0-9]{9,13}$/, "Invalid format (must start with 62, e.g., 62813...)"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>