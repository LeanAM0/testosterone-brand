# Documentación de Integración con Notion

## Visión General

El proyecto Testosterone Brand utiliza Notion como base de datos principal. Esto permite:
- Gestión fácil de productos sin necesidad de un backend complejo
- Actualización de contenido sin necesidad de desplegar nuevamente
- Interfaz amigable para administradores no técnicos
- Estructura flexible para evolucionar con el tiempo

## Estructura de la Base de Datos

La base de datos de Notion tiene la siguiente estructura:

| Campo         | Tipo        | Descripción                               |
|---------------|-------------|-------------------------------------------|
| Nombre        | Title       | Nombre del producto                       |
| Categoria     | Select      | Categoría del producto (Hoodie, Oversize) |
| Descripción   | Text        | Descripción detallada del producto        |
| Precio        | Number      | Precio en pesos                           |
| Caracteristicas | Text      | Características adicionales del producto   |
| Color         | Multi-select| Colores disponibles (Blanca, Negra, etc.) |
| Imagenes      | Files       | Imágenes del producto                     |
| Disponibilidad| Checkbox    | Indica si el producto está disponible     |
| Slug          | Text        | URL amigable para el producto             |

## Implementación de la API

### Configuración

La integración con Notion requiere los siguientes pasos de configuración:

1. **Variables de Entorno**:
   - Crear archivo `.env.local` con:
   ```
   NOTION_TOKEN=your_integration_token
   NOTION_DATABASE_ID=your_database_id
   ```

2. **Dependencias**:
   - Instalar el SDK oficial de Notion:
   ```
   npm install @notionhq/client
   ```

### Implementación en `lib/notion.ts`

El archivo `lib/notion.ts` encapsula toda la lógica para interactuar con la API de Notion:

```typescript
import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { cache } from 'react'

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

// Inicializar cliente Notion
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

// Inicializar conversor markdown
const n2m = new NotionToMarkdown({ notionClient: notion })

// Función para obtener todos los productos
export const getProducts = cache(async (): Promise<Product[]> => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
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
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
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
    
    // Usar la misma transformación que en getProducts
    return response.results.map(/* ... misma transformación ... */)
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
})

// Función para obtener un producto por slug
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID as string,
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
    
    // Usar la misma transformación que en getProducts para el primer resultado
    const page = response.results[0]
    // ... transformación ...
    
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
})

// Función para obtener un producto por ID
export const getProductById = cache(async (id: string): Promise<Product | null> => {
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    // ... transformación ...
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
})
```

## Uso en Componentes

Los datos obtenidos de Notion se utilizan principalmente en:

1. **Página Principal**:
   ```typescript
   const products = await getProducts()
   ```

2. **Página de Categoría**:
   ```typescript
   const products = await getProductsByCategory(categoryName)
   ```

3. **Página de Producto**:
   ```typescript
   const product = await getProductBySlug(slug)
   ```

## Adaptar Datos de Notion

Para facilitar el uso de los datos de Notion en los componentes, se ha creado un adaptador en `lib/product-adapter.ts`:

```typescript
import { Product as NotionProduct } from './notion'

// Tipo para los productos de la aplicación
export interface AppProduct {
  id: string
  name: string
  category: string
  description: string
  price: number
  features: string[]
  colors: string[]
  images: string[]
  available: boolean
  slug: string
}

// Convertir productos de Notion al formato de la aplicación
export function adaptNotionProductsToAppProducts(notionProducts: NotionProduct[]): AppProduct[] {
  return notionProducts.map(notionProduct => ({
    id: notionProduct.id,
    name: notionProduct.name,
    category: notionProduct.category,
    description: notionProduct.description,
    price: notionProduct.price,
    features: notionProduct.features.split('\n').filter(Boolean),
    colors: notionProduct.colors,
    images: notionProduct.images.map(img => img.url),
    available: notionProduct.available,
    slug: notionProduct.slug || notionProduct.id
  }))
}
```

## Gestión de Caché

Para optimizar el rendimiento, todas las funciones de consulta a Notion están envueltas con la función `cache` de React, lo que evita múltiples llamadas a la API para los mismos datos durante una sesión.

## Datos de Respaldo

En caso de fallo en la conexión con Notion, se proporciona una función para obtener datos estáticos de respaldo:

```typescript
import { fallbackProducts } from './data'

// En caso de error con Notion
if (error || products.length === 0) {
  return fallbackProducts
}
```

## Consideraciones de Seguridad

- El token de Notion debe mantenerse privado y no debe exponerse al cliente
- Las variables de entorno deben configurarse correctamente en todos los entornos
- Se recomienda configurar CORS en la base de datos de Notion para mayor seguridad