import { getProducts } from "@/lib/notion"
import { adaptNotionProductsToAppProducts } from "@/lib/product-adapter"
import ShopClient from "@/components/shop-client"

/**
 * Esta función carga los productos de Notion para renderizado del lado del servidor
 * Con mejor manejo de errores para entornos de producción
 */
async function getProductsData() {
  try {
    console.log('Iniciando carga de productos para la página de tienda...');
    
    // Obtenemos los productos de Notion con manejo de errores
    const notionProducts = await getProducts();
    
    // Verificar si tenemos productos válidos
    if (!notionProducts || !Array.isArray(notionProducts)) {
      console.error('La función getProducts no devolvió un array válido');
      return []; // Devolver array vacío para evitar errores
    }
    
    console.log(`Se obtuvieron ${notionProducts.length} productos de Notion`);
    
    // Los convertimos al formato que espera nuestra aplicación
    const adaptedProducts = adaptNotionProductsToAppProducts(notionProducts);
    
    console.log(`Se adaptaron ${adaptedProducts.length} productos correctamente`);
    return adaptedProducts;
  } catch (error) {
    console.error("Error al cargar productos de Notion:", error);
    // En caso de error, devolvemos un array vacío para evitar que la aplicación se rompa
    return [];
  }
}

/**
 * Página principal de la tienda
 * Esta es una función asíncrona que carga datos desde Notion y luego renderiza
 * el componente cliente para manejar la interactividad
 */
export default async function ShopPage() {
  console.log('Renderizando ShopPage...');
  
  // Obtenemos los productos desde Notion con un try-catch para mayor seguridad
  let products;
  try {
    products = await getProductsData();
  } catch (error) {
    console.error('Error fatal al obtener productos:', error);
    products = []; // Fallback a un array vacío para evitar errores
  }
  
  // Verificación adicional de seguridad
  if (!products || !Array.isArray(products)) {
    console.warn('Los productos no son un array válido en ShopPage');
    products = []; // Garantizar que products sea siempre un array
  }
  
  // Extraemos categorías únicas de los productos con manejo de errores
  let uniqueCategories: string[] = [];
  try {
    uniqueCategories = Array.from(
      new Set(products.map(product => product.category || 'Sin categoría'))
    ).filter(category => category); // Filtrar categorías vacías
  } catch (error) {
    console.error('Error al extraer categorías:', error);
  }
  
  // Creamos nuestro array de categorías con "All" al principio
  const categories = [
    { id: "All", label: "Todos" }, // Categoría predeterminada
    ...uniqueCategories.map(category => ({
      id: category,
      label: category // Usamos el nombre de la categoría como etiqueta
    }))
  ];
  
  console.log(`Renderizando tienda con ${products.length} productos y ${categories.length} categorías`);
  
  // Delegamos el manejo de la interactividad al componente cliente
  // con un objeto de propiedades seguro
  return <ShopClient products={products} initialCategories={categories} />
}