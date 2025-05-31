import { Client } from '@notionhq/client'
import { cache } from 'react'

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

// Función segura para obtener variables de entorno con valores por defecto para desarrollo
const getEnvVariable = (name: string, defaultValue: string): string => {
  // En el servidor, intentamos obtener la variable de entorno
  if (typeof window === 'undefined') {
    return process.env[name] || defaultValue;
  }
  // En el cliente, usamos el valor por defecto (por seguridad)
  return defaultValue;
};

// Configuración de Notion con opciones alternativas para probar
// IMPORTANTE: Estas credenciales son para desarrollo. En producción, usa .env.local o variables de entorno seguras
const PRIMARY_API_KEY = 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0';
const NOTION_API_KEY = getEnvVariable('NOTION_API_KEY', PRIMARY_API_KEY);

// ID correcto de la base de datos de Notion (encontrado mediante prueba)
// El nombre de la base de datos es: TESTOSTERONE DATABASE
const DB_ID_WITH_HYPHENS = '1f625056-207c-80c3-b951-ff146b3c2c51';
const DB_ID_WITHOUT_HYPHENS = '1f625056207c80c3b951ff146b3c2c51';

// Usar el ID de la base de datos exactamente como está proporcionado en las variables de entorno, si existe
const NOTION_DATABASE_ID = getEnvVariable('NOTION_DATABASE_ID', DB_ID_WITH_HYPHENS);

// Almacenar IDs alternativos para probar si el principal falla
const ALTERNATIVE_DATABASE_IDS = [DB_ID_WITHOUT_HYPHENS];

// Registrar información de configuración
console.log('Configuración de Notion:')
console.log('- API Key (primeros 4 caracteres):', NOTION_API_KEY.substring(0, 4) + '...');
console.log('- Database ID principal:', NOTION_DATABASE_ID);
console.log('- Database IDs alternativos disponibles:', ALTERNATIVE_DATABASE_IDS.length);

// Inicializar cliente Notion
const notion = new Client({
  auth: NOTION_API_KEY
})

