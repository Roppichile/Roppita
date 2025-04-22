"use client"

import { useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  images: string[]
  status: string
  seller_id: string
  condition: string
  created_at: string
}

interface ProductFilters {
  category_id?: number
  condition?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async (filters: ProductFilters = {}) => {
    try {
      setLoading(true)
      setError(null)

      // Iniciar la consulta
      let query = supabase
        .from("products")
        .select(`
          *,
          categories(name),
          profiles(first_name, last_name)
        `)
        .eq("status", "active")

      // Aplicar filtros
      if (filters.category_id) {
        query = query.eq("category_id", filters.category_id)
      }

      if (filters.condition) {
        query = query.eq("condition", filters.condition)
      }

      if (filters.minPrice) {
        query = query.gte("price", filters.minPrice)
      }

      if (filters.maxPrice) {
        query = query.lte("price", filters.maxPrice)
      }

      if (filters.search) {
        query = query.ilike("name", `%${filters.search}%`)
      }

      // Ejecutar la consulta
      const { data, error } = await query

      if (error) {
        throw new Error(error.message)
      }

      setProducts(data || [])
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar productos"
      setError(errorMessage)
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const getProductById = async (id: number) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories(name),
          profiles(first_name, last_name)
        `)
        .eq("id", id)
        .single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar el producto"
      setError(errorMessage)
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData: Omit<Product, "id" | "created_at">) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("products").insert([productData]).select()

      if (error) {
        throw new Error(error.message)
      }

      return data[0]
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear el producto"
      setError(errorMessage)
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.from("products").update(updates).eq("id", id).select()

      if (error) {
        throw new Error(error.message)
      }

      return data[0]
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al actualizar el producto"
      setError(errorMessage)
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) {
        throw new Error(error.message)
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar el producto"
      setError(errorMessage)
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
