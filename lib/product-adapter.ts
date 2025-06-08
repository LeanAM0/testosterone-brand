import { Product as NotionProduct } from './notion';
import { Product as AppProduct } from './types';

// Re-exportamos el tipo Product para que otros componentes puedan importarlo
// directamente desde el adaptador
export type { Product } from './types';

// Definimos una interfaz interna para usar en los componentes de la aplicación
// que sea compatible con lo que esperan los componentes existentes
export interface AppDisplayProduct {
  id: string
  name: string
  category: string
  price: string
  image: string
  images: string[]
  description: string
  features: string[]
}

/**
 * Asegura que un valor sea serializable para evitar errores de hidratación en Next.js
 * @param value Cualquier valor a verificar
 * @returns El valor serializable o un valor por defecto
 */
function ensureSerializable(value: any, defaultValue: any): any {
  try {
    // Probar si el valor es serializable
    JSON.stringify(value);
    return value;
  } catch (error) {
    console.warn('Valor no serializable detectado:', error);
    return defaultValue;
  }
}

/**
 * Adapta un producto de Notion al formato que utiliza la aplicación
 * 
 * Esta función es como un traductor: toma un "idioma" (formato Notion)
 * y lo convierte a otro "idioma" (formato de la app) que nuestros componentes entienden
 */
export function adaptNotionProductToAppProduct(notionProduct: NotionProduct): AppDisplayProduct {
  try {
    // Validación de entrada - si notionProduct es null o undefined
    if (!notionProduct) {
      throw new Error('El producto de Notion es nulo o indefinido');
    }
    
    // Convertir el precio de número a string con formato "$XX.XX"
    // Si el precio no es un número válido, usar 0
    let priceString = '$0.00';
    try {
      const price = typeof notionProduct.price === 'number' ? notionProduct.price : 0;
      priceString = `$${price.toFixed(2)}`;
    } catch (priceError) {
      console.error('Error al formatear precio:', priceError);
    }
    
    // Convertir el campo 'features' de string a array separando por saltos de línea
    // Manejar el caso donde features no sea una cadena
    let featuresArray: string[] = ['Características no disponibles'];
    try {
      const features = typeof notionProduct.features === 'string' ? notionProduct.features : '';
      const processedFeatures = features
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
        
      if (processedFeatures.length > 0) {
        featuresArray = processedFeatures;
      }
    } catch (featuresError) {
      console.error('Error al procesar características:', featuresError);
    }
    
    // Comprobar que images sea un array antes de usarlo
    let mainImage = '/images/products/placeholder.jpg';
    let imageUrls: string[] = ['/images/products/placeholder.jpg'];
    
    try {
      // Validar que images exista y sea un array
      const safeImages = Array.isArray(notionProduct.images) ? notionProduct.images : [];
      
      // Obtener la primera imagen para usarla como imagen principal
      if (safeImages.length > 0 && safeImages[0]?.url && typeof safeImages[0].url === 'string') {
        mainImage = safeImages[0].url;
      }
      
      // Extraer solo las URLs de las imágenes con comprobación de seguridad
      const processedUrls = safeImages
        .map(img => (img && typeof img.url === 'string') ? img.url : '')
        .filter(url => url.length > 0);
        
      if (processedUrls.length > 0) {
        imageUrls = processedUrls;
      }
    } catch (imageError) {
      console.error('Error al procesar imágenes:', imageError);
    }
    
    // Validar otros campos y usar valores por defecto si es necesario
    const id = ensureSerializable(notionProduct.slug || notionProduct.id, 'unknown-id');
    const name = ensureSerializable(notionProduct.name, 'Producto sin nombre');
    const category = ensureSerializable(notionProduct.category, 'Sin categoría');
    const description = ensureSerializable(notionProduct.description, 'Sin descripción disponible');
    
    // Crear el objeto producto con valores validados
    return {
      id,
      name,
      category,
      price: priceString,
      image: mainImage,
      images: imageUrls,
      description,
      features: featuresArray
    };
  } catch (error) {
    console.error('Error al adaptar producto de Notion:', error);
    // Devolver un producto con valores por defecto en caso de error
    return {
      id: 'error-product',
      name: 'Error al cargar producto',
      category: 'Error',
      price: '$0.00',
      image: '/images/products/placeholder.jpg',
      images: ['/images/products/placeholder.jpg'],
      description: 'No se pudo cargar la información del producto',
      features: ['Error al procesar el producto']
    };
  }
}

/**
 * Convierte una lista de productos de Notion al formato de la aplicación
 * Con manejo de errores mejorado para evitar problemas de serialización
 */
export function adaptNotionProductsToAppProducts(notionProducts: NotionProduct[]): AppDisplayProduct[] {
  try {
    // Verificar que notionProducts exista y sea un array
    if (!notionProducts || !Array.isArray(notionProducts)) {
      console.warn('Los productos de Notion no son un array válido');
      return []; // Devolver array vacío para evitar errores
    }
    
    // Mapear cada producto con manejo de errores individual
    return notionProducts.map(product => {
      try {
        return adaptNotionProductToAppProduct(product);
      } catch (error) {
        console.error('Error al adaptar producto individual:', error);
        // Devolver producto de error en lugar de propagar la excepción
        return {
          id: 'error-product',
          name: 'Error al cargar producto',
          category: 'Error',
          price: '$0.00',
          image: '/images/products/placeholder.jpg',
          images: ['/images/products/placeholder.jpg'],
          description: 'No se pudo cargar la información del producto',
          features: ['Error al procesar el producto']
        };
      }
    });
  } catch (error) {
    console.error('Error general al adaptar productos:', error);
    return []; // Devolver array vacío en caso de error general
  }
}