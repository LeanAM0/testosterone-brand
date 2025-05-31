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
  const featuresProperty = findProperty(['Características', 'caracteristicas', 'Features', 'features']);
  const colorsProperty = findProperty(['Colores', 'colores', 'Colors', 'colors']);
  const imagesProperty = findProperty(['Imágenes', 'imagenes', 'Images', 'images']);
  const availableProperty = findProperty(['Disponible', 'disponible', 'Available', 'available']);
  
  // Extraer nombres
  const nameValue = nameProperty?.title?.[0]?.plain_text || 'Producto sin nombre';
  
  // Extraer categoría - puede ser un select o un texto simple
  let categoryValue = 'Sin categoría';
  if (categoryProperty?.select?.name) {
    categoryValue = categoryProperty.select.name;
  } else if (categoryProperty?.rich_text?.[0]?.plain_text) {
    categoryValue = categoryProperty.rich_text[0].plain_text;
  }
  
  // Extraer descripción
  const descriptionValue = descProperty?.rich_text?.[0]?.plain_text || '';
  
  // Extraer precio - puede ser un número o un texto
  let priceValue = 0;
  if (typeof priceProperty?.number === 'number') {
    priceValue = priceProperty.number;
  } else if (priceProperty?.rich_text?.[0]?.plain_text) {
    const textPrice = priceProperty.rich_text[0].plain_text;
    // Intentar convertir a número eliminando caracteres no numéricos
    const numericPrice = parseFloat(textPrice.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericPrice)) {
      priceValue = numericPrice;
    }
  }
  
  // Extraer características
  const featuresValue = featuresProperty?.rich_text?.[0]?.plain_text || '';
  
  // Extraer colores - puede ser multi_select o texto
  let colorsValue: string[] = [];
  if (colorsProperty?.multi_select) {
    colorsValue = colorsProperty.multi_select.map((item: any) => item.name);
  } else if (colorsProperty?.rich_text?.[0]?.plain_text) {
    // Si es texto, separamos por comas
    colorsValue = colorsProperty.rich_text[0].plain_text
      .split(',')
      .map((color: string) => color.trim())
      .filter((color: string) => color.length > 0);
  }
  
  // Extraer imágenes - puede ser una lista de URLs o un campo de archivos
  let imagesValue: { url: string; name: string }[] = [];
  
  if (imagesProperty?.files && Array.isArray(imagesProperty.files)) {
    imagesValue = imagesProperty.files
      .filter((file: any) => file.type === 'file' || file.type === 'external')
      .map((file: any) => {
        // La URL puede estar en diferentes lugares dependiendo del tipo de archivo
        const url = file.file?.url || file.external?.url || '';
        return {
          url,
          name: file.name || 'image'
        };
      });
  }
  
  // Si no hay imágenes, agregar una imagen por defecto
  if (imagesValue.length === 0) {
    imagesValue = [
      {
        url: 'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1974&auto=format&fit=crop',
        name: 'default-product'
      }
    ];
  }
  
  // Extraer disponibilidad - puede ser un checkbox o un texto
  let availableValue = true;
  if (typeof availableProperty?.checkbox === 'boolean') {
    availableValue = availableProperty.checkbox;
  } else if (availableProperty?.rich_text?.[0]?.plain_text) {
    const textAvailable = availableProperty.rich_text[0].plain_text.toLowerCase();
    availableValue = textAvailable === 'true' || 
                     textAvailable === 'yes' || 
                     textAvailable === 'sí' || 
                     textAvailable === '1';
  }
  
  // Crear slug a partir del nombre
  const slugValue = nameValue
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  
  return {
    id: page.id,
    name: nameValue,
    category: categoryValue,
    description: descriptionValue,
    price: priceValue,
    features: featuresValue,
    colors: colorsValue,
    images: imagesValue,
    available: availableValue,
    slug: slugValue
  }
}

// Función auxiliar para obtener datos de muestra cuando falla la conexión con Notion
const getTestProductsData = (): Product[] => {
  return [
    {
      id: 'sample-1',
      name: 'Camiseta Entrenamientos',
      category: 'Camisetas',
      description: 'Camiseta de alto rendimiento para entrenamientos intensos',
      price: 29.99,
      features: 'Material transpirable, secado rápido, ajuste atlético',
      colors: ['Negro', 'Gris', 'Azul'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?q=80&w=1974&auto=format&fit=crop',
          name: 'camiseta-entrenamiento'
        }
      ],
      available: true,
      slug: 'camiseta-entrenamientos'
    },
    {
      id: 'sample-2',
      name: 'Shorts Deportivos',
      category: 'Pantalones',
      description: 'Shorts cómodos y ligeros para cualquier tipo de entrenamiento',
      price: 24.99,
      features: 'Elásticos, bolsillos laterales, tejido ligero',
      colors: ['Negro', 'Azul marino'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1562501622-170f8183f168?q=80&w=1974&auto=format&fit=crop',
          name: 'shorts-deportivos'
        }
      ],
      available: true,
      slug: 'shorts-deportivos'
    }
  ];
};

// Función auxiliar para intentar la conexión con un ID específico
const tryFetchProducts = async (databaseId: string): Promise<Product[] | null> => {
  try {
    console.log(`Intentando conexión con ID: ${databaseId}`);
    
    // Consultar la base de datos
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Nombre',
          direction: 'ascending',
        },
      ],
    });
    
    // Convertir las páginas a productos
    const products = response.results.map(notionPageToProduct);
    
    console.log(`✅ Conexión exitosa con ID: ${databaseId}`);
    console.log(`   Productos encontrados: ${products.length}`);
    
    return products;
  } catch (error: any) {
    console.error(`❌ Error con ID ${databaseId}:`, error.message);
    
    // Verificar si el error es debido a permisos o ID incorrecto
    if (error.code === 'object_not_found') {
      console.error('   Base de datos no encontrada. Verifica el ID.');
    } else if (error.code === 'unauthorized') {
      console.error('   No autorizado. Verifica la API key de Notion.');
    } else {
      console.error('   Error desconocido.');
    }
    
    return null;
  }
};

// Exportamos la función principal para obtener productos con caché
export const getProducts = cache(async (): Promise<Product[]> => {
  // 1. Intentar primero con el ID principal
  const primaryResult = await tryFetchProducts(NOTION_DATABASE_ID);
  if (primaryResult) {
    return primaryResult;
  }
  
  // 2. Si falla, intentar con IDs alternativos
  console.log('Intentando con IDs alternativos...');
  
  for (const altId of ALTERNATIVE_DATABASE_IDS) {
    const altResult = await tryFetchProducts(altId);
    if (altResult) {
      return altResult;
    }
  }
  
  // 3. Si todos fallan, devolver datos de ejemplo
  console.log('⚠️ Todos los intentos fallaron. Usando datos de ejemplo.');
  return getTestProductsData();
});

// Función para obtener un producto específico por ID
export const getProductById = cache(async (productId: string): Promise<Product | null> => {
  // Obtener todos los productos
  const products = await getProducts();
  
  // Buscar el producto por ID
  const product = products.find(p => p.id === productId);
  
  return product || null;
});

// Función para obtener un producto por slug
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  // Obtener todos los productos
  const products = await getProducts();
  
  // Buscar el producto por slug
  const product = products.find(p => p.slug === slug);
  
  return product || null;
});

// Función para obtener productos por categoría
export const getProductsByCategory = cache(async (category: string): Promise<Product[]> => {
  // Obtener todos los productos
  const products = await getProducts();
  
  // Filtrar por categoría
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
});