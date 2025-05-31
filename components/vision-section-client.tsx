"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/context/language-context"

/**
 * Componente cliente para la sección de visión
 * Maneja las traducciones y la interactividad
 */
export default function VisionSectionClient() {
  const { t } = useTranslation()
  
  return (
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
  )
}