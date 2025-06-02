"use client"

import { useEffect, useState } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function TestosteroneMolecule({ className = "" }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const springConfig = { damping: 25, stiffness: 100 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Efecto para establecer que estamos en el navegador
  useEffect(() => {
    setIsBrowser(true)
    // Log para depuración
    console.log("TestosteroneMolecule: Componente montado");
    console.log("TestosteroneMolecule: Ruta de imagen:", "/images/testosterone-molecule-full.png");
  }, [])

  useEffect(() => {
    if (isMobile) return
    if (typeof window === 'undefined') return

    mouseX.set(0)
    mouseY.set(0)

    const handleMouseMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 20)
      mouseY.set((e.clientY - window.innerHeight / 2) / 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY, isMobile])

  useEffect(() => {
    if (!isMobile) return
    if (typeof window === 'undefined') return

    mouseX.set(0)
    mouseY.set(0)

    const handleOrientation = (e) => {
      if (e.gamma && e.beta) {
        mouseX.set(e.gamma / 3)
        mouseY.set(e.beta / 3)
      }
    }

    window.addEventListener("deviceorientation", handleOrientation)
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [mouseX, mouseY, isMobile])

  if (!isBrowser) {
    return null // Evita renderizar en el servidor para prevenir errores de hidratación
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative w-full h-full"
        style={{
          x,
          y,
        }}
      >
        <Image
          src="/images/testosterone-molecule-full.png"
          alt="Testosterone Molecule"
          width={500}
          height={500}
          className="w-full h-auto"
          priority
          onError={(e) => {
            console.error("Error cargando imagen de molécula:", e);
            // Mostrar un mensaje en la consola del navegador para diagnóstico
          }}
          onLoad={() => {
            console.log("Imagen de molécula cargada correctamente");
          }}
        />
      </motion.div>
    </div>
  )
}