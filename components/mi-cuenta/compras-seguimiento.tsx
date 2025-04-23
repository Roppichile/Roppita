"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Purchase {
  id: number
  product_id: number
  product: {
    id: number
    name: string
    price: number
    images: string[]
  }
  seller_id: string
  seller: {
    first_name: string
    last_name: string
  }
  tracking_number?: string
  tracking_url?: string
  status: "pending" | "shipped" | "delivered" | "cancelled"
  created_at: string
}

export default function ComprasYSeguimiento() {
  const { user } = useAuth()
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return

      try {
        setLoading(true)
        // Simulamos la obtención de compras ya que aún no tenemos esta tabla
        // En una implementación real, esto vendría de Supabase

        // Ejemplo de datos simulados
        const mockPurchases: Purchase[] = [
          {
            id: 1,
            product_id: 1,
            product: {
              id: 1,
              name: "Camisa de algodón orgánico",
              price: 29.99,
              images: ["/placeholder.svg?height=100&width=100"],
            },
            seller_id: "user123",
            seller: {
              first_name: "Juan",
              last_name: "Pérez",
            },
            tracking_number: "TRACK123456789",
            tracking_url: "https://www.starken.cl/seguimiento?guia=TRACK123456789",
            status: "shipped",
            created_at: new Date().toISOString(),
          },
          {
            id: 2,
            product_id: 2,
            product: {
              id: 2,
              name: "Vestido de lino reciclado",
              price: 45.5,
              images: ["/placeholder.svg?height=100&width=100"],
            },
            seller_id: "user456",
            seller: {
              first_name: "María",
              last_name: "González",
            },
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]

        setPurchases(mockPurchases)

        // En una implementación real, sería algo como:
        /*
        const { data, error } = await supabase
          .from("purchases")
          .select(`
            *,
            product:products(*),
            seller:profiles(first_name, last_name)
          `)
          .eq("buyer_id", user.id)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setPurchases(data || []);
        */
      } catch (err: any) {
        console.error("Error al cargar compras:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
  }, [user])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p>Cargando tus compras...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error al cargar tus compras: {error}</p>
        <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
      </div>
    )
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">Aún no has realizado ninguna compra.</p>
        <Button asChild>
          <Link href="/">Explorar productos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mis compras y seguimiento</h2>

      <div className="space-y-6">
        {purchases.map((purchase) => (
          <Card key={purchase.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={purchase.product.images?.[0] || "/placeholder.svg?height=100&width=100"}
                  alt={purchase.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle>{purchase.product.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  Precio: <span className="font-medium">${purchase.product.price.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Vendedor: {purchase.seller.first_name} {purchase.seller.last_name}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-gray-500" />
                <span className="font-medium">
                  Estado: {purchase.status === "pending" && "Pendiente de envío"}
                  {purchase.status === "shipped" && "En camino"}
                  {purchase.status === "delivered" && "Entregado"}
                  {purchase.status === "cancelled" && "Cancelado"}
                </span>
              </div>

              {purchase.tracking_number && (
                <p className="text-sm text-gray-700">
                  Número de seguimiento: <span className="font-medium">{purchase.tracking_number}</span>
                </p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">Comprado el: {new Date(purchase.created_at).toLocaleDateString()}</p>
              {purchase.tracking_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={purchase.tracking_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Seguimiento
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
