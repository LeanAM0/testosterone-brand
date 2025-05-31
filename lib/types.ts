/**
 * Tipo que define la estructura de un producto en la aplicación
 * Usado por los componentes para mostrar información de productos
 */
export interface Product {
  id: string
  name: string
  description: string
  price: string
  rawPrice: number
  category: string
  features: string[]
  images: string[]
  inStock: boolean
}