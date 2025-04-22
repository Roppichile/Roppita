import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainMenu from "@/components/main-menu"
import FeaturedUsers from "@/components/featured-users"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"

export default function Home() {
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

          <ProductGrid />

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
