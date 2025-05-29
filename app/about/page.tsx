"use client"

import Image from "next/image"
import { useTranslation } from "@/context/language-context"

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center">{t("about.title")}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t("about.values")}</h2>
            <p className="text-gray-300 mb-6">{t("about.values.text")}</p>

            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-garnet">{t("about.discipline")}</h3>
                <p className="text-gray-300">{t("about.discipline.text")}</p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-garnet">{t("about.aesthetics")}</h3>
                <p className="text-gray-300">{t("about.aesthetics.text")}</p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-garnet">{t("about.performance")}</h3>
                <p className="text-gray-300">{t("about.performance.text")}</p>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] sm:h-[400px] md:h-[600px] order-1 md:order-2">
            <Image src="/images/values.jpg" alt={t("about.values")} fill className="object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative h-[300px] sm:h-[400px] md:h-[600px]">
            <Image src="/images/story.jpg" alt={t("about.story")} fill className="object-cover" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">{t("about.story")}</h2>
            <p className="text-gray-300 mb-4 md:mb-6">{t("about.story.text1")}</p>
            <p className="text-gray-300 mb-4 md:mb-6">{t("about.story.text2")}</p>
            <p className="text-gray-300">{t("about.story.text3")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}