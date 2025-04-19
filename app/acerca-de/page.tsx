import Link from "next/link"
import { Search, User, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MainMenu from "@/components/main-menu"
import Footer from "@/components/footer"

export default function AboutPage() {
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

      {/* About Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Acerca de Roppita</h1>

            <div className="mb-12">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Equipo de Roppita"
                className="w-full h-auto rounded-lg mb-6"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Nuestra Historia</h2>
                <p className="text-gray-700 mb-4">
                  Roppita nació en 2020 como respuesta a la creciente preocupación por el impacto ambiental de la
                  industria de la moda. Fundada por un grupo de amigos apasionados por la sostenibilidad, nuestra
                  plataforma busca transformar la forma en que compramos y vendemos ropa.
                </p>
                <p className="text-gray-700">
                  Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en una comunidad vibrante de
                  personas comprometidas con la moda circular y el consumo responsable.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Nuestra Misión</h2>
                <p className="text-gray-700">
                  En Roppita, nuestra misión es crear un ecosistema de moda circular que extienda la vida útil de las
                  prendas, reduzca los residuos textiles y promueva un consumo más consciente. Queremos hacer que la
                  moda sostenible sea accesible para todos, ofreciendo una plataforma donde las personas puedan comprar,
                  vender e intercambiar ropa de manera fácil y segura.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Nuestra Visión</h2>
                <p className="text-gray-700">
                  Aspiramos a liderar la transformación hacia un futuro donde la moda circular sea la norma, no la
                  excepción. Visualizamos un mundo donde cada prenda tenga múltiples vidas, donde el valor de la ropa no
                  se mida por su novedad sino por su calidad y durabilidad, y donde los consumidores estén empoderados
                  para tomar decisiones que beneficien tanto a sus bolsillos como al planeta.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Nuestros Valores</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    <strong>Sostenibilidad:</strong> Promovemos prácticas que minimizan el impacto ambiental y maximizan
                    el uso de recursos.
                  </li>
                  <li>
                    <strong>Comunidad:</strong> Fomentamos conexiones significativas entre personas que comparten
                    valores similares.
                  </li>
                  <li>
                    <strong>Transparencia:</strong> Operamos con honestidad y claridad en todas nuestras interacciones.
                  </li>
                  <li>
                    <strong>Accesibilidad:</strong> Trabajamos para que la moda sostenible sea una opción viable para
                    todos, independientemente de su presupuesto.
                  </li>
                  <li>
                    <strong>Innovación:</strong> Buscamos constantemente nuevas formas de mejorar nuestra plataforma y
                    ampliar nuestro impacto positivo.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Nuestro Impacto</h2>
                <p className="text-gray-700 mb-4">
                  Hasta la fecha, Roppita ha facilitado la reutilización de más de 100,000 prendas, evitando que
                  terminen en vertederos. Esto equivale a ahorrar aproximadamente:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">500,000</div>
                    <div className="text-sm text-gray-600">Litros de agua</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">25,000</div>
                    <div className="text-sm text-gray-600">kg de CO₂</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">15,000</div>
                    <div className="text-sm text-gray-600">kg de residuos textiles</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  Además, hemos ayudado a nuestros usuarios a ganar más de $500,000 vendiendo artículos que de otra
                  manera podrían haber sido descartados.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold mb-6">¿Listo para unirte a nuestra comunidad?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Comprar ahora
                </Button>
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Vender mis prendas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
