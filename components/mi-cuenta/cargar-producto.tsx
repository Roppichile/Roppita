"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

export default function CargarProducto() {
  const { user } = useAuth()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [condition, setCondition] = useState("nuevo")
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const newFiles = Array.from(e.target.files)
    setImages((prev) => [...prev, ...newFiles])

    // Crear URLs para previsualización
    const newUrls = newFiles.map((file) => URL.createObjectURL(file))
    setImageUrls((prev) => [...prev, ...newUrls])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)

    const newUrls = [...imageUrls]
    URL.revokeObjectURL(newUrls[index]) // Liberar memoria
    newUrls.splice(index, 1)
    setImageUrls(newUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      // Validar campos
      if (!name || !description || !price || !category || images.length === 0) {
        throw new Error("Por favor, completa todos los campos y sube al menos una imagen")
      }

      // Subir imágenes a Supabase Storage
      const uploadedImageUrls = []
      for (const image of images) {
        const fileExt = image.name.split(".").pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `products/${user.id}/${fileName}`

        const { error: uploadError, data } = await supabase.storage.from("product-images").upload(filePath, image)

        if (uploadError) throw uploadError

        // Obtener URL pública
        const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(filePath)
        uploadedImageUrls.push(publicUrlData.publicUrl)
      }

      // Crear producto en la base de datos
      const { error: insertError } = await supabase.from("products").insert([
        {
          name,
          description,
          price: Number.parseFloat(price),
          category_id: Number.parseInt(category),
          condition,
          images: uploadedImageUrls,
          seller_id: user.id,
          status: "active",
        },
      ])

      if (insertError) throw insertError

      // Limpiar formulario
      setName("")
      setDescription("")
      setPrice("")
      setCategory("")
      setCondition("nuevo")
      setImages([])
      setImageUrls([])
      setSuccess(true)
    } catch (err: any) {
      console.error("Error al cargar producto:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Cargar nuevo producto</h2>

      <Card>
        <CardHeader>
          <CardTitle>Información del producto</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}
          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
              ¡Producto cargado exitosamente! Ya está disponible para la venta.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nombre del producto *
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Descripción *
              </label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium">
                  Precio (USD) *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Categoría *
                </label>
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="1">Hombre</option>
                  <option value="2">Mujer</option>
                  <option value="3">Niños</option>
                  <option value="4">Accesorios</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Condición *</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="condition"
                    value="nuevo"
                    checked={condition === "nuevo"}
                    onChange={() => setCondition("nuevo")}
                    className="mr-2"
                  />
                  Nuevo
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="condition"
                    value="usado"
                    checked={condition === "usado"}
                    onChange={() => setCondition("usado")}
                    className="mr-2"
                  />
                  Usado
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Imágenes *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Haz clic para subir o arrastra y suelta</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP (máx. 5MB)</p>
                  </div>
                </label>
              </div>

              {imageUrls.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cargando producto..." : "Publicar producto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
