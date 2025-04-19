import Link from "next/link"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  condition: string
  seller: string
  rating: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group">
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2">{product.condition}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-green-600 font-bold mb-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{product.category}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Vendido por: {product.seller}</p>
        </CardContent>
      </Link>
    </Card>
  )
}
