"use client"

import { useState } from "react"
import Image from "next/image"
import { products } from "@/lib/data"
import WhatsAppButton from "@/components/whatsapp-button"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/context/language-context"
import Loader from "@/components/loader"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const [selectedSize, setSelectedSize] = useState("M")
  const sizes = ["S", "M", "L", "XL", "XXL"]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  const nextImage = () => {
    setImageLoading(true)
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setImageLoading(true)
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative aspect-[3/4]">
            <div className="relative h-full w-full">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-gray z-10">
                  <Loader size="medium" />
                </div>
              )}

              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className={`object-cover transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                onLoadingComplete={() => setImageLoading(false)}
                priority={currentImageIndex === 0}
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white z-20"
                    aria-label={t("product.previous")}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white z-20"
                    aria-label={t("product.next")}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex justify-center mt-4 gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setImageLoading(true)
                      setCurrentImageIndex(index)
                    }}
                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? "bg-garnet" : "bg-gray-500"}`}
                    aria-label={`${t("product.view_image")} ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-400">{t(`shop.${product.category.toLowerCase()}`)}</p>
              <p className="text-xl sm:text-2xl font-bold mt-4">{product.price}</p>
            </div>

            <div className="border-t border-gray-800 pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t("product.description")}</h3>
              <p className="text-gray-300">{product.description}</p>
            </div>

            <div className="border-t border-gray-800 pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t("product.size")}</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center
                      ${selectedSize === size ? "bg-garnet text-white" : "bg-dark-gray text-white hover:bg-light-gray"}
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 sm:pt-6">
              <WhatsAppButton productName={product.name} selectedSize={selectedSize} />
            </div>

            <div className="border-t border-gray-800 pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">{t("product.features")}</h3>
              <ul className="list-disc pl-5 text-gray-300 space-y-1 sm:space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}