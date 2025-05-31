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
  inStock: boolean
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

// Configuración de Notion - usar variables de entorno para las credenciales
// IMPORTANTE: En producción, usa .env.local o variables de entorno seguras
const NOTION_API_KEY = getEnvVariable('NOTION_API_KEY', 'YOUR_NOTION_API_KEY');

// ID de la base de datos de Notion
const NOTION_DATABASE_ID = getEnvVariable('NOTION_DATABASE_ID', 'YOUR_NOTION_DATABASE_ID');

// Inicializar cliente Notion
const notion = new Client({
  auth: NOTION_API_KEY
})

// Función auxiliar para convertir una página de Notion a un objeto Product
const notionPageToProduct = (page: any): Product => {
  const props = page.properties
  
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
  
  try {
    // Intentar acceder al nombre con manejo de errores detallado
    let name = '';
    try {
      name = nameProperty?.title?.[0]?.plain_text || '';
    } catch (error) {
      console.error('Error al acceder al título:', error);
    }
    
    // Obtener categoría con múltiples alternativas
    let category = '';
    try {
      if (categoryProperty?.select?.name) {
        category = categoryProperty.select.name;
      } else if (categoryProperty?.multi_select?.[0]?.name) {
        category = categoryProperty.multi_select[0].name;
      }
    } catch (error) {
      console.error('Error al acceder a la categoría:', error);
    }
    
    // Imágenes con manejo de errores mejorado
    let images: { url: string; name: string }[] = [];
    try {
      // Procesar imágenes solo si tenemos el campo files
      if (imagesProperty?.files && Array.isArray(imagesProperty.files)) {
        images = imagesProperty.files.map((file: any, index: number) => {
          try {
            // Determinar la URL correcta según el tipo
            const url = file.type === 'external' ? file.external?.url : 
                        file.type === 'file' ? file.file?.url : '';
                        
            return {
              url: url || '',
              name: file.name || `imagen-${index + 1}`
            };
          } catch (fileError) {
            console.error(`Error procesando archivo de imagen #${index + 1}:`, fileError);
            return { url: '', name: `error-image-${index + 1}` };
          }
        }).filter((img: { url: string }) => img.url); // Filtrar imágenes sin URL
      }
    } catch (imagesError) {
      console.error('Error procesando imágenes:', imagesError);
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
      slug: slugProperty?.rich_text?.[0]?.plain_text || page.id,
      inStock: availableProperty?.checkbox ?? true
    };
  } catch (error) {
    console.error('Error general mapeando producto:', error);
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
      slug: page.id,
      inStock: true
    };
  }
};

// Función para obtener datos de muestra cuando falla la conexión con Notion
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
      slug: 'hoodie-entrenamiento',
      inStock: true
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
      slug: 'camiseta-tecnica',
      inStock: true
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
      slug: 'shorts-entrenamiento',
      inStock: true
    }
  ];
}

// Función auxiliar para intentar la conexión con un ID específico
async function tryFetchProducts(databaseId: string): Promise<Product[] | null> {
  try {
    // Obtener todos los productos sin filtro para depuración
    const response = await notion.databases.query({
      database_id: databaseId
    });
    
    // Mapear todos los productos y filtrar los inválidos
    const products = response.results.map(page => {
      try {
        return notionPageToProduct(page);
      } catch (error) {
        console.error('Error al mapear producto de Notion:', error, 'Page ID:', page.id);
        return null;
      }
    }).filter(Boolean) as Product[];
    
    return products;
  } catch (error: any) {
    console.error(`Error fetching products from Notion with database ID ${databaseId}:`, error.message);
    return null;
  }
}

export const getProducts = cache(async (): Promise<Product[]> => {
  // Intentar obtener productos de Notion
  const notionProducts = await tryFetchProducts(NOTION_DATABASE_ID);
  if (notionProducts) {
    return notionProducts;
  }
  
  // Si falla, devolver datos de prueba
  return getTestProductsData();
});

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
    });
    
    return response.results.map(notionPageToProduct);
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    return [];
  }
});

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
    });
    
    if (response.results.length === 0) {
      // Intentar buscar por ID si no se encuentra por slug
      return getProductById(slug);
    }
    
    return notionPageToProduct(response.results[0]);
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
});

// Función para obtener un producto por ID
export const getProductById = cache(async (id: string): Promise<Product | null> => {
  try {
    const page = await notion.pages.retrieve({ page_id: id });
    return notionPageToProduct(page);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
});