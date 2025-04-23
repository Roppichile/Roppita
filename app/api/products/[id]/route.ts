import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        categories(name),
        profiles(first_name, last_name)
      `)
      .eq("id", id)
      .single()

    if (error) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updates = await request.json()

    // Verificar autenticación mediante Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar que el producto pertenece al usuario
    const { data: product } = await supabase.from("products").select("seller_id").eq("id", id).single()

    if (!product || product.seller_id !== session.user.id) {
      return NextResponse.json({ error: "No autorizado para modificar este producto" }, { status: 403 })
    }

    // Actualizar el producto
    const { data, error } = await supabase.from("products").update(updates).eq("id", id).select()

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    return NextResponse.json({ error: "Error al actualizar el producto" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Verificar autenticación mediante Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar que el producto pertenece al usuario
    const { data: product } = await supabase.from("products").select("seller_id").eq("id", id).single()

    if (!product || product.seller_id !== session.user.id) {
      return NextResponse.json({ error: "No autorizado para eliminar este producto" }, { status: 403 })
    }

    // Eliminar el producto
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar producto:", error)
    return NextResponse.json({ error: "Error al eliminar el producto" }, { status: 500 })
  }
}
