import { NextResponse } from "next/server"
import { db } from "@/lib/firebase-admin"
import { auth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

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
    let query = db.collection("products").where("status", "==", "active")

    if (category) {
      query = query.where("category", "==", category)
    }

    if (condition) {
      query = query.where("condition", "==", condition)
    }

    // Ejecutar la consulta
    const snapshot = await query.get()

    // Procesar los resultados
    const products = []
    for (const doc of snapshot.docs) {
      const data = doc.data()

      // Aplicar filtros de precio después de obtener los datos
      // (Firestore no permite múltiples filtros de rango en una consulta)
      if (minPrice && data.price < Number.parseFloat(minPrice)) continue
      if (maxPrice && data.price > Number.parseFloat(maxPrice)) continue

      // Filtro de búsqueda simple
      if (search && !data.name.toLowerCase().includes(search.toLowerCase())) continue

      products.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 })
  }
}

// Crear un nuevo producto
export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const sessionCookie = cookies().get("session")?.value
    if (!sessionCookie) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Verificar token
    const decodedToken = await auth.verifySessionCookie(sessionCookie)
    const userId = decodedToken.uid

    // Obtener datos del producto
    const productData = await request.json()

    // Añadir información adicional
    const newProduct = {
      ...productData,
      sellerId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "active",
    }

    // Guardar en Firestore
    const docRef = await db.collection("products").add(newProduct)

    return NextResponse.json({
      id: docRef.id,
      ...newProduct,
    })
  } catch (error) {
    console.error("Error al crear producto:", error)
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 })
  }
}
