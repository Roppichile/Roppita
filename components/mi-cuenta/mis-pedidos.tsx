"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Truck, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface Order {
  id: number
  product_id: number
  product: {
    id: number
    name: string
    price: number
    images: string[]
  }
  buyer_id: string
  buyer: {
    first_name: string
    last_name: string
  }
  tracking_number?: string
  tracking_url?: string
  status: "pending" | "shipped" | "delivered" | "cancelled"
  created_at: string
}

export default function MisPedidos() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingUrl, setTrackingUrl] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      try {
        setLoading(true)
        // Simulamos la obtención de pedidos ya que aún no tenemos esta tabla
        // En una implementación real, esto vendría de Supabase

        // Ejemplo de datos simulados
        const mockOrders: Order[] = [
          {
            id: 1,
            product_id: 1,
            product: {
              id: 1,
              name: "Camisa de algodón orgánico",
              price: 29.99,
              images: ["/placeholder.svg?height=100&width=100"],
            },
            buyer_id: "user123",
            buyer: {
              first_name: "Juan",
              last_name: "Pérez",
            },
            status: "pending",
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
            buyer_id: "user456",
            buyer: {
              first_name: "María",
              last_name: "González",
            },
            tracking_number: "TRACK987654321",
            tracking_url: "https://www.starken.cl/seguimiento?guia=TRACK987654321",
            status: "shipped",
            created_at: new Date().toISOString(),
          },
        ]

        setOrders(mockOrders)

        // En una implementación real, sería algo como:
        /*
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            product:products(*),
            buyer:profiles(first_name, last_name)
          `)
          .eq("seller_id", user.id)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
        */
      } catch (err: any) {
        console.error("Error al cargar pedidos:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const handleAddTracking = (order: Order) => {
    setSelectedOrder(order)
    setTrackingNumber(order.tracking_number || "")
    setTrackingUrl(order.tracking_url || "")
    setIsDialogOpen(true)
  }

  const handleSaveTracking = async () => {
    if (!selectedOrder) return

    try {
      // En una implementación real, esto actualizaría el pedido en Supabase
      /*
      const { error } = await supabase
        .from("orders")
        .update({ 
          tracking_number: trackingNumber,
          tracking_url: trackingUrl,
          status: "shipped"
        })
        .eq("id", selectedOrder.id);
      
      if (error) throw error;
      */

      // Actualizamos el estado local
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder.id
            ? {
                ...order,
                tracking_number: trackingNumber,
                tracking_url: trackingUrl,
                status: "shipped" as const,
              }
            : order,
        ),
      )

      setIsDialogOpen(false)
      alert("Información de seguimiento actualizada correctamente.")
    } catch (err: any) {
      console.error("Error al actualizar información de seguimiento:", err)
      alert("Error al actualizar información de seguimiento: " + err.message)
    }
  }

  const calculateEarnings = (price: number) => {
    // Calculamos el 90% del precio (10% de comisión para Roppita)
    return price * 0.9
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p>Cargando tus pedidos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error al cargar tus pedidos: {error}</p>
        <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">Aún no has recibido ningún pedido.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Mis pedidos recibidos</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={order.product.images?.[0] || "/placeholder.svg?height=100&width=100"}
                  alt={order.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle>{order.product.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  Precio: <span className="font-medium">${order.product.price.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Comprador: {order.buyer.first_name} {order.buyer.last_name}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-5 w-5 text-gray-500" />
                <span className="font-medium">
                  Estado: {order.status === "pending" && "Pendiente de envío"}
                  {order.status === "shipped" && "En camino"}
                  {order.status === "delivered" && "Entregado"}
                  {order.status === "cancelled" && "Cancelado"}
                </span>
              </div>

              {order.tracking_number && (
                <p className="text-sm text-gray-700">
                  Número de seguimiento: <span className="font-medium">{order.tracking_number}</span>
                </p>
              )}

              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">
                  Comisión Roppita (10%): ${(order.product.price * 0.1).toFixed(2)}
                </p>
                <p className="font-medium">Ganancia: ${calculateEarnings(order.product.price).toFixed(2)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-gray-500">Pedido el: {new Date(order.created_at).toLocaleDateString()}</p>
              {order.status === "pending" ? (
                <Button onClick={() => handleAddTracking(order)}>
                  <Truck className="h-4 w-4 mr-2" />
                  Agregar seguimiento
                </Button>
              ) : order.tracking_url ? (
                <Button variant="outline" size="sm" asChild>
                  <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver seguimiento
                  </a>
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar información de seguimiento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="tracking-number" className="text-sm font-medium">
                Número de seguimiento
              </label>
              <input
                id="tracking-number"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tracking-url" className="text-sm font-medium">
                URL de seguimiento
              </label>
              <input
                id="tracking-url"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={trackingUrl}
                onChange={(e) => setTrackingUrl(e.target.value)}
                placeholder="https://www.starken.cl/seguimiento?guia=XXXXXXXX"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTracking}>Guardar información</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
