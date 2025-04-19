import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainMenu from "@/components/main-menu"
import FeaturedUsers from "@/components/featured-users"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"

export default function Home() {
  // Productos de ejemplo para la sección de novedades
  const newProducts = [
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
    {
      id: 3,
      name: "Jeans sustentables",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Unisex",
      condition: "Nuevo",
      seller: "EcoJeans",
      rating: 4.9,
    },
    {
      id: 4,
      name: "Zapatillas ecológicas",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Calzado",
      condition: "Nuevo",
      seller: "EcoStep",
      rating: 4.6,
    },
  ]

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

      {/* Hero Section with CTAs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left CTA */}
            <div
              className="relative rounded-lg overflow-hidden h-80 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=400&width=600')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Renová tu armario</h2>
                <p className="text-white mb-6 max-w-md">
                  Descubre prendas únicas y sustentables que reflejan tu estilo personal.
                </p>
                <Button className="w-fit bg-green-500 hover:bg-green-600">Comprar con espíritu sustentable</Button>
              </div>
            </div>

            {/* Right CTA */}
            <div
              className="relative rounded-lg overflow-hidden h-80 bg-cover bg-center"
              style={{ backgroundImage: "url('/placeholder.svg?height=400&width=600')" }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Reutiliza, recicla y gana dinero</h2>
                <p className="text-white mb-6 max-w-md">
                  Dale una segunda vida a tus prendas y genera ingresos extra de forma responsable.
                </p>
                <Button className="w-fit bg-blue-500 hover:bg-blue-600">Vendé tus cosas en desuso</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Novedades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Ver más productos
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Users Section */}
      <FeaturedUsers />

      {/* Footer */}
      <Footer />
    </div>
  )
}
