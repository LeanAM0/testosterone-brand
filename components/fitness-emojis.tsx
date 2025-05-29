"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FitnessEmoji {
  id: number
  emoji: string
  x: number
  y: number
  rotation: number
  size: number
  opacity: number
}

export default function FitnessEmojis() {
  const [emojis, setEmojis] = useState<FitnessEmoji[]>([])

  // Emoji collection: dumbbells, weights, and syringes
  const emojiCollection = ["🏋️", "💪", "🔬", "⚗️", "💉", "🏆", "🥇", "⚖️"]

  useEffect(() => {
    // Initial emojis
    generateEmojis()

    // Set interval to regenerate emojis
    const intervalId = setInterval(() => {
      generateEmojis()
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  const generateEmojis = () => {
    const newEmojis: FitnessEmoji[] = []
    const emojiCount = Math.floor(Math.random() * 3) + 2 // 2-4 emojis at a time

    for (let i = 0; i < emojiCount; i++) {
      newEmojis.push({
        id: Math.random(),
        emoji: emojiCollection[Math.floor(Math.random() * emojiCollection.length)],
        x: Math.random() * 90 + 5, // 5-95% across screen width
        y: Math.random() * 90 + 5, // 5-95% across screen height
        rotation: Math.random() * 360, // 0-360 degrees rotation
        size: Math.random() * 24 + 16, // 16-40px size
        opacity: Math.random() * 0.2 + 0.1, // 0.1-0.3 opacity
      })
    }

    setEmojis(newEmojis)
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: emoji.opacity, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            fontSize: `${emoji.size}px`,
            transform: `rotate(${emoji.rotation}deg)`,
            filter: "grayscale(100%) brightness(200%) contrast(1000%)", // Make emojis black and white
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}
    </div>
  )
}