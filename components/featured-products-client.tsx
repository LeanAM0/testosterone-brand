"use client"

import Link from "next/link"
import ProductCard from "@/components/product-card"
import { useTranslation } from "@/context/language-context"
import type { Product } from "@/lib/product-adapter"

interface FeaturedProductsClientProps {
  products: Product[]
}

/**
 * Componente cliente para mostrar productos destacados
 * Este componente maneja la parte interactiva y de traducción
 */
export default function FeaturedProductsClient({ products }: FeaturedProductsClientProps) {
  const { t } = useTranslation()
  
  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
        {t("featured.collection")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>

      <div className="mt-8 md:mt-12 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center px-6 py-3 border border-white hover:border-garnet hover:text-garnet text-white font-medium transition-colors duration-200 uppercase tracking-wider"
        >
          {t("view.all.products")}
        </Link>
      </div>
    </>
  )
}