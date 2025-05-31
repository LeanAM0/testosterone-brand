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
  price: string
  image: string
  images: string[]
  description: string
  features: string[]
}