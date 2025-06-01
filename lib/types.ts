/**
 * Tipos comunes para la aplicación
 */

/**
 * Representa un producto en la tienda
 * Esta es la estructura que utilizan los componentes de la aplicación
 */
export interface Product {
  id: string
  name: string
  category: string
  description: string
  price: number
  features: string
  colors: string[]
  images: { url: string; name: string }[]
  available: boolean
  slug: string
}