"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { GitlabIcon, GithubIcon as Bitbucket, KeyRound, LockKeyhole } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export default function LoginForm() {
  const router = useRouter()
  const { login, error: authError, isLoading } = useAuth()
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const showEmailForm = () => {
    setIsEmailFormVisible(true)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }

    const result = await login(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Error al iniciar sesión")
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

      {authError && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{authError}</div>}

      {!isEmailFormVisible ? (
        <>
          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <GitHubLogoIcon className="h-5 w-5" />
            <span>Continue with GitHub</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <GitlabIcon className="h-5 w-5" />
            <span>Continue with GitLab</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <Bitbucket className="h-5 w-5" />
            <span>Continue with Bitbucket</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <LockKeyhole className="h-5 w-5" />
            <span>Continue with SAML SSO</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <KeyRound className="h-5 w-5" />
            <span>Login with Passkey</span>
          </Button>

          <div className="text-center mt-4">
            <button onClick={showEmailForm} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Continue with Email →
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Log In"}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsEmailFormVisible(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to all login options
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
