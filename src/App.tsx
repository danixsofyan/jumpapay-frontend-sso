import * as React from "react"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { ForgotPasswordForm } from "@/components/forgot-password-form"
import { Toaster } from "sonner"

type AuthView = "login" | "signup" | "forgot-password"

function App() {
  const [view, setView] = React.useState<AuthView>("login")

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="https://jumpapay.com" className="flex items-center gap-2 self-center font-medium">
          <img src="/logo-Jumpapay.svg" alt="JumpaPay Logo" className="w-50" />
        </a>

        {view === "login" && (
          <LoginForm 
            onNavigateToSignup={() => setView("signup")} 
            onNavigateToForgot={() => setView("forgot-password")}
          />
        )}

        {view === "signup" && (
          <SignupForm 
            onNavigateToLogin={() => setView("login")} 
          />
        )}

        {view === "forgot-password" && (
          <ForgotPasswordForm 
            onNavigateToLogin={() => setView("login")} 
          />
        )}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App