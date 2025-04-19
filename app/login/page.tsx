import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            Roppita
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Iniciar sesión</h1>
              <p className="text-gray-600 mt-2">Bienvenido de nuevo a Roppita</p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <Input id="email" type="email" required />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <Link href="/recuperar-contrasena" className="text-sm text-green-600 hover:text-green-800">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Recordarme
                </label>
              </div>

              <Button type="submit" className="w-full">
                Iniciar sesión
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  Google
                </Button>
                <Button variant="outline" className="w-full">
                  Facebook
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="font-medium text-green-600 hover:text-green-800">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Roppita. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
