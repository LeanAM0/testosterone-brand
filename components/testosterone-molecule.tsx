"use client"

import { useEffect, useState } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

// Solución alternativa: Usaremos la imagen de TikTok como respaldo ya que sabemos que funciona
const TIKTOK_LOGO_URL = "/images/tiktok-logo.png";

export default function TestosteroneMolecule({ className = "" }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [imageError, setImageError] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const springConfig = { damping: 25, stiffness: 100 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Efecto para establecer que estamos en el navegador
  useEffect(() => {
    setIsBrowser(true)
    console.log("TestosteroneMolecule: Componente montado usando solución alternativa");
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
        {/* Esta es una solución temporal - Usamos SVG en lugar de PNG */}
        {!imageError ? (
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-auto"
            style={{ maxWidth: "500px" }}
          >
            {/* Estructura simplificada de la molécula de testosterona */}
            <g fill="none" stroke="currentColor" strokeWidth="2">
              {/* Anillos hexagonales y pentagonales */}
              <path d="M50,100 L70,80 L100,80 L120,100 L100,120 L70,120 Z" />
              <path d="M120,100 L140,80 L170,80 L190,100 L170,120 L140,120 Z" />
              <path d="M10,100 L30,80 L50,100 L30,120 Z" />
              
              {/* Enlaces entre anillos */}
              <line x1="50" y1="100" x2="10" y2="100" />
              <line x1="120" y1="100" x2="140" y2="100" />
              
              {/* Grupos químicos */}
              <circle cx="30" cy="60" r="10" />
              <circle cx="170" cy="60" r="10" />
              
              {/* Enlaces a grupos */}
              <line x1="30" y1="80" x2="30" y2="70" />
              <line x1="170" y1="80" x2="170" y2="70" />
            </g>
            <text x="60" y="150" fill="currentColor" fontSize="10">Testosterone C19H28O2</text>
          </svg>
        ) : (
          <img 
            src={TIKTOK_LOGO_URL} 
            alt="Logo alternativo" 
            className="w-full h-auto"
            onError={() => {
              console.error("Error cargando imagen alternativa");
              // No cambiamos estado para evitar loop infinito
            }}
          />
        )}
      </motion.div>
    </div>
  )
}