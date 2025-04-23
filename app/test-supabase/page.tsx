"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabase() {
  const [status, setStatus] = useState("Comprobando conexión...")
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Mostrar las variables de entorno (solo las primeras letras por seguridad)
        console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10) + "...")
        console.log("Key exists:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

        // Intentar una consulta simple
        const { data, error } = await supabase.from("products").select("*").limit(5)

        if (error) {
          throw error
        }

        setData(data)
        setStatus("¡Conexión exitosa! Supabase está correctamente configurado.")
      } catch (err: any) {
        console.error("Error de conexión:", err)
        setError(err.message || "Error desconocido")
        setStatus(`Error de conexión. Ver consola para detalles.`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de conexión a Supabase</h1>
      <div className={`p-4 rounded ${status.includes("exitosa") ? "bg-green-100" : "bg-red-100"}`}>{status}</div>
      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      {data && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Datos recuperados:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-60">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
