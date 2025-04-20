import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar que los campos requeridos estén presentes
    if (!body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    // En una aplicación real, aquí enviarías el email o guardarías el mensaje
    // Por ejemplo, usando un servicio como SendGrid, Mailgun, etc.

    console.log("Mensaje de contacto recibido:", body)

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado correctamente",
    })
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 400 })
  }
}
