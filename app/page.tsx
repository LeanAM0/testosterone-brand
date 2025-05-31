import Hero from "@/components/hero"
import { getProducts } from "@/lib/notion"
import { adaptNotionProductsToAppProducts } from "@/lib/product-adapter"
import FeaturedProductsClient from "@/components/featured-products-client"
import VisionSectionClient from "@/components/vision-section-client"

// Función auxiliar para obtener productos desde Notion
async function getFeaturedProducts() {
  try {
    // Obtenemos todos los productos de Notion
    const notionProducts = await getProducts();
    
    // Convertimos los productos al formato de la aplicación
    const appProducts = adaptNotionProductsToAppProducts(notionProducts);
    
    // Seleccionamos hasta 3 productos destacados (los primeros de la lista)
    // En un escenario real, podrías tener un campo "destacado" en Notion
    return appProducts.slice(0, 3);
  } catch (error) {
    console.error("Error al obtener productos destacados:", error);
    return [];
  }
}

export default async function Home() {
  // Obtenemos los productos destacados desde Notion
  const featuredProducts = await getFeaturedProducts();
  
  return (
    <>
      <Hero />

      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Pasamos los productos destacados al componente cliente para renderizarlos */}
          <FeaturedProductsClient products={featuredProducts} />
        </div>
      </section>

      {/* Sección de visión de la empresa */}
      <section className="py-12 md:py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <VisionSectionClient />
        </div>
      </section>
    </>
  )
}