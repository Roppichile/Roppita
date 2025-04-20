"use client"

import { useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Registro con email y contraseña
  const register = async (email: string, password: string, userData: { firstName: string; lastName: string }) => {
    try {
      setLoading(true)
      setError(null)

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Actualizar el perfil del usuario
      await updateProfile(userCredential.user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
      })

      // Crear documento de usuario en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        role: "customer",
      })

      return { success: true, user: userCredential.user }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Inicio de sesión con email y contraseña
  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      setError(null)

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Inicio de sesión con Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)

      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

      // Si no existe, crear el documento
      if (!userDoc.exists()) {
        const names = userCredential.user.displayName?.split(" ") || ["", ""]
        await setDoc(doc(db, "users", userCredential.user.uid), {
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          role: "customer",
        })
      }

      return { success: true, user: userCredential.user }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Inicio de sesión con Facebook
  const loginWithFacebook = async () => {
    try {
      setLoading(true)
      setError(null)

      const provider = new FacebookAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))

      // Si no existe, crear el documento
      if (!userDoc.exists()) {
        const names = userCredential.user.displayName?.split(" ") || ["", ""]
        await setDoc(doc(db, "users", userCredential.user.uid), {
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          email: userCredential.user.email,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          role: "customer",
        })
      }

      return { success: true, user: userCredential.user }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (err: any) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  return {
    user,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  }
}
