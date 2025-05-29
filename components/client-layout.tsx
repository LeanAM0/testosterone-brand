"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true)

  // Solo mostrar el loader en la carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showLoader && <Loader fullScreen size="large" />}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}

// Importar el Loader directamente aquí para evitar problemas de importación circular
import { motion } from "framer-motion"

interface LoaderProps {
  size?: "small" | "medium" | "large"
  fullScreen?: boolean
}

function Loader({ size = "medium", fullScreen = false }: LoaderProps) {
  const sizeMap = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  }

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
    : "flex items-center justify-center"

  return (
    <div className={containerClasses}>
      <div className="relative">
        <div className={`${sizeMap[size]} relative`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <motion.path
              d="M50 10 L70 20 L70 40 L50 50 L30 40 L30 20 Z"
              stroke="#800020"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
            />
            <motion.path
              d="M50 50 L50 80"
              stroke="#800020"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5, delay: 0.5 }}
            />
            <motion.circle
              cx="50"
              cy="85"
              r="5"
              fill="#800020"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5, delay: 1 }}
            />
            <motion.circle
              cx="30"
              cy="30"
              r="3"
              fill="#800020"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5, delay: 0.2 }}
            />
            <motion.circle
              cx="70"
              cy="30"
              r="3"
              fill="#800020"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1.5, delay: 0.7 }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}