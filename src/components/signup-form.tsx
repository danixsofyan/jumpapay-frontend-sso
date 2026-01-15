import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signupSchema, type SignupFormValues } from "@/lib/validations/auth"

interface SignupFormProps extends React.ComponentPropsWithoutRef<typeof Card> {
  onNavigateToLogin: () => void
}

export function SignupForm({ className, onNavigateToLogin, ...props }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormValues) => {
    console.log("Signup Submit:", data)
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-800" htmlFor="name">Full Name</Label>
            <Input {...register("name")} id="name" type="text" className={errors.name ? "border-red-500 mt-2" : "mt-2"} />
            {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-800" htmlFor="signup-username">Username</Label>
            <Input {...register("username")} id="signup-username" type="text" className={errors.username ? "border-red-500 mt-2" : "mt-2"} />
            {errors.username && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-800" htmlFor="phone">Phone Number</Label>
            <Input 
              {...register("phone")}
              id="phone" 
              type="tel" 
              className={errors.phone ? "border-red-500 mt-2" : "mt-2"}
            />
            {errors.phone ? (
              <p className="text-red-500 text-[10px] font-bold mt-1">{errors.phone.message}</p>
            ) : (
              <p className="text-[0.7rem] text-muted-foreground">
                Use 62 format (Example: 6281312341234)
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-800" htmlFor="email">Email</Label>
            <Input {...register("email")} id="email" type="email" className={errors.email ? "border-red-500 mt-2" : "mt-2"} />
            {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-800" htmlFor="password">Password</Label>
            <Input {...register("password")} id="password" type="password" className={errors.password ? "border-red-500 mt-2" : "mt-2"} />
            {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.password.message}</p>}
          </div>

          <div className="grid gap-4 mt-2">
            <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Create Account"}
            </Button>
            <Button variant="outline" type="button" className="w-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4 mr-2">
                <path fill="#4285F4" d="M24 9.5c3.54 0 6.01 1.54 7.39 2.83l5.42-5.42C33.51 3.96 29.08 2 24 2 14.82 2 7.14 7.64 3.95 15.34l6.63 5.14C12.14 14.6 17.6 9.5 24 9.5z" />
                <path fill="#34A853" d="M46.08 24.5c0-1.63-.15-3.18-.42-4.68H24v9.02h12.41c-.54 2.79-2.16 5.16-4.58 6.75l7.11 5.52C43.51 37.04 46.08 31.27 46.08 24.5z" />
                <path fill="#FBBC05" d="M10.58 28.48c-.48-1.4-.75-2.9-.75-4.48s.27-3.08.75-4.48l-6.63-5.14C2.67 17.35 2 20.58 2 24s.67 6.65 1.95 9.62l6.63-5.14z" />
                <path fill="#EA4335" d="M24 46c6.48 0 11.9-2.14 15.87-5.81l-7.11-5.52c-2 1.34-4.57 2.13-8.76 2.13-6.4 0-11.86-5.1-13.42-11.98l-6.63 5.14C7.14 40.36 14.82 46 24 46z" />
              </svg>
              Sign up with Google
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={onNavigateToLogin}
                className="text-[#2AB0E5] font-medium cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}