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
    // Intentar obtener primero de process.env
    const value = process.env[name];
    if (value) {
      return value;
    }
    
    // Si no hay valor, usar el valor por defecto
    console.log(`Variable de entorno ${name} no encontrada, usando valor por defecto`);
    return defaultValue;
  }
  // En el cliente, usamos el valor por defecto (por seguridad)
  return defaultValue;
};

// Valor principal probado en modo desarrollo
const PRIMARY_API_KEY = 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0';

// IMPORTANTE: Usar el ID correcto sin guiones que funciona garantizado
// El nombre de la base de datos es: TESTOSTERONE DATABASE
const WORKING_DATABASE_ID = '1f625056207c80c3b951ff146b3c2c51';

// Obtener valores de variables de entorno o usar los que sabemos que funcionan
const NOTION_API_KEY = getEnvVariable('NOTION_API_KEY', PRIMARY_API_KEY);
const NOTION_DATABASE_ID = getEnvVariable('NOTION_DATABASE_ID', WORKING_DATABASE_ID);

// No necesitamos IDs alternativos ya que usamos el que funciona como fallback
const ALTERNATIVE_DATABASE_IDS: string[] = [];

// Inicializar cliente Notion - Manejar con try/catch para mayor robustez
let notion: Client;
try {
  notion = new Client({
    auth: NOTION_API_KEY
  });
  console.log('Cliente Notion inicializado correctamente');
} catch (error) {
  console.error('Error al inicializar cliente Notion:', error);
  // Crear un cliente fallback que devolverá datos de prueba
  notion = {} as Client;
}

// Función auxiliar para convertir una página de Notion a un objeto Product
const notionPageToProduct = (page: any): Product => {
  // En caso de recibir un valor nulo o indefinido, devolver un producto vacío
  if (!page || !page.properties) {
    console.error('Página de Notion inválida o sin propiedades');
    return {
      id: 'invalid-page',
      name: 'Producto no disponible',
      category: 'Sin categoría',
      description: 'No hay descripción disponible',
      price: 0,
      features: '',
      colors: [],
      images: [],
      available: false,
      slug: 'invalid-product'
    };
  }
  
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
  const nameProperty = findProperty(['Nombre', 'nombre', 'Name', 'name']);
  const categoryProperty = findProperty(['Categoria', 'categoria', 'Category', 'category']);
  const descProperty = findProperty(['Descripción', 'descripcion', 'Description', 'description']);
  const priceProperty = findProperty(['Precio', 'precio', 'Price', 'price']);
  const featuresProperty = findProperty(['Caracteristicas', 'caracteristicas', 'Features', 'features']);
  const colorProperty = findProperty(['Color', 'color', 'Colors', 'colors']);
  const imagesProperty = findProperty(['Imagenes', 'imagenes', 'Images', 'images']);
  const availableProperty = findProperty(['Disponibilidad', 'disponibilidad', 'Available', 'available']);
  const slugProperty = findProperty(['Slug', 'slug']);
  
  // Inicializar valores por defecto
  let name = '';
  let category = '';
  let description = '';
  let price = 0;
  let features = '';
  let colors: string[] = [];
  let images: { url: string; name: string }[] = [];
  let available = false;
  let slug = '';
  
  try {
    // Extraer nombre con manejo de errores
    try {
      name = nameProperty?.title?.[0]?.plain_text || '';
      if (!name) {
        name = 'Producto sin nombre';
      }
    } catch (error) {
      name = 'Error al extraer nombre';
    }
    
    // Extraer categoría con manejo de errores
    try {
      if (categoryProperty?.select?.name) {
        category = categoryProperty.select.name;
      } else if (categoryProperty?.multi_select?.[0]?.name) {
        category = categoryProperty.multi_select[0].name;
      } else {
        category = 'Sin categoría';
      }
    } catch (error) {
      category = 'Error en categoría';
    }
    
    // Extraer descripción con manejo de errores
    try {
      if (descProperty?.rich_text?.[0]?.plain_text) {
        description = descProperty.rich_text[0].plain_text;
      } else {
        description = 'Sin descripción';
      }
    } catch (error) {
      description = 'Error en descripción';
    }
    
    // Extraer precio con manejo de errores
    try {
      if (typeof priceProperty?.number === 'number') {
        price = priceProperty.number;
      } else {
        price = 0;
      }
    } catch (error) {
      price = 0;
    }
    
    // Extraer características con manejo de errores
    try {
      if (featuresProperty?.rich_text?.[0]?.plain_text) {
        features = featuresProperty.rich_text[0].plain_text;
      } else {
        features = '';
      }
    } catch (error) {
      features = '';
    }
    
    // Extraer colores con manejo de errores
    try {
      if (colorProperty?.multi_select && Array.isArray(colorProperty.multi_select)) {
        colors = colorProperty.multi_select.map((color: any) => color.name || '');
      } else {
        colors = [];
      }
    } catch (error) {
      colors = [];
    }
    
    // Extraer imágenes con manejo de errores
    try {
      if (imagesProperty?.files && Array.isArray(imagesProperty.files)) {
        images = imagesProperty.files.map((file: any, index: number) => {
          try {
            const url = file.type === 'external' ? file.external?.url : 
                      file.type === 'file' ? file.file?.url : '';
            return {
              url: url || '',
              name: file.name || `imagen-${index + 1}`
            };
          } catch (fileError) {
            return { url: '', name: `error-image-${index + 1}` };
          }
        }).filter((img: { url: string }) => img.url);
      }
    } catch (error) {
      images = [];
    }
    
    // Extraer disponibilidad con manejo de errores
    try {
      available = availableProperty?.checkbox === true;
    } catch (error) {
      available = false;
    }
    
    // Extraer slug con manejo de errores
    try {
      if (slugProperty?.rich_text?.[0]?.plain_text) {
        slug = slugProperty.rich_text[0].plain_text;
      } else {
        slug = page.id || '';
      }
    } catch (error) {
      slug = page.id || '';
    }
    
  } catch (generalError) {
    console.error('Error general procesando producto:', generalError);
  }
  
  // Construir y devolver el objeto producto con valores sanitizados
  return {
    id: page.id || 'unknown-id',
    name,
    category,
    description,
    price,
    features,
    colors,
    images,
    available,
    slug: slug || page.id || 'unknown-slug',
  };
};

