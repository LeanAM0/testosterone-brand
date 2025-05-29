"use client"

import { useEffect } from "react"
import { useMotionValue, useSpring, motion } from "framer-motion"
import Image from "next/image"
import { useMediaQuery } from "@/hooks/use-media-query"

interface TestosteroneMoleculeProps {
  className?: string
}

export default function TestosteroneMolecule({ className = "" }: TestosteroneMoleculeProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const springConfig = { damping: 25, stiffness: 100 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    if (isMobile) return // Disable mouse movement on mobile

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the window
      mouseX.set((e.clientX - window.innerWidth / 2) / 20)
      mouseY.set((e.clientY - window.innerHeight / 2) / 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY, isMobile])

  // Handle device orientation for mobile
  useEffect(() => {
    if (!isMobile) return

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta && e.gamma) {
        mouseX.set(e.gamma / 2) // Left/right tilt
        mouseY.set(e.beta / 2) // Front/back tilt
      }
    }

    window.addEventListener("deviceorientation", handleOrientation)
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [mouseX, mouseY, isMobile])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
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
    </div>
  )
}