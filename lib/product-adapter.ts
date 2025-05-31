import { Product as NotionProduct } from './notion';
import { Product as AppProduct } from './types';

// Re-exportamos el tipo Product para que otros componentes puedan importarlo
// directamente desde el adaptador
export type { Product } from './types';

/**
 * Adapta un producto de Notion al formato que utiliza la aplicación
 * 
 * Esta función es como un traductor: toma un "idioma" (formato Notion)
 * y lo convierte a otro "idioma" (formato de la app) que nuestros componentes entienden
 */
export function adaptNotionProductToAppProduct(notionProduct: NotionProduct): AppProduct {
  // Convertir el precio de número a string con formato "$XX.XX"
  const priceString = `$${notionProduct.price.toFixed(2)}`;
  
  // Convertir el campo 'features' de string a array separando por saltos de línea
  const featuresArray = notionProduct.features
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  // Obtener la primera imagen para usarla como imagen principal
  const mainImage = notionProduct.images.length > 0 
    ? notionProduct.images[0].url 
    : '/images/products/placeholder.jpg';
  
  // Extraer solo las URLs de las imágenes
  const imageUrls = notionProduct.images.map(img => img.url);
  
  return {
    id: notionProduct.slug || notionProduct.id, // Usamos slug como ID si está disponible
    name: notionProduct.name,
    category: notionProduct.category,
    price: priceString,
    image: mainImage,
    images: imageUrls,
    description: notionProduct.description,
    features: featuresArray
  };
}

/**
 * Convierte una lista de productos de Notion al formato de la aplicación
 */
export function adaptNotionProductsToAppProducts(notionProducts: NotionProduct[]): AppProduct[] {
  return notionProducts.map(adaptNotionProductToAppProduct);
}