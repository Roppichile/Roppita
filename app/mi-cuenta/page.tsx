"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingBag, MessageSquare, PlusCircle, TruckIcon } from "lucide-react"
import LogoutButton from "@/components/logout-button"
import MisProductos from "@/components/mi-cuenta/mis-productos"
import Ofertas from "@/components/mi-cuenta/ofertas"
import CargarProducto from "@/components/mi-cuenta/cargar-producto"
import ComprasYSeguimiento from "@/components/mi-cuenta/compras-seguimiento"
import MisPedidos from "@/components/mi-cuenta/mis-pedidos"

export default function MiCuentaPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("mis-productos")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-br from-green-400 to-blue-500 bg-clip-text text-transparent"
          >
            Roppita
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Hola, {user?.user_metadata?.first_name || user?.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Mi cuenta</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="mis-productos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden md:inline">Mis productos</span>
              </TabsTrigger>
              <TabsTrigger value="ofertas" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden md:inline">Ofertas</span>
              </TabsTrigger>
              <TabsTrigger value="cargar-producto" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline">Cargar producto</span>
              </TabsTrigger>
              <TabsTrigger value="compras-seguimiento" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden md:inline">Compras y seguimiento</span>
              </TabsTrigger>
              <TabsTrigger value="mis-pedidos" className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4" />
                <span className="hidden md:inline">Mis pedidos</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mis-productos">
              <MisProductos />
            </TabsContent>

            <TabsContent value="ofertas">
              <Ofertas />
            </TabsContent>

            <TabsContent value="cargar-producto">
              <CargarProducto />
            </TabsContent>

            <TabsContent value="compras-seguimiento">
              <ComprasYSeguimiento />
            </TabsContent>

            <TabsContent value="mis-pedidos">
              <MisPedidos />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Roppita. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
