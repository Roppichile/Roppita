"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainMenu from "@/components/main-menu"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { useProducts } from "@/hooks/use-products"

// Definimos las categorías válidas
const validCategories = ["hombre", "mujer", "ninos", "accesorios"]

// Títulos y descripciones para cada categoría
const categoryInfo = {
  hombre: {
    title: "Ropa para Hombre",
    description: "Descubre nuestra colección de ropa sustentable para hombre.",
  },
  mujer: {
    title: "Ropa para Mujer",
    description: "Explora nuestra selección de moda sustentable para mujer.",
  },
  ninos: {
    title: "Ropa para Niños",
    description: "Ropa cómoda y sustentable para los más pequeños.",
  },
  accesorios: {
    title: "Accesorios",
    description: "Complementa tu estilo con nuestros accesorios sustentables.",
  },
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Verificar si la categoría es válida
  if (!validCategories.includes(params.category)) {
    notFound()
  }

  const { products, loading, error, fetchProducts } = useProducts()
  const [condition, setCondition] = useState("todos")
  const [priceRange, setPriceRange] = useState("todos")
  const [sortBy, setSortBy] = useState("relevancia")

  // Obtener datos de la categoría
  const category = params.category as keyof typeof categoryInfo
  const { title, description } = categoryInfo[category]

  useEffect(() => {
    // Cargar productos al montar el componente
    fetchProducts({ category: params.category })
  }, [fetchProducts, params.category])

  const handleFilterChange = () => {
    // Construir filtros basados en las selecciones del usuario
    const filters: any = { category: params.category }

    if (condition !== "todos") {
      filters.condition = condition
    }

    if (priceRange !== "todos") {
      switch (priceRange) {
        case "menos20":
          filters.maxPrice = 20
          break
        case "20a50":
          filters.minPrice = 20
          filters.maxPrice = 50
          break
        case "50a100":
          filters.minPrice = 50
          filters.maxPrice = 100
          break
        case "mas100":
          filters.minPrice = 100
          break
      }
    }

    fetchProducts(filters)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              Roppita
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex items-center w-1/3 relative">
              <Input type="search" placeholder="Buscar productos..." className="w-full pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">Iniciar sesión</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden md:inline">Registrarse</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Menu */}
      <MainMenu />

      {/* Category Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Filters */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Condición</label>
                <select
                  className="border rounded p-2 text-sm"
                  value={condition}
                  onChange={(e) => {
                    setCondition(e.target.value)
                    handleFilterChange()
                  }}
                >
                  <option value="todos">Todos</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="usado">Usado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <select
                  className="border rounded p-2 text-sm"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value)
                    handleFilterChange()
                  }}
                >
                  <option value="todos">Todos</option>
                  <option value="menos20">Menos de $20</option>
                  <option value="20a50">$20 - $50</option>
                  <option value="50a100">$50 - $100</option>
                  <option value="mas100">Más de $100</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordenar por</label>
                <select
                  className="border rounded p-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="precio_asc">Precio: menor a mayor</option>
                  <option value="precio_desc">Precio: mayor a menor</option>
                  <option value="recientes">Más recientes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              <p className="mt-2 text-gray-600">Cargando productos...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => fetchProducts({ category: params.category })}>
                Intentar de nuevo
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No se encontraron productos para esta categoría.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {products.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="bg-green-50">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </nav>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