// Productos de prueba para usar como fallback
const getTestProductsData = (): Product[] => {
  return [
    {
      id: 'test-product-1',
      name: 'Camiseta Demo',
      category: 'Camisetas',
      description: 'Una camiseta de demostración para mostrar cuando la API falla.',
      price: 29.99,
      features: 'Material de alta calidad\nDiseño exclusivo\nDiferentes tallas disponibles',
      colors: ['Negro', 'Blanco', 'Rojo'],
      images: [{ 
        url: 'https://images.unsplash.com/photo-1566584346306-7e079de92a9d?q=80&w=1000',
        name: 'camiseta-demo' 
      }],
      available: true,
      slug: 'camiseta-demo'
    },
    {
      id: 'test-product-2',
      name: 'Pantalón Demo',
      category: 'Pantalones',
      description: 'Un pantalón de demostración.',
      price: 49.99,
      features: 'Material elástico\nMúltiples bolsillos\nLigero y duradero',
      colors: ['Azul', 'Negro'],
      images: [{ 
        url: 'https://images.unsplash.com/photo-1593386850972-222459d4130c?q=80&w=987',
        name: 'pantalon-demo' 
      }],
      available: true,
      slug: 'pantalon-demo'
    }
  ];
};

// Función auxiliar para intentar la conexión con un ID específico
async function tryFetchProducts(databaseId: string): Promise<Product[] | null> {
  try {
    console.log(`Intentando obtener productos con Database ID: ${databaseId}`);
    
    // Si notion no está inicializado correctamente, devolver null
    if (!notion.databases) {
      console.error('Cliente Notion no inicializado correctamente');
      return null;
    }
    
    // Obtener todas las páginas de la base de datos
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Disponibilidad',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: 'Nombre',
          direction: 'ascending'
        }
      ]
    });
    
    console.log(`Éxito! Se encontraron ${response.results.length} productos`);
    
    // Convertir las páginas a productos
    return response.results.map(notionPageToProduct);
  } catch (error) {
    console.error(`Error al obtener productos con Database ID ${databaseId}:`, error);
    return null;
  }
}

// Función principal para obtener productos con manejo de errores mejorado
export const getProducts = cache(async (): Promise<Product[]> => {
  console.log('Iniciando obtención de productos desde Notion...');
  
  try {
    // 1. Intentar primero con el ID principal
    const primaryResult = await tryFetchProducts(NOTION_DATABASE_ID);
    if (primaryResult) {
      console.log('Productos obtenidos exitosamente del ID principal');
      return primaryResult;
    }
    
    // 2. Si falla, intentar con IDs alternativos
    console.log('Fallo al obtener productos del ID principal, probando alternativas...');
    for (const alternativeId of ALTERNATIVE_DATABASE_IDS) {
      const alternativeResult = await tryFetchProducts(alternativeId);
      if (alternativeResult) {
        console.log(`Productos obtenidos exitosamente del ID alternativo: ${alternativeId}`);
        return alternativeResult;
      }
    }
    
    // 3. Si todos fallan, usar datos de prueba pero avisar en la consola
    console.warn('Todos los intentos de conexión a Notion fallaron, usando datos de prueba');
    return getTestProductsData();
    
  } catch (error) {
    // Capturar cualquier error no controlado y devolver datos de prueba
    console.error('Error general al obtener productos:', error);
    console.log('Retornando datos de prueba debido a error');
    return getTestProductsData();
  }
});