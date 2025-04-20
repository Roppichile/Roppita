import { NextResponse } from "next/server"

// Simulación de una base de datos de productos (mismos datos que en route.ts)
const products = [
  {
    id: 1,
    name: "Camisa de algodón orgánico",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Hombre",
    subcategory: "Camisas",
    condition: "Nuevo",
    seller: "EcoFashion",
    rating: 4.8,
    description: "Camisa de algodón 100% orgánico, perfecta para cualquier ocasión.",
    stock: 15,
  },
  {
    id: 2,
    name: "Vestido de lino reciclado",
    price: 45.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "Mujer",
    subcategory: "Vestidos",
    condition: "Nuevo",
    seller: "GreenStyle",
    rating: 4.7,
    description: "Vestido elegante hecho con lino reciclado, ideal para el verano.",
    stock: 8,
  },
  // Más productos...
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // En una aplicación real, aquí actualizarías en la base de datos
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id, // Aseguramos que el ID no cambie
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
  }

  // En una aplicación real, aquí eliminarías de la base de datos

  return NextResponse.json({ success: true })
}
