"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  condition: string
  status: string
  created_at: string
}

export default function MisProductos() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("seller_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setProducts(data || [])
      } catch (err: any) {
        console.error("Error al cargar productos:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [user])

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return

    try {
      const { error } = await supabase.from("products").delete().eq("id", id)

      if (error) throw error

      // Actualizar la lista de productos
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
    } catch (err: any) {
      console.error("Error al eliminar producto:", err)
      alert("Error al eliminar producto: " + err.message)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p>Cargando tus productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error al cargar tus productos: {error}</p>
        <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">Aún no has publicado ningún producto.</p>
        <Button onClick={() => document.querySelector('[value="cargar-producto"]')?.dispatchEvent(new Event("click"))}>
          Publicar mi primer producto
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mis productos publicados</h2>
        <Button onClick={() => document.querySelector('[value="cargar-producto"]')?.dispatchEvent(new Event("click"))}>
          Publicar nuevo producto
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.images?.[0] || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-1">
                Estado: <span className="font-medium">{product.status === "active" ? "Activo" : "Inactivo"}</span>
              </p>
              <p className="text-sm text-gray-500">
                Condición: <span className="font-medium">{product.condition}</span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/producto/${product.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ver
                </Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/mi-cuenta/editar-producto/${product.id}`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
