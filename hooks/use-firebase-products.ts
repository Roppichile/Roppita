"use client"

import { useState } from "react"
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  condition: string
  sellerId: string
  sellerName: string
  images: string[]
  status: string
  createdAt: any
  updatedAt: any
}

interface ProductFilters {
  category?: string
  condition?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}

export function useFirebaseProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null)
  const [hasMore, setHasMore] = useState(true)

  // Obtener productos con filtros y paginación
  const fetchProducts = async (filters: ProductFilters = {}, pageSize = 12, reset = true) => {
    try {
      setLoading(true)
      setError(null)

      // Si es una nueva búsqueda, resetear el estado
      if (reset) {
        setLastVisible(null)
        setHasMore(true)
      }

      // Si no hay más resultados y no es un reset, salir
      if (!hasMore && !reset) {
        setLoading(false)
        return []
      }

      // Construir la consulta base
      const q = collection(db, "products")
      const constraints: any[] = [where("status", "==", "active")]

      // Aplicar filtros
      if (filters.category) {
        constraints.push(where("category", "==", filters.category))
      }

      if (filters.condition) {
        constraints.push(where("condition", "==", filters.condition))
      }

      if (filters.search) {
        // Firebase no tiene búsqueda de texto completo nativa
        // Esta es una implementación simple que busca coincidencias exactas
        constraints.push(where("name", ">=", filters.search))
        constraints.push(where("name", "<=", filters.search + "\uf8ff"))
      }

      // Ordenar por fecha de creación (más recientes primero)
      constraints.push(orderBy("createdAt", "desc"))

      // Aplicar paginación
      if (lastVisible && !reset) {
        constraints.push(startAfter(lastVisible))
      }

      constraints.push(limit(pageSize))

      // Ejecutar la consulta
      const productsQuery = query(q, ...constraints)
      const querySnapshot = await getDocs(productsQuery)

      // Actualizar el último documento visible para paginación
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastVisible(lastDoc || null)
      setHasMore(querySnapshot.docs.length === pageSize)

      // Procesar los resultados
      const productsData: Product[] = []
      for (const doc of querySnapshot.docs) {
        const data = doc.data()

        // Obtener información del vendedor
        let sellerName = "Vendedor desconocido"
        try {
          const sellerDoc = await getDoc(doc.ref.parent.parent!)
          if (sellerDoc.exists()) {
            const sellerData = sellerDoc.data()
            sellerName = `${sellerData.firstName} ${sellerData.lastName}`
          }
        } catch (err) {
          console.error("Error al obtener datos del vendedor:", err)
        }

        productsData.push({
          id: doc.id,
          name: data.name,
          description: data.description || "",
          price: data.price,
          category: data.category,
          condition: data.condition,
          sellerId: data.sellerId,
          sellerName,
          images: data.images || [],
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        })
      }

      // Actualizar el estado
      if (reset) {
        setProducts(productsData)
      } else {
        setProducts((prev) => [...prev, ...productsData])
      }

      return productsData
    } catch (err: any) {
      setError(err.message)
      console.error("Error al obtener productos:", err)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Obtener un producto por ID
  const getProductById = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const productDoc = await getDoc(doc(db, "products", id))

      if (!productDoc.exists()) {
        throw new Error("Producto no encontrado")
      }

      const data = productDoc.data()

      // Obtener información del vendedor
      let sellerName = "Vendedor desconocido"
      try {
        const sellerDoc = await getDoc(doc(db, "users", data.sellerId))
        if (sellerDoc.exists()) {
          const sellerData = sellerDoc.data()
          sellerName = `${sellerData.firstName} ${sellerData.lastName}`
        }
      } catch (err) {
        console.error("Error al obtener datos del vendedor:", err)
      }

      return {
        id: productDoc.id,
        name: data.name,
        description: data.description || "",
        price: data.price,
        category: data.category,
        condition: data.condition,
        sellerId: data.sellerId,
        sellerName,
        images: data.images || [],
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    } catch (err: any) {
      setError(err.message)
      console.error("Error al obtener producto:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Crear un nuevo producto
  const createProduct = async (
    productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "sellerName">,
    images: File[],
  ) => {
    try {
      setLoading(true)
      setError(null)

      // Subir imágenes a Firebase Storage
      const imageUrls: string[] = []
      for (const image of images) {
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`)
        await uploadBytes(storageRef, image)
        const url = await getDownloadURL(storageRef)
        imageUrls.push(url)
      }

      // Crear documento en Firestore
      const newProduct = {
        ...productData,
        images: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "products"), newProduct)

      return {
        id: docRef.id,
        ...newProduct,
        sellerName: "Tú", // Esto se actualizará cuando se cargue el producto
      }
    } catch (err: any) {
      setError(err.message)
      console.error("Error al crear producto:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Actualizar un producto existente
  const updateProduct = async (id: string, productData: Partial<Product>, newImages?: File[]) => {
    try {
      setLoading(true)
      setError(null)

      // Obtener el producto actual
      const productDoc = await getDoc(doc(db, "products", id))

      if (!productDoc.exists()) {
        throw new Error("Producto no encontrado")
      }

      const currentData = productDoc.data()

      // Procesar nuevas imágenes si las hay
      const imageUrls = currentData.images || []
      if (newImages && newImages.length > 0) {
        for (const image of newImages) {
          const storageRef = ref(storage, `products/${Date.now()}_${image.name}`)
          await uploadBytes(storageRef, image)
          const url = await getDownloadURL(storageRef)
          imageUrls.push(url)
        }
      }

      // Actualizar documento en Firestore
      const updateData = {
        ...productData,
        images: imageUrls,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(doc(db, "products", id), updateData)

      return {
        id,
        ...currentData,
        ...updateData,
      }
    } catch (err: any) {
      setError(err.message)
      console.error("Error al actualizar producto:", err)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Eliminar un producto
  const deleteProduct = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await deleteDoc(doc(db, "products", id))

      // Actualizar la lista de productos
      setProducts((prev) => prev.filter((product) => product.id !== id))

      return { success: true }
    } catch (err: any) {
      setError(err.message)
      console.error("Error al eliminar producto:", err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    hasMore,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
