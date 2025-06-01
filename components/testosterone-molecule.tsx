"use client"

import { useEffect, useState } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

interface TestosteroneMoleculeProps {
  className?: string
}

/**
 * TestosteroneMolecule: Componente interactivo que muestra una molécula de testosterona
 * que reacciona al movimiento del cursor o a la orientación del dispositivo móvil.
 * 
 * Optimizado para funcionar correctamente tanto en desarrollo local como en Vercel.
 */
export default function TestosteroneMolecule({ className = "" }: TestosteroneMoleculeProps) {
  // Estado para controlar si estamos en el navegador o en SSR
  const [isBrowser, setIsBrowser] = useState(false)
  
  // Valores de movimiento para la animación
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const springConfig = { damping: 25, stiffness: 100 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // Efecto para establecer que estamos en el navegador
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    if (isMobile) return // Deshabilitar movimiento por ratón en móvil
    if (typeof window === 'undefined') return // Evitar ejecución durante SSR

    // Inicialización para evitar valores nulos
    mouseX.set(0)
    mouseY.set(0)

    const handleMouseMove = (e: MouseEvent) => {
      // Calcular posición del ratón relativa al centro de la ventana
      mouseX.set((e.clientX - window.innerWidth / 2) / 20)
      mouseY.set((e.clientY - window.innerHeight / 2) / 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY, isMobile])

  // Manejar orientación del dispositivo para móviles
  useEffect(() => {
    if (!isMobile) return
    if (typeof window === 'undefined') return // Evitar ejecución durante SSR

    // Inicialización para evitar valores nulos
    mouseX.set(0)
    mouseY.set(0)

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
        mouseX.set(e.gamma / 2) // Inclinación izquierda/derecha
        mouseY.set(e.beta / 2) // Inclinación adelante/atrás
      }
    }

    try {
      window.addEventListener("deviceorientation", handleOrientation)
      return () => {
        window.removeEventListener("deviceorientation", handleOrientation)
      }
    } catch (error) {
      console.error("Error con eventos de orientación:", error)
      return () => {}
    }
  }, [mouseX, mouseY, isMobile])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {isBrowser && (
        <motion.div
          className="w-full h-full flex items-center justify-center"
          style={{
            x,
            y,
          }}
        >
        <div
          className="relative opacity-20 w-full h-full flex items-center justify-center"
          style={{
            filter: "invert(1) brightness(0.9) contrast(1.2)",
          }}
        >
          <div className="relative w-[1200px] h-[800px] md:w-[1200px] md:h-[800px] scale-[0.6] sm:scale-[0.8] md:scale-100">
            <Image
              src="/images/testosterone-molecule.png"
              alt="Testosterone Molecule"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      </motion.div>
      )}
    </div>
  )
}