# Documentación de Rutas de la Aplicación

## Estructura de Rutas

Next.js 15.2.4 utiliza un sistema de enrutamiento basado en archivos, donde cada archivo en el directorio `app` puede convertirse en una ruta accesible. A continuación se detallan las rutas principales de la aplicación:

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Página principal con productos destacados |
| `/categorias/[categoria]` | `app/categorias/[categoria]/page.tsx` | Página de productos filtrados por categoría |
| `/productos/[slug]` | `app/productos/[slug]/page.tsx` | Página detallada de un producto individual |

## Detalles de las Rutas

### Página Principal (/)

**Archivo**: `app/page.tsx`

Esta es la página de inicio de la aplicación. Muestra:
- Hero section con mensaje principal
- Productos destacados
- Categorías principales
- Información sobre la marca

**Características**:
- SEO optimizado con metadatos específicos
- Carga de datos desde Notion
- Componentes server-side y client-side combinados

**Ejemplo de implementación**:
```tsx
import { Metadata } from 'next'
import { getProducts } from '@/lib/notion'
import Hero from '@/components/hero'
import ProductCard from '@/components/product-card'

export const metadata: Metadata = {
  title: 'Testosterone Brand - Ropa Deportiva',
  description: 'Descubre nuestra colección de ropa deportiva diseñada para maximizar tu rendimiento.'
}

export default async function Home() {
  const products = await getProducts()
  
  return (
    <>
      <Hero />
      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
            Colección Destacada
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

### Página de Categoría (/categorias/[categoria])

**Archivo**: `app/categorias/[categoria]/page.tsx`

Esta página muestra los productos filtrados por categoría:
- Título de la categoría
- Descripción de la categoría
- Grid de productos de la categoría
- Filtros adicionales (implementación futura)

**Características**:
- Generación estática de parámetros para todas las categorías
- Metadatos dinámicos basados en la categoría
- Filtro de productos por categoría

**Ejemplo de implementación**:
```tsx
import { Metadata } from 'next'
import { getProductsByCategory, getProducts } from '@/lib/notion'
import ProductCard from '@/components/product-card'

export async function generateStaticParams() {
  const products = await getProducts()
  const categories = [...new Set(products.map(p => p.category))]
  
  return categories.map(category => ({
    categoria: category.toLowerCase()
  }))
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const categoria = params.categoria
  
  return {
    title: `${categoria.charAt(0).toUpperCase() + categoria.slice(1)} | Testosterone Brand`,
    description: `Descubre nuestra colección de ${categoria} diseñada para maximizar tu rendimiento.`
  }
}

export default async function CategoryPage({ params }) {
  const categoryName = params.categoria.charAt(0).toUpperCase() + params.categoria.slice(1)
  const products = await getProductsByCategory(categoryName)
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
```

### Página de Producto (/productos/[slug])

**Archivo**: `app/productos/[slug]/page.tsx`

Esta página muestra los detalles completos de un producto individual:
- Imágenes del producto
- Nombre y descripción
- Precio
- Características
- Colores disponibles
- Botón de acción (contacto/compra)

**Características**:
- Generación estática de parámetros para todos los productos
- Metadatos específicos para el producto (SEO)
- Información detallada del producto
- Galería de imágenes

**Ejemplo de implementación**:
```tsx
import { Metadata } from 'next'
import Image from 'next/image'
import { getProductBySlug, getProducts } from '@/lib/notion'
import WhatsAppButton from '@/components/whatsapp-button'

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products.map(product => ({
    slug: product.slug || product.id
  }))
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  
  return {
    title: `${product.name} | Testosterone Brand`,
    description: product.description || `${product.name} - Ropa deportiva de alta calidad`,
    openGraph: {
      images: [product.images[0]?.url]
    }
  }
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 md:h-full">
          <Image
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-400 mb-4">{product.category}</p>
          <p className="text-2xl font-bold mb-6">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Colores disponibles:</h3>
            <div className="flex gap-2">
              {product.colors.map(color => (
                <span 
                  key={color}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color === 'Blanca' ? 'white' : 'black' }}
                />
              ))}
            </div>
          </div>
          
          <WhatsAppButton productName={product.name} />
        </div>
      </div>
    </div>
  )
}
```

## Layout y Componentes Compartidos

Además de las páginas principales, la aplicación utiliza layouts compartidos:

- `app/layout.tsx`: Layout principal que incluye elementos compartidos como navegación y pie de página
- `app/shop/layout.tsx`: Layout específico para las páginas de tienda con filtros laterales

## Páginas Adicionales

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/about` | `app/about/page.tsx` | Página sobre la marca |
| `/contact` | `app/contact/page.tsx` | Página de contacto |
| `/not-found` | `app/not-found.tsx` | Página 404 personalizada |