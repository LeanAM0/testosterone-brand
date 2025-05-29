"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useTranslation } from "@/context/language-context"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-wider">
          TESTOSTERONE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover-garnet uppercase text-sm tracking-wider">
            {t("nav.home")}
          </Link>
          <Link href="/shop" className="text-white hover-garnet uppercase text-sm tracking-wider">
            {t("nav.shop")}
          </Link>
          <Link href="/about" className="text-white hover-garnet uppercase text-sm tracking-wider">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="text-white hover-garnet uppercase text-sm tracking-wider">
            {t("nav.contact")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher />
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-gray border-t border-gray-800 absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover-garnet uppercase text-sm tracking-wider py-2"
              onClick={toggleMenu}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/shop"
              className="text-white hover-garnet uppercase text-sm tracking-wider py-2"
              onClick={toggleMenu}
            >
              {t("nav.shop")}
            </Link>
            <Link
              href="/about"
              className="text-white hover-garnet uppercase text-sm tracking-wider py-2"
              onClick={toggleMenu}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/contact"
              className="text-white hover-garnet uppercase text-sm tracking-wider py-2"
              onClick={toggleMenu}
            >
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar