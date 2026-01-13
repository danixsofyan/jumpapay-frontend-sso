import { LoginForm } from "@/components/login-form"

function App() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="https://jumpapay.com" className="flex items-center gap-2 self-center font-medium">
          <img src="/logo-Jumpapay.svg" alt="JumpaPay Logo" className="w-50" />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}

export default App