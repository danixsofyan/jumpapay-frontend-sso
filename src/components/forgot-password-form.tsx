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
import { MailCheck } from "lucide-react"
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validations/auth"

interface ForgotPasswordProps extends React.ComponentPropsWithoutRef<"div"> {
  onNavigateToLogin: () => void
}

export function ForgotPasswordForm({ className, onNavigateToLogin, ...props }: ForgotPasswordProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordValues) => {
    console.log("Reset link requested for:", data.email)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className={cn("w-full", className)} {...props}>
        <CardContent className="pt-10 pb-10 text-center flex flex-col items-center gap-4">
          <div className="bg-[#2AB0E5]/10 p-3 rounded-full">
            <MailCheck className="h-10 w-10 text-[#2AB0E5]" />
          </div>
          <CardTitle className="text-xl">Check your email</CardTitle>
          <CardDescription className="px-2">
            We have sent a password reset link to your email address. Please check your inbox and follow the instructions.
          </CardDescription>
          <Button 
            onClick={onNavigateToLogin} 
            variant="outline" 
            className="mt-4 w-full cursor-pointer"
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-normal text-gray-800" htmlFor="reset-email">
              Email Address
            </Label>
            <Input 
              {...register("email")}
              id="reset-email" 
              type="email" 
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-[10px] font-bold mt-1">{errors.email.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center text-sm">
            <button 
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#2AB0E5] font-medium cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}