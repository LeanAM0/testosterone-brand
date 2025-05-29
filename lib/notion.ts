import { Client } from '@notionhq/client'
import { cache } from 'react'

// Configuración de las variables de entorno para Next.js

// Tipos para las variables de entorno
declare global {
  interface Window {
    env?: any;
  }
}

// Tipos para productos
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

// Inicializar cliente Notion con el token proporcionado
// IMPORTANTE: Para producción, debes configurar estas variables de entorno en tu plataforma de despliegue
// El token actual está expuesto por motivos de desarrollo únicamente
const getEnvVariable = (name: string, defaultValue: string): string => {
  if (typeof window === 'undefined') {
    // Estamos en el servidor
    return (process as any)?.env?.[name] || defaultValue;
  }
  // Estamos en el cliente
  return defaultValue;
};

const NOTION_API_KEY = getEnvVariable('NOTION_API_KEY', 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0');

const notion = new Client({
  auth: NOTION_API_KEY
})

// Función para obtener todos los productos
export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    // Para empezar, necesitamos el ID de la base de datos
    // IMPORTANTE: Para producción, debes configurar esta variable en tu plataforma de despliegue
    const DATABASE_ID = getEnvVariable('NOTION_DATABASE_ID', '1f625056207c80c6bd27000c8c49292b')
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Disponibilidad',
        checkbox: {
          equals: true
        }
      }
    })
    
    return response.results.map(page => {
      const props = page.properties
      
      return {
        id: page.id,
        name: props.Nombre.title[0]?.plain_text || '',
        category: props.Categoria.select?.name || '',
        description: props.Descripción.rich_text[0]?.plain_text || '',
        price: props.Precio.number || 0,
        features: props.Caracteristicas.rich_text[0]?.plain_text || '',
        colors: props.Color.multi_select?.map(c => c.name) || [],
        images: props.Imagenes.files.map(file => ({
          url: file.type === 'external' ? file.external.url : file.file.url,
          name: file.name
        })),
        available: props.Disponibilidad.checkbox || false,
        slug: props.Slug.rich_text[0]?.plain_text || page.id
      }
    })
  } catch (error) {
    console.error('Error fetching products from Notion:', error)
    return []
  }
})

// Función para obtener productos por categoría
export const getProductsByCategory = cache(async (category: string): Promise<Product[]> => {
  try {
    const DATABASE_ID = getEnvVariable('NOTION_DATABASE_ID', '1f625056207c80c6bd27000c8c49292b')
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Categoria',
            select: {
              equals: category
            }
          },
          {
            property: 'Disponibilidad',
            checkbox: {
              equals: true
            }
          }
        ]
      }
    })
    
    // Usamos la misma transformación que en getProducts
    return response.results.map(page => {
      const props = page.properties
      
      return {
        id: page.id,
        name: props.Nombre.title[0]?.plain_text || '',
        category: props.Categoria.select?.name || '',
        description: props.Descripción.rich_text[0]?.plain_text || '',
        price: props.Precio.number || 0,
        features: props.Caracteristicas.rich_text[0]?.plain_text || '',
        colors: props.Color.multi_select?.map(c => c.name) || [],
        images: props.Imagenes.files.map(file => ({
          url: file.type === 'external' ? file.external.url : file.file.url,
          name: file.name
        })),
        available: props.Disponibilidad.checkbox || false,
        slug: props.Slug.rich_text[0]?.plain_text || page.id
      }
    })
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
})

// Función para obtener un producto por slug
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  try {
    const DATABASE_ID = getEnvVariable('NOTION_DATABASE_ID', '1f625056207c80c6bd27000c8c49292b')
    
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug
        }
      }
    })
    
    if (response.results.length === 0) {
      // Intentar buscar por ID si no se encuentra por slug
      return getProductById(slug)
    }
    
    // Transformar el primer resultado
    const page = response.results[0]
    const props = page.properties
    
    return {
      id: page.id,
      name: props.Nombre.title[0]?.plain_text || '',
      category: props.Categoria.select?.name || '',
      description: props.Descripción.rich_text[0]?.plain_text || '',
      price: props.Precio.number || 0,
      features: props.Caracteristicas.rich_text[0]?.plain_text || '',
      colors: props.Color.multi_select?.map(c => c.name) || [],
      images: props.Imagenes.files.map(file => ({
        url: file.type === 'external' ? file.external.url : file.file.url,
        name: file.name
      })),
      available: props.Disponibilidad.checkbox || false,
      slug: props.Slug.rich_text[0]?.plain_text || page.id
    }
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
})

// Función para obtener un producto por ID
export const getProductById = cache(async (id: string): Promise<Product | null> => {
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    const props = page.properties
    
    return {
      id: page.id,
      name: props.Nombre.title[0]?.plain_text || '',
      category: props.Categoria.select?.name || '',
      description: props.Descripción.rich_text[0]?.plain_text || '',
      price: props.Precio.number || 0,
      features: props.Caracteristicas.rich_text[0]?.plain_text || '',
      colors: props.Color.multi_select?.map(c => c.name) || [],
      images: props.Imagenes.files.map(file => ({
        url: file.type === 'external' ? file.external.url : file.file.url,
        name: file.name
      })),
      available: props.Disponibilidad.checkbox || false,
      slug: props.Slug.rich_text[0]?.plain_text || page.id
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
})