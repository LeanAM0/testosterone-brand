"use client"

import Image from "next/image"
import Link from "next/link"
import Hero from "@/components/hero"
import ProductCard from "@/components/product-card"
import { featuredProducts } from "@/lib/data"
import { useTranslation } from "@/context/language-context"

export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Hero />

      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            {t("featured.collection")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
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
        </div>
      </section>

      <section className="py-12 md:py-20 bg-dark-gray">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">{t("our.vision")}</h2>
              <p className="text-gray-300 mb-4 md:mb-6">{t("vision.paragraph1")}</p>
              <p className="text-gray-300 mb-4 md:mb-6">{t("vision.paragraph2")}</p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 bg-garnet hover:bg-opacity-90 text-white font-medium transition-colors duration-200 uppercase tracking-wider"
              >
                {t("learn.more")}
              </Link>
            </div>

            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] mt-6 md:mt-0">
              <Image src="/images/vision.jpg" alt={t("our.vision")} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}