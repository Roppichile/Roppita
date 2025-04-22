"use client"

import { useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "./use-auth"

interface CartItem {
  id: number
  user_id: string
  product_id: number
  quantity: number
  created_at: string
  products?: {
    id: number
    name: string
    price: number
    images: string[]
  }
}

export function useCart() {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCart = useCallback(async () => {
    if (!user) return []

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products(id, name, price, images)
        `)
        .eq("user_id", user.id)

      if (error) {
        throw new Error(error.message)
      }

      setCartItems(data || [])
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar el carrito"
      setError(errorMessage)
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }, [user])

  const addToCart = async (productId: number, quantity = 1) => {
    if (!user) {
      setError("Debes iniciar sesión para añadir productos al carrito")
      return null
    }

    try {
      setLoading(true)
      setError(null)

      // Verificar si el producto ya está en el carrito
      const { data: existingItems } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", productId)

      if (existingItems && existingItems.length > 0) {
        // Actualizar cantidad
        const { data, error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItems[0].quantity + quantity })
          .eq("id", existingItems[0].id)
          .select()

        if (error) {
          throw new Error(error.message)
        }

        await fetchCart()
        return data[0]
      } else {
        // Añadir nuevo item
        const { data, error } = await supabase
          .from("cart_items")
          .insert([
            {
              user_id: user.id,
              product_id: productId,
              quantity,
            },
          ])
          .select()

        if (error) {
          throw new Error(error.message)
        }

        await fetchCart()
        return data[0]
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al añadir al carrito"
      setError(errorMessage)
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateCartItem = async (itemId: number, quantity: number) => {
    if (!user) return null

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId)
        .eq("user_id", user.id)
        .select()

      if (error) {
        throw new Error(error.message)
      }

      await fetchCart()
      return data[0]
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al actualizar el carrito"
      setError(errorMessage)
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId: number) => {
    if (!user) return false

    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.from("cart_items").delete().eq("id", itemId).eq("user_id", user.id)

      if (error) {
        throw new Error(error.message)
      }

      await fetchCart()
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar del carrito"
      setError(errorMessage)
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    if (!user) return false

    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

      if (error) {
        throw new Error(error.message)
      }

      setCartItems([])
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al vaciar el carrito"
      setError(errorMessage)
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Calcular el total del carrito
  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.products?.price || 0
    return total + price * item.quantity
  }, 0)

  return {
    cartItems,
    cartTotal,
    loading,
    error,
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  }
}
