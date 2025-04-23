import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Obtener productos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const condition = searchParams.get("condition")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")

    // Construir la consulta
    let query = supabase
      .from("products")
      .select(`
        *,
        categories(name),
        profiles(first_name, last_name)
      `)
      .eq("status", "active")

    if (category) {
      query = query.eq("category_id", category)
    }

    if (condition) {
      query = query.eq("condition", condition)
    }

    if (minPrice) {
      query = query.gte("price", Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      query = query.lte("price", Number.parseFloat(maxPrice))
    }

    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    // Ejecutar la consulta
    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

// Crear un nuevo producto
export async function POST(request: Request) {
  try {
    // Obtener datos del producto
    const productData = await request.json()

    // Verificar autenticación mediante Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Añadir información adicional
    const newProduct = {
      ...productData,
      seller_id: session.user.id,
      created_at: new Date().toISOString(),
      status: "active",
    }

    // Guardar en Supabase
    const { data, error } = await supabase.from("products").insert([newProduct]).select()

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error al crear producto:", error)
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
  }
}