// Función auxiliar para convertir una página de Notion a un objeto Product
const notionPageToProduct = (page: any): Product => {
  const props = page.properties
  
  // Registrar las propiedades del producto para depuración
  console.log(`Mapeando producto ID: ${page.id}`)
  
  // Función auxiliar para acceder a propiedades de forma segura
  const getPropertySafely = (propName: string, defaultValue: any) => {
    if (!props[propName]) {
      console.warn(`Propiedad '${propName}' no encontrada para producto ID: ${page.id}`)
      return defaultValue
    }
    return props[propName]
  }
  
  // Función auxiliar para buscar propiedades con tolerancia a espacios
  const findProperty = (baseNames: string[]): any => {
    // Primero intentar con los nombres exactos
    for (const name of baseNames) {
      if (props[name]) return props[name];
    }
    
    // Si no se encuentra, buscar considerando espacios adicionales
    const propKeys = Object.keys(props);
    for (const name of baseNames) {
      const matchingKey = propKeys.find(key => 
        key.trim().toLowerCase() === name.toLowerCase());
      if (matchingKey) return props[matchingKey];
    }
    
    return null;
  };
  
  // Verificar nombres de propiedades alternativos con tolerancia a espacios
  // Notion puede tener nombres con mayúsculas/minúsculas diferentes, acentos o espacios adicionales
  const nameProperty = findProperty(['Nombre', 'nombre', 'Name', 'name']);
  const categoryProperty = findProperty(['Categoria', 'categoria', 'Category', 'category']);
  const descProperty = findProperty(['Descripción', 'descripcion', 'Description', 'description']);
  const priceProperty = findProperty(['Precio', 'precio', 'Price', 'price']);
  const featuresProperty = findProperty(['Caracteristicas', 'caracteristicas', 'Features', 'features']);
  const colorProperty = findProperty(['Color', 'color', 'Colors', 'colors']);
  const imagesProperty = findProperty(['Imagenes', 'imagenes', 'Images', 'images']);
  const availableProperty = findProperty(['Disponibilidad', 'disponibilidad', 'Available', 'available']);
  const slugProperty = findProperty(['Slug', 'slug']);
  
  // Verificar si hay propiedades faltantes críticas
  if (!nameProperty) {
    console.error('Propiedad de nombre no encontrada. Propiedades disponibles:', Object.keys(props))
  }
  
  try {
    // Intentar acceder al nombre con manejo de errores detallado
    let name = ''
    try {
      name = nameProperty?.title?.[0]?.plain_text || ''
      if (!name) {
        console.warn('Título vacío para el producto:', page.id)
      }
    } catch (error) {
      console.error('Error al acceder al título:', error)
    }
    
    // Obtener categoría con múltiples alternativas
    let category = ''
    try {
      if (categoryProperty?.select?.name) {
        category = categoryProperty.select.name
      } else if (categoryProperty?.multi_select?.[0]?.name) {
        category = categoryProperty.multi_select[0].name
      }
    } catch (error) {
      console.error('Error al acceder a la categoría:', error)
    }
    
    // Imágenes con manejo de errores mejorado
    let images: { url: string; name: string }[] = []
    try {
      // Imprimir para depuración qué tipo de datos tenemos para las imágenes
      console.log(`Procesando imágenes para producto ID: ${page.id}, nombre: ${name}`)
      if (imagesProperty) {
        console.log('Estructura del campo de imágenes:', JSON.stringify(imagesProperty, null, 2))
      } else {
        console.warn('No se encontró el campo de imágenes para este producto')
      }
      
      // Procesar imágenes solo si tenemos el campo files
      if (imagesProperty?.files && Array.isArray(imagesProperty.files)) {
        console.log(`Encontradas ${imagesProperty.files.length} imágenes potenciales`)
        
        images = imagesProperty.files.map((file: any, index: number) => {
          try {
            // Verificar el tipo de imagen (externa o cargada a Notion)
            console.log(`Imagen #${index + 1}:`, 
              file.type === 'external' ? `Externa: ${file.external?.url || 'URL no disponible'}` : 
              file.type === 'file' ? `Archivo: ${file.file?.url || 'URL no disponible'}` : 
              `Tipo desconocido: ${file.type}`)
            
            // Determinar la URL correcta según el tipo
            const url = file.type === 'external' ? file.external?.url : 
                        file.type === 'file' ? file.file?.url : '';
                        
            if (!url) {
              console.warn(`Imagen #${index + 1} no tiene URL válida, tipo: ${file.type}`)
            }
            
            return {
              url: url || '',
              name: file.name || `imagen-${index + 1}`
            }
          } catch (fileError) {
            console.error(`Error procesando archivo de imagen #${index + 1}:`, fileError)
            return { url: '', name: `error-image-${index + 1}` }
          }
        }).filter((img: { url: string }) => img.url) // Filtrar imágenes sin URL
        
        console.log(`Imágenes válidas después de filtrar: ${images.length}`)
        if (images.length > 0) {
          console.log('Primera imagen URL:', images[0].url)
        }
      }
    } catch (imagesError) {
      console.error('Error procesando imágenes:', imagesError)
    }
    
    // Construir el producto con manejo de errores para cada propiedad
    return {
      id: page.id,
      name: name,
      category: category,
      description: descProperty?.rich_text?.[0]?.plain_text || '',
      price: priceProperty?.number || 0,
      features: featuresProperty?.rich_text?.[0]?.plain_text || '',
      colors: colorProperty?.multi_select?.map((c: { name: string }) => c.name) || [],
      images: images.length > 0 ? images : [{ url: '/images/placeholder.jpg', name: 'Imagen no disponible' }],
      available: availableProperty?.checkbox ?? true, // Por defecto disponible si no se especifica
      slug: slugProperty?.rich_text?.[0]?.plain_text || page.id
    }
  } catch (error) {
    console.error('Error general mapeando producto:', error)
    // Devolver un producto básico para evitar errores
    return {
      id: page.id,
      name: 'Producto sin nombre',
      category: 'Sin categoría',
      description: '',
      price: 0,
      features: '',
      colors: [],
      images: [{ url: '/images/placeholder.jpg', name: 'Imagen no disponible' }],
      available: true,
      slug: page.id
    }
  }
}

