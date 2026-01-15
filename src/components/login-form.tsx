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
import { Eye, EyeOff } from "lucide-react"
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth"
import { apiClient, CLIENT_ID } from "@/lib/api"
import { setAccessToken } from "@/services/auth-token"
import { clients, type SSOClient } from "@/services/sso-clients"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  onNavigateToSignup: () => void
  onNavigateToForgot: () => void
}

interface LoginResponse {
  success: boolean
  message: string
  results: {
    accessToken: string
    user: {
      name: string
      [key: string]: unknown
    }
  }
}

export function LoginForm({
  className,
  onNavigateToSignup,
  onNavigateToForgot,
  ...props
}: LoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues): Promise<void> => {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login/internal", {
        user: data.username,
        password: data.password,
        clientId: CLIENT_ID,
        returnTo: "",
      })

      const { success, results, message } = response.data

      if (success && results.accessToken) {
        setAccessToken(results.accessToken)
        toast.success(`Welcome back, ${results.user.name}!`)

        const targetClient = clients.find((c: SSOClient) => c.id === CLIENT_ID)
        const redirectUri = targetClient?.redirect_uris[0]

        if (redirectUri) {
          setTimeout(() => {
            window.location.href = `${redirectUri}?token=${results.accessToken}`
          }, 1000)
        }
      } else {
        toast.error(message || "Login failed")
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>
        toast.error(axiosError.response?.data?.message || "Invalid credentials")
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-4 w-4 mr-2"
                  >
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.01 1.54 7.39 2.83l5.42-5.42C33.51 3.96 29.08 2 24 2 14.82 2 7.14 7.64 3.95 15.34l6.63 5.14C12.14 14.6 17.6 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.08 24.5c0-1.63-.15-3.18-.42-4.68H24v9.02h12.41c-.54 2.79-2.16 5.16-4.58 6.75l7.11 5.52C43.51 37.04 46.08 31.27 46.08 24.5z" />
                    <path fill="#FBBC05" d="M10.58 28.48c-.48-1.4-.75-2.9-.75-4.48s.27-3.08.75-4.48l-6.63-5.14C2.67 17.35 2 20.58 2 24s.67 6.65 1.95 9.62l6.63-5.14z" />
                    <path fill="#EA4335" d="M24 46c6.48 0 11.9-2.14 15.87-5.81l-7.11-5.52c-2 1.34-4.57 2.13-8.76 2.13-6.4 0-11.86-5.1-13.42-11.98l-6.63 5.14C7.14 40.36 14.82 46 24 46z" />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-800" htmlFor="username">Email / Username / Phone number</Label>
                  <Input
                    {...register("username")}
                    id="username"
                    type="text"
                    className={errors.username ? "border-red-500 mt-2" : "mt-2"}
                  />
                  {errors.username && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.username.message}</p>}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="text-sm text-gray-800" htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={onNavigateToForgot}
                      className="ml-auto text-sm underline-offset-4 font-medium hover:text-[#2AB0E5] cursor-pointer"
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={cn("pr-10", errors.password ? "border-red-500" : "")}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">Toggle Password</span>
                    </Button>
                  </div>
                  {errors.password && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={onNavigateToSignup}
                  className="font-medium hover:text-[#2AB0E5] cursor-pointer"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}