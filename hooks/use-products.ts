"use client"

import { useState, useCallback } from "react"
import { supabase } from "@/lib/supabase"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  condition: string
  seller: string
  rating: number
}

interface ProductFilters {
  category?: string
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
      let query = supabase.from("products").select("*")

      // Aplicar filtros
      if (filters.category) {
        query = query.eq("category", filters.category)
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

      // Para propósitos de demostración, si no hay datos, usamos datos de ejemplo
      if (data && data.length > 0) {
        setProducts(data as Product[])
      } else {
        // Datos de ejemplo
        setProducts([
          {
            id: 1,
            name: "Camisa de algodón orgánico",
            price: 29.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "Hombre",
            condition: "Nuevo",
            seller: "EcoFashion",
            rating: 4.8,
          },
          {
            id: 2,
            name: "Vestido de lino reciclado",
            price: 45.5,
            image: "/placeholder.svg?height=300&width=300",
            category: "Mujer",
            condition: "Nuevo",
            seller: "GreenStyle",
            rating: 4.7,
          },
          // Más productos de ejemplo...
        ])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
