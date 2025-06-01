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
 * Adapta un producto de Notion al formato que utiliza la aplicación
 * 
 * Esta función es como un traductor: toma un "idioma" (formato Notion)
 * y lo convierte a otro "idioma" (formato de la app) que nuestros componentes entienden
 */
export function adaptNotionProductToAppProduct(notionProduct: NotionProduct): AppDisplayProduct {
  try {
    // Convertir el precio de número a string con formato "$XX.XX"
    // Si el precio no es un número válido, usar 0
    const price = typeof notionProduct.price === 'number' ? notionProduct.price : 0;
    const priceString = `$${price.toFixed(2)}`;
    
    // Convertir el campo 'features' de string a array separando por saltos de línea
    // Manejar el caso donde features no sea una cadena
    const features = typeof notionProduct.features === 'string' ? notionProduct.features : '';
    const featuresArray = features
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    // Comprobar que images sea un array antes de usarlo
    const safeImages = Array.isArray(notionProduct.images) ? notionProduct.images : [];
    
    // Obtener la primera imagen para usarla como imagen principal
    const mainImage = safeImages.length > 0 && safeImages[0]?.url
      ? safeImages[0].url 
      : '/images/products/placeholder.jpg';
    
    // Extraer solo las URLs de las imágenes con comprobación de seguridad
    const imageUrls = safeImages
      .map(img => (img && typeof img.url === 'string') ? img.url : '')
      .filter(url => url.length > 0);
    
    // Usar valores por defecto para propiedades faltantes
    return {
      id: notionProduct.slug || notionProduct.id || 'unknown-id', 
      name: notionProduct.name || 'Producto sin nombre',
      category: notionProduct.category || 'Sin categoría',
      price: priceString,
      image: mainImage,
      images: imageUrls.length > 0 ? imageUrls : ['/images/products/placeholder.jpg'],
      description: notionProduct.description || 'Sin descripción disponible',
      features: featuresArray.length > 0 ? featuresArray : ['Características no disponibles']
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
 */
export function adaptNotionProductsToAppProducts(notionProducts: NotionProduct[]): AppDisplayProduct[] {
  return notionProducts.map(adaptNotionProductToAppProduct);
}