// Función para obtener todos los productos
// Función auxiliar para obtener datos de muestra cuando falla la conexión con Notion
function getTestProductsData(): Product[] {
  return [
    {
      id: 'test-product-1',
      name: 'Hoodie de Entrenamiento',
      category: 'Hoodies',
      description: 'Hoodie cómodo para tus entrenamientos intensos.',
      price: 39.99,
      features: 'Material de alta calidad\nResistente al sudor\nDisponible en varios colores',
      colors: ['Negro', 'Gris', 'Azul'],
      images: [{ url: '/images/products/austrian-oak-hoodie-front.jpg', name: 'Hoodie 1' }],
      available: true,
      slug: 'hoodie-entrenamiento'
    },
    {
      id: 'test-product-2',
      name: 'Camiseta Técnica',
      category: 'Tanks',
      description: 'Camiseta transpirable para tus sesiones de cardio.',
      price: 24.99,
      features: 'Tejido ligero\nSecado rápido\nTecnología anti-olor',
      colors: ['Blanco', 'Negro'],
      images: [{ url: '/images/products/molecule-tee-front.jpg', name: 'Camiseta 1' }],
      available: true,
      slug: 'camiseta-tecnica'
    },
    {
      id: 'test-product-3',
      name: 'Shorts de Entrenamiento',
      category: 'Shorts',
      description: 'Shorts cómodos con bolsillos laterales.',
      price: 29.99,
      features: 'Material elástico\nBolsillos con cremallera\nCintura ajustable',
      colors: ['Negro', 'Gris'],
      images: [{ url: '/images/products/testosterone-metal-hoodie-front.jpg', name: 'Shorts 1' }],
      available: true,
      slug: 'shorts-entrenamiento'
    }
  ]
}

// Función auxiliar para intentar la conexión con un ID específico
async function tryFetchProducts(databaseId: string): Promise<Product[] | null> {
  try {
    console.log('Intentando conectar a Notion con Database ID:', databaseId)
    
    // Obtener todos los productos sin filtro para depuración
    const response = await notion.databases.query({
      database_id: databaseId
      // Eliminamos el filtro temporalmente para ver todos los productos
    })
    
    console.log('Conexión exitosa con Notion, encontrados', response.results.length, 'productos')
    
    // Imprimir información detallada sobre la primera página para depuración
    if (response.results.length > 0) {
      const samplePage = response.results[0] as any // Usar any temporalmente para acceder a las propiedades
      console.log('=== MUESTRA DE DATOS DE NOTION ===')
      console.log('ID:', samplePage.id)
      
      // Verificar si la página tiene propiedades antes de intentar acceder a ellas
      if (samplePage.properties) {
        console.log('Propiedades disponibles:', Object.keys(samplePage.properties))
        
        // Acceder a la primera propiedad si existe
        const propertyKeys = Object.keys(samplePage.properties)
        if (propertyKeys.length > 0) {
          const firstPropertyKey = propertyKeys[0]
          console.log('Muestra de la primera propiedad:', 
            firstPropertyKey, 
            JSON.stringify(samplePage.properties[firstPropertyKey], null, 2))
        }
      } else {
        console.log('La página no tiene propiedades o está en un formato inesperado')
      }
    }
    
    // Mapear todos los productos y filtrar los inválidos
    const products = response.results.map(page => {
      try {
        return notionPageToProduct(page)
      } catch (error) {
        console.error('Error al mapear producto de Notion:', error, 'Page ID:', page.id)
        return null
      }
    }).filter(Boolean) as Product[]
    
    console.log('Productos mapeados correctamente:', products.length)
    return products
  } catch (error: any) {
    console.error(`Error fetching products from Notion with database ID ${databaseId}:`, error.message)
    return null
  }
}

export const getProducts = cache(async (): Promise<Product[]> => {
  // SOLUCIÓN TEMPORAL: Usar datos de prueba para resolver problema de despliegue
  console.log('Usando datos de prueba para el despliegue')
  return getTestProductsData()
  
  // Código original comentado para referencia futura:
  /*
  // 1. Intentar primero con el ID principal
  const primaryResult = await tryFetchProducts(NOTION_DATABASE_ID)
  if (primaryResult) {
    return primaryResult
  }
  
  console.log('ID principal falló, intentando con IDs alternativos...')
  
  // 2. Si falla, intentar con los IDs alternativos
  for (const alternativeId of ALTERNATIVE_DATABASE_IDS) {
    const alternativeResult = await tryFetchProducts(alternativeId)
    if (alternativeResult) {
      console.log('Conexión exitosa con ID alternativo:', alternativeId)
      return alternativeResult
    }
  }
  
  // 3. Si todos los intentos fallan, devolver datos de prueba
  console.log('Todos los intentos de conexión a Notion fallaron, devolviendo datos de prueba')
  return getTestProductsData()
  */
})

// Función para obtener productos por categoría
export const getProductsByCategory = cache(async (category: string): Promise<Product[]> => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
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
    
    return response.results.map(notionPageToProduct)
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
})

// Función para obtener un producto por slug
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
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
    
    return notionPageToProduct(response.results[0])
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
})

// Función para obtener un producto por ID
export const getProductById = cache(async (id: string): Promise<Product | null> => {
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    return notionPageToProduct(page)
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    return null
  }
})