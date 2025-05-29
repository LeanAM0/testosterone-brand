"use client"

import { useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface BackgroundEffectProps {
  className?: string
}

export default function BackgroundEffect({ className = "" }: BackgroundEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      // Scale context to match device pixel ratio
      ctx.scale(dpr, dpr)

      // Set canvas size back to CSS size
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: Particle[] = []
    const particleCount = isMobile ? 25 : 50

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        // Distribute particles evenly across the entire canvas
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = window.innerWidth
        if (this.x > window.innerWidth) this.x = 0
        if (this.y < 0) this.y = window.innerHeight
        if (this.y > window.innerHeight) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    // Initialize particles - ensure they're distributed across the entire screen
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connect particles with lines if they're close enough
    function connectParticles() {
      if (!ctx) return

      // Adjust max distance based on screen size for better distribution
      const maxDistance = isMobile ? 100 : Math.min(150, window.innerWidth * 0.15)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 0.2 * (1 - distance / maxDistance)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop with throttling for better performance
    let animationFrameId: number
    let lastTime = 0
    const fps = isMobile ? 30 : 60 // Lower FPS on mobile for better performance
    const fpsInterval = 1000 / fps

    function animate(currentTime = 0) {
      animationFrameId = requestAnimationFrame(animate)

      // Throttle based on FPS
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return

      lastTime = currentTime - (elapsed % fpsInterval)

      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      connectParticles()
    }

    animate()

    // Clean up function
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isMobile])

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />
}