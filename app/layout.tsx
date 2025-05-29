import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/context/language-context"
import ClientLayout from "@/components/client-layout"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "700", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Testosterone | Discipline is Power",
  description: "High-quality, performance-based apparel for fitness enthusiasts and bodybuilders.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${inter.variable} bg-black text-white min-h-screen flex flex-col`}>
        <LanguageProvider>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}