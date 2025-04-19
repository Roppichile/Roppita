import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FeaturedUsers() {
  const featuredUsers = [
    {
      id: 1,
      name: "María García",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      sales: 128,
      description: "Especialista en moda sustentable con más de 5 años vendiendo prendas de calidad.",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      sales: 96,
      description: "Coleccionista de ropa vintage y amante de la moda circular.",
    },
    {
      id: 3,
      name: "Laura Martínez",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      sales: 152,
      description: "Diseñadora de moda que vende piezas únicas hechas con materiales reciclados.",
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Vendedores destacados</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                  <div className="flex items-center mb-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{user.sales} ventas realizadas</p>
                  <p className="text-sm mb-4">{user.description}</p>
                  <Button variant="outline" size="sm">
                    Ver productos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
