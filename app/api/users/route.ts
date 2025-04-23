import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Obtener usuarios
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    // Construir la consulta
    let query = supabase.from("profiles").select("*")

    // Filtrar usuarios destacados (ejemplo: los que tienen role = 'seller')
    if (featured === "true") {
      query = query.eq("role", "seller")
    }

    // Ejecutar la consulta
    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 })
  }
}

// Crear o actualizar perfil de usuario
export async function POST(request: Request) {
  try {
    // Verificar autenticación mediante Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const userData = await request.json()

    // Verificar si el perfil ya existe
    const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

    let result

    if (existingProfile) {
      // Actualizar perfil existente
      const { data, error } = await supabase.from("profiles").update(userData).eq("id", session.user.id).select()

      if (error) {
        throw new Error(error.message)
      }

      result = data[0]
    } else {
      // Crear nuevo perfil
      const { data, error } = await supabase
        .from("profiles")
        .insert([{ id: session.user.id, ...userData }])
        .select()

      if (error) {
        throw new Error(error.message)
      }

      result = data[0]
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al procesar perfil de usuario:", error)
    return NextResponse.json({ error: "Error al procesar perfil de usuario" }, { status: 500 })
  }
}
