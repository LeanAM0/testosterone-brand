"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"
import { useTranslation } from "@/context/language-context"

export default function ShopPage() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    { id: "All", label: t("shop.all") },
    { id: "Tanks", label: t("shop.tanks") },
    { id: "Hoodies", label: t("shop.hoodies") },
    { id: "Compression", label: t("shop.compression") },
    { id: "Shorts", label: t("shop.shorts") },
    { id: "Accessories", label: t("shop.accessories") },
  ]

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center">{t("shop.title")}</h1>

        <div className="mb-8 md:mb-12 flex flex-wrap justify-center gap-2 sm:gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm uppercase tracking-wider
                ${
                  selectedCategory === category.id
                    ? "bg-garnet text-white"
                    : "bg-dark-gray text-white hover:bg-light-gray"
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
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
      </div>
    </div>
  )
}