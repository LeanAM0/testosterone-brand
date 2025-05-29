"use client"

import Link from "next/link"
import { useTranslation } from "@/context/language-context"

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Página no encontrada</h2>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-garnet hover:bg-opacity-90 text-white font-medium transition-colors duration-200 uppercase tracking-wider"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}