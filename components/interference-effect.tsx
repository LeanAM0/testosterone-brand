"use client"

import { useEffect, useState } from "react"

interface InterferenceEffectProps {
  className?: string
}

export default function InterferenceEffect({ className = "" }: InterferenceEffectProps) {
  const [pixels, setPixels] = useState<
    Array<{ id: number; x: number; y: number; size: number; opacity: number; duration: number }>
  >([])

  useEffect(() => {
    // Create initial pixels
    generatePixels()

    // Set interval to regenerate pixels
    const intervalId = setInterval(() => {
      generatePixels()
    }, 2000)

    return () => clearInterval(intervalId)
  }, [])

  const generatePixels = () => {
    const newPixels = []
    const pixelCount = Math.floor(Math.random() * 15) + 10 // 10-25 pixels

    for (let i = 0; i < pixelCount; i++) {
      newPixels.push({
        id: Math.random(),
        x: Math.random() * 100, // percentage across screen width
        y: Math.random() * 100, // percentage across screen height
        size: Math.random() * 4 + 1, // 1-5px
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
        duration: Math.random() * 1 + 0.5, // 0.5-1.5s duration
      })
    }

    setPixels(newPixels)
  }

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute bg-white rounded-sm animate-pulse"
          style={{
            left: `${pixel.x}%`,
            top: `${pixel.y}%`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            opacity: pixel.opacity,
            animation: `pulse ${pixel.duration}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}