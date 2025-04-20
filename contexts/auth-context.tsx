"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useFirebaseAuth } from "@/hooks/use-firebase-auth"
import type { User } from "firebase/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  register: (email: string, password: string, userData: any) => Promise<any>
  login: (email: string, password: string) => Promise<any>
  loginWithGoogle: () => Promise<any>
  loginWithFacebook: () => Promise<any>
  logout: () => Promise<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
