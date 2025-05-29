"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Loader from "./loader"

interface ProductCardProps {
  id: string
  name: string
  image: string
  price: string
  category: string
}

const ProductCard = ({ id, name, image, price, category }: ProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(true)

  return (
    <Link href={`/shop/${id}`} className="block group">
      <div className="product-card relative overflow-hidden bg-dark-gray">
        <div className="aspect-[3/4] relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-gray">
              <Loader size="small" />
            </div>
          )}

          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
            onLoadingComplete={() => setImageLoading(false)}
            priority={false}
          />

          <div className="product-info absolute inset-0 flex flex-col justify-end p-4">
            <h3 className="text-lg font-bold">{name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-300">{category}</span>
              <span className="text-sm font-bold">{price}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard