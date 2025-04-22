"use client"

import { useEffect } from "react"
import { useProducts } from "@/hooks/use-products"
import ProductCard from "@/components/product-card"

interface ProductGridProps {
  category?: string
  condition?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export default function ProductGrid({ category, condition, minPrice, maxPrice, search }: ProductGridProps) {
  const { products, loading, error, fetchProducts } = useProducts()

  useEffect(() => {
    // Convertir el nombre de la categoría a category_id
    // Esto es un ejemplo, deberías adaptar esto a tu estructura de datos
    const getCategoryId = (categoryName: string) => {
      const categoryMap: Record<string, number> = {
        hombre: 1,
        mujer: 2,
        ninos: 3,
        accesorios: 4,
      }
      return categoryMap[categoryName.toLowerCase()]
    }

    const filters: any = {}

    if (category) {
      filters.category_id = getCategoryId(category)
    }

    if (condition) {
      filters.condition = condition
    }

    if (minPrice) {
      filters.minPrice = minPrice
    }

    if (maxPrice) {
      filters.maxPrice = maxPrice
    }

    if (search) {
      filters.search = search
    }

    fetchProducts(filters)
  }, [fetchProducts, category, condition, minPrice, maxPrice, search])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        <p className="mt-2 text-gray-600">Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => fetchProducts()}
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No se encontraron productos.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // Adaptar el formato del producto para el ProductCard
        const formattedProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          image:
            product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg?height=300&width=300",
          category: product.categories?.name || "Sin categoría",
          condition: product.condition,
          seller: product.profiles
            ? `${product.profiles.first_name} ${product.profiles.last_name}`
            : "Vendedor desconocido",
          rating: 4.5, // Esto es un ejemplo, deberías adaptar esto a tu estructura de datos
        }

        return <ProductCard key={product.id} product={formattedProduct} />
      })}
    </div>
  )
}
