import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Roppita</h3>
            <p className="text-gray-400 mb-4">
              Plataforma de compra y venta de ropa sustentable. Damos una segunda vida a las prendas y cuidamos el
              planeta.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/categoria/hombre" className="text-gray-400 hover:text-white">
                  Hombre
                </Link>
              </li>
              <li>
                <Link href="/categoria/mujer" className="text-gray-400 hover:text-white">
                  Mujer
                </Link>
              </li>
              <li>
                <Link href="/categoria/ninos" className="text-gray-400 hover:text-white">
                  Niños
                </Link>
              </li>
              <li>
                <Link href="/categoria/accesorios" className="text-gray-400 hover:text-white">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/acerca-de" className="text-gray-400 hover:text-white">
                  Acerca de Roppita
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="text-gray-400 hover:text-white">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terminos-y-condiciones" className="text-gray-400 hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidad" className="text-gray-400 hover:text-white">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-de-cookies" className="text-gray-400 hover:text-white">
                  Política de cookies
                </Link>
              </li>
              <li>
                <Link href="/politica-de-devoluciones" className="text-gray-400 hover:text-white">
                  Política de devoluciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Roppita. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
