"use client"

import Link from "next/link"
import TestosteroneMolecule from "./testosterone-molecule"
import { useTranslation } from "@/context/language-context"
import BackgroundEffect from "./background-effect"

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section className="relative h-[90vh] md:h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black z-0"
        style={{
          backgroundImage: "url('/images/fitness-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.3) blur(4px)",
        }}
      />

      <BackgroundEffect className="z-[1]" />
      <TestosteroneMolecule className="z-[2]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight">
            {t("hero.discipline")} <br />
            {t("hero.is")} <span className="text-garnet">{t("hero.power")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8 max-w-xl">{t("hero.description")}</p>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-garnet hover:bg-opacity-90 text-white font-medium transition-colors duration-200 uppercase tracking-wider"
          >
            {t("hero.shop_button")}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero