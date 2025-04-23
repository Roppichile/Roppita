"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { useAuth } from "@/contexts/auth-context"

export default function LoginForm() {
  const router = useRouter()
  const { login, loginWithGoogle, error: authError, isLoading } = useAuth()
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }

    const result = await login(email, password)

    if (result.success) {
      router.push("/mi-cuenta")
    } else {
      setError(result.error || "Error al iniciar sesión")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle()
      if (result.success) {
        router.push("/mi-cuenta")
      } else {
        setError(result.error || "Error al iniciar sesión con Google")
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión con Google")
    }
  }

  return (
    <div className="space-y-4">
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

      {authError && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{authError}</div>}

      {!isEmailFormVisible ? (
        <>
          <Button
            variant="outline"
            className="w-full py-6 flex items-center justify-center gap-2 border-gray-300"
            onClick={() => setIsEmailFormVisible(true)}
          >
            <Mail className="h-5 w-5" />
            <span>Continuar con Email</span>
          </Button>

          <Button
            variant="outline"
            className="w-full py-6 flex items-center justify-center gap-2 border-gray-300"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <FcGoogle className="h-5 w-5" />
            <span>Continuar con Google</span>
          </Button>
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
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsEmailFormVisible(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Volver a las opciones de inicio de sesión
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
