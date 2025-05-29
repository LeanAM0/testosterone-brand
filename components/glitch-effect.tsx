"use client"

import { useEffect, useState } from "react"

interface GlitchEffectProps {
  className?: string
}

export default function GlitchEffect({ className = "" }: GlitchEffectProps) {
  const [glitches, setGlitches] = useState<
    Array<{ id: number; top: number; left: number; width: number; height: number }>
  >([])

  useEffect(() => {
    // Function to create random glitches
    const createGlitches = () => {
      // Only create glitches occasionally (20% chance)
      if (Math.random() > 0.2) return

      const newGlitches = []
      const glitchCount = Math.floor(Math.random() * 3) + 1 // 1-3 glitches at a time

      for (let i = 0; i < glitchCount; i++) {
        newGlitches.push({
          id: Math.random(),
          top: Math.random() * 100, // % position
          left: Math.random() * 100, // % position
          width: Math.random() * 10 + 5, // 5-15% width
          height: Math.random() * 0.5 + 0.2, // 0.2-0.7% height (thin lines)
        })
      }

      setGlitches(newGlitches)

      // Remove glitches after a short time
      setTimeout(
        () => {
          setGlitches([])
        },
        Math.random() * 200 + 50,
      ) // 50-250ms duration
    }

    // Set interval to randomly create glitches
    const intervalId = setInterval(createGlitches, 1000) // Check every second

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {glitches.map((glitch) => (
        <div
          key={glitch.id}
          className="absolute bg-white"
          style={{
            top: `${glitch.top}%`,
            left: `${glitch.left}%`,
            width: `${glitch.width}%`,
            height: `${glitch.height}%`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  )
}