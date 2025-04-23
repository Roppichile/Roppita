"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, MessageSquare } from "lucide-react"

interface Offer {
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
  offer_amount: number
  message: string
  status: "pending" | "accepted" | "rejected"
  created_at: string
}

export default function Ofertas() {
  const { user } = useAuth()
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOffers = async () => {
      if (!user) return

      try {
        setLoading(true)
        // Simulamos la obtención de ofertas ya que aún no tenemos esta tabla
        // En una implementación real, esto vendría de Supabase

        // Ejemplo de datos simulados
        const mockOffers: Offer[] = [
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
            offer_amount: 25.0,
            message: "¿Podrías aceptar $25 por esta camisa? La necesito para un evento este fin de semana.",
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
            offer_amount: 40.0,
            message: "Hola, me encanta este vestido. ¿Aceptarías $40?",
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]

        setOffers(mockOffers)

        // En una implementación real, sería algo como:
        /*
        const { data, error } = await supabase
          .from("offers")
          .select(`
            *,
            product:products(*),
            buyer:profiles(first_name, last_name)
          `)
          .eq("seller_id", user.id)
          .eq("status", "pending")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setOffers(data || []);
        */
      } catch (err: any) {
        console.error("Error al cargar ofertas:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [user])

  const handleAcceptOffer = async (offerId: number) => {
    try {
      // En una implementación real, esto actualizaría la oferta en Supabase
      /*
      const { error } = await supabase
        .from("offers")
        .update({ status: "accepted" })
        .eq("id", offerId);
      
      if (error) throw error;
      */

      // Actualizamos el estado local
      setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, status: "accepted" as const } : offer)))

      alert("Oferta aceptada. Se ha notificado al comprador.")
    } catch (err: any) {
      console.error("Error al aceptar oferta:", err)
      alert("Error al aceptar oferta: " + err.message)
    }
  }

  const handleRejectOffer = async (offerId: number) => {
    try {
      // En una implementación real, esto actualizaría la oferta en Supabase
      /*
      const { error } = await supabase
        .from("offers")
        .update({ status: "rejected" })
        .eq("id", offerId);
      
      if (error) throw error;
      */

      // Actualizamos el estado local
      setOffers(offers.map((offer) => (offer.id === offerId ? { ...offer, status: "rejected" as const } : offer)))

      alert("Oferta rechazada.")
    } catch (err: any) {
      console.error("Error al rechazar oferta:", err)
      alert("Error al rechazar oferta: " + err.message)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p>Cargando ofertas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error al cargar ofertas: {error}</p>
        <Button onClick={() => window.location.reload()}>Intentar de nuevo</Button>
      </div>
    )
  }

  if (offers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="mb-4">No tienes ofertas pendientes en este momento.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Ofertas pendientes</h2>

      <div className="space-y-6">
        {offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                <img
                  src={offer.product.images?.[0] || "/placeholder.svg?height=100&width=100"}
                  alt={offer.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <CardTitle>{offer.product.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  Precio original: <span className="font-medium">${offer.product.price.toFixed(2)}</span>
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">
                      {offer.buyer.first_name} {offer.buyer.last_name} ofrece{" "}
                      <span className="text-green-600">${offer.offer_amount.toFixed(2)}</span>
                    </p>
                    <p className="text-gray-700 mt-1">{offer.message}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Descuento: {((1 - offer.offer_amount / offer.product.price) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">Comisión Roppita (10%): ${(offer.offer_amount * 0.1).toFixed(2)}</p>
              <p className="font-medium mt-2">
                Recibirás: ${(offer.offer_amount * 0.9).toFixed(2)} si aceptas esta oferta
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {offer.status === "pending" ? (
                <>
                  <Button variant="outline" onClick={() => handleRejectOffer(offer.id)}>
                    <X className="h-4 w-4 mr-2" />
                    Rechazar
                  </Button>
                  <Button onClick={() => handleAcceptOffer(offer.id)}>
                    <Check className="h-4 w-4 mr-2" />
                    Aceptar oferta
                  </Button>
                </>
              ) : offer.status === "accepted" ? (
                <p className="text-green-600 font-medium">Oferta aceptada</p>
              ) : (
                <p className="text-gray-500 font-medium">Oferta rechazada</p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
