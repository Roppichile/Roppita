import Link from "next/link"
import { Search, User, ShoppingBag, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MainMenu from "@/components/main-menu"
import Footer from "@/components/footer"

export default function ContactPage() {
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

      {/* Contact Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Contacto</h1>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <Input id="first-name" type="text" required />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido
                      </label>
                      <Input id="last-name" type="text" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto
                    </label>
                    <Input id="subject" type="text" required />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <Textarea id="message" rows={5} required />
                  </div>

                  <Button type="submit" className="w-full">
                    Enviar mensaje
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

                <div className="space-y-6">
                  <p className="text-gray-600">
                    ¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. Puedes contactarnos a través del
                    formulario o utilizando cualquiera de los siguientes métodos:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Correo electrónico</h3>
                        <p className="text-gray-600">info@roppita.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Teléfono</h3>
                        <p className="text-gray-600">+54 11 1234 5678</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="font-medium">Dirección</h3>
                        <p className="text-gray-600">
                          Av. Corrientes 1234
                          <br />
                          Ciudad Autónoma de Buenos Aires
                          <br />
                          Argentina
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-medium mb-4">Horario de atención</h3>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Lunes - Viernes:</span>
                        <span>9:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábados:</span>
                        <span>10:00 - 14:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingos:</span>
                        <span>Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="mt-8 rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Mapa de ubicación</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Preguntas frecuentes</h2>

              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold mb-2">¿Cómo puedo vender mis prendas en Roppita?</h3>
                  <p className="text-gray-600">
                    Para vender en Roppita, necesitas crear una cuenta, tomar fotos de tus prendas, establecer un precio
                    y publicarlas. Nuestro equipo revisará tu publicación antes de que sea visible para los compradores.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold mb-2">¿Cuánto tiempo tarda en llegar mi pedido?</h3>
                  <p className="text-gray-600">
                    Los tiempos de entrega varían según la ubicación, pero generalmente los pedidos se entregan en 3-5
                    días hábiles dentro de la misma ciudad y 5-7 días hábiles para envíos nacionales.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold mb-2">¿Puedo devolver un artículo si no me queda bien?</h3>
                  <p className="text-gray-600">
                    Sí, aceptamos devoluciones dentro de los 14 días posteriores a la recepción del artículo, siempre
                    que esté en las mismas condiciones en que fue enviado.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-bold mb-2">¿Cómo se verifica la calidad de los artículos?</h3>
                  <p className="text-gray-600">
                    Todos los vendedores deben proporcionar descripciones detalladas y fotos claras de sus artículos.
                    Además, contamos con un sistema de calificaciones que permite a los compradores evaluar la calidad
                    de los productos recibidos.
                  </p>
                </div>
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
