"use client"

import { useEffect, useState } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function TestosteroneMolecule({ className = "" }) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [imageSrc, setImageSrc] = useState("/images/testosterone-molecule.png")
  const [imageLoaded, setImageLoaded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const springConfig = { damping: 25, stiffness: 100 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Efecto para establecer que estamos en el navegador y probar diferentes rutas de imágenes
  useEffect(() => {
    setIsBrowser(true)
    
    // Log para depuración
    console.log("TestosteroneMolecule: Componente montado");
    console.log("TestosteroneMolecule: Intentando cargar imagen de ruta inicial:", imageSrc);
    
    // Lista de posibles rutas para probar
    const potentialPaths = [
      "/images/testosterone-molecule.png",
      "testosterone-molecule.png",
      "/testosterone-molecule.png",
      "/public/images/testosterone-molecule.png",
      "/images/tiktok-logo.png" // Esta funciona según lo que mencionaste, podemos usarla temporalmente
    ];
    
    // Función para probar si una imagen se carga correctamente
    const testImage = (path) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
      });
    };
    
    // Probar cada ruta hasta encontrar una que funcione
    const findWorkingImage = async () => {
      for (const path of potentialPaths) {
        console.log(`Probando ruta de imagen: ${path}`);
        const works = await testImage(path);
        if (works) {
          console.log(`¡Ruta funcionando encontrada!: ${path}`);
          setImageSrc(path);
          setImageLoaded(true);
          return;
        }
      }
      console.error("No se pudo cargar la imagen desde ninguna ruta");
    };
    
    findWorkingImage();
  }, []);

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

  // Si estamos en el navegador pero la imagen no se ha cargado, mostrar un placeholder
  if (!imageLoaded) {
    return (
      <div className={`relative ${className} bg-gray-800 animate-pulse rounded-full`}>
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          Cargando molécula...
        </div>
      </div>
    );
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
        <img
          src={imageSrc}
          alt="Testosterone Molecule"
          className="w-full h-auto"
          onError={(e) => {
            console.error("Error cargando imagen de molécula:", e);
            // Si hay error, intentamos mostrar un placeholder
            setImageLoaded(false);
          }}
          onLoad={() => {
            console.log("Imagen de molécula cargada correctamente desde:", imageSrc);
            setImageLoaded(true);
          }}
        />
      </motion.div>
    </div>
  )
}