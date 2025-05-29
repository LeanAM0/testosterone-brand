"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Loader from "./loader"

export default function NavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Cuando cambia la ruta o los parámetros, mostrar el loader
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      // Pequeño retraso para asegurar que la página se haya renderizado
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    // Simular eventos de navegación con cambios en pathname y searchParams
    handleStart()
    const timer = setTimeout(handleComplete, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname, searchParams])

  if (!isLoading) return null

  return <Loader fullScreen size="large" />
}