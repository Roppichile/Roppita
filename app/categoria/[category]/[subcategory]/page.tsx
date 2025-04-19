import { notFound } from "next/navigation"
import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainMenu from "@/components/main-menu"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"

// Definimos las subcategorías válidas por categoría
const validSubcategories: Record<string, string[]> = {
  hombre: ["camisas", "pantalones", "abrigos", "calzado", "accesorios"],
  mujer: ["blusas", "vestidos", "pantalones", "abrigos", "calzado"],
  ninos: ["bebes", "pequenos", "grandes", "calzado"],
}

// Datos de ejemplo para cada subcategoría
const getSubcategoryData = (category: string, subcategory: string) => {
  const titles: Record<string, Record<string, string>> = {
    hombre: {
      camisas: "Camisas para Hombre",
      pantalones: "Pantalones para Hombre",
      abrigos: "Abrigos para Hombre",
      calzado: "Calzado para Hombre",
      accesorios: "Accesorios para Hombre",
    },
    mujer: {
      blusas: "Blusas para Mujer",
      vestidos: "Vestidos para Mujer",
      pantalones: "Pantalones para Mujer",
      abrigos: "Abrigos para Mujer",
      calzado: "Calzado para Mujer",
    },
    ninos: {
      bebes: "Ropa para Bebés (0-24 meses)",
      pequenos: "Ropa para Niños (2-8 años)",
      grandes: "Ropa para Niños (8-14 años)",
      calzado: "Calzado para Niños",
    },
  }

  const title = titles[category]?.[subcategory] || `${subcategory} en ${category}`

  return {
    title,
    description: `Encuentra las mejores opciones de ${title.toLowerCase()} en Roppita.`,
    products: Array(8)
      .fill(0)
      .map((_, i) => ({
        id: i + 1000,
        name: `${title} ${i + 1}`,
        price: 24.99 + i * 5,
        image: "/placeholder.svg?height=300&width=300",
        category: title,
        condition: i % 2 === 0 ? "Nuevo" : "Usado",
        seller: `Vendedor ${i + 50}`,
        rating: 4 + Math.random() * 0.9,
      })),
  }
}

export default function SubcategoryPage({
  params,
}: {
  params: { category: string; subcategory: string }
}) {
  const { category, subcategory } = params

  // Verificar si la categoría y subcategoría son válidas
  if (!validSubcategories[category] || !validSubcategories[category].includes(subcategory)) {
    notFound()
  }

  // Obtener datos de la subcategoría
  const { title, description, products } = getSubcategoryData(category, subcategory)

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

      {/* Subcategory Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/">Inicio</Link> &gt;
              <Link href={`/categoria/${category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</Link> &gt;
              <span>{subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Filters (simplified) */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Condición</label>
                <select className="border rounded p-2 text-sm">
                  <option>Todos</option>
                  <option>Nuevo</option>
                  <option>Usado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <select className="border rounded p-2 text-sm">
                  <option>Todos</option>
                  <option>Menos de $20</option>
                  <option>$20 - $50</option>
                  <option>$50 - $100</option>
                  <option>Más de $100</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ordenar por</label>
                <select className="border rounded p-2 text-sm">
                  <option>Relevancia</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Más recientes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
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
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
