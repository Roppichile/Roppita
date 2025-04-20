"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return { ok: false }
      }

      return { ok: true, user: data.user }
    } catch (err) {
      setError("Ocurrió un error al iniciar sesión")
      return { ok: false }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, userData: any) => {
    try {
      setIsLoading(true)
      setError(null)

      // Registrar usuario
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) {
        setError(error.message)
        return { ok: false }
      }

      return { ok: true, user: data.user }
    } catch (err) {
      setError("Ocurrió un error al registrar el usuario")
      return { ok: false }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  }
}
