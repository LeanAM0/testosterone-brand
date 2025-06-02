"use client"

import { useEffect, useState } from "react"

export default function TestosteroneMolecule({ className = "" }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
    console.log("Componente simplificado montado correctamente");
  }, [])

  if (!isBrowser) {
    return null
  }

  // Componente simplificado que solo muestra un rectángulo básico
  return (
    <div className={`${className} bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center`}>
      <div className="text-xl font-bold mb-2">Testosterone</div>
      <div className="text-gray-300">C₁₉H₂₈O₂</div>
      <div className="my-4 border-2 border-gray-600 rounded-full p-6">
        <span className="text-4xl">T</span>
      </div>
      <div className="text-sm text-gray-400">Molécula de Testosterona</div>
    </div>
  )
}