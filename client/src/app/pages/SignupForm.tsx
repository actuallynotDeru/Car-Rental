import { SignupForm } from "@/features/login-page/signup"

// export const metadata = {
//   title: "Sign Up | Create Account",
//   description: "Create a new account to get started",
// }

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join us and get started in minutes</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}