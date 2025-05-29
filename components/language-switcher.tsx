"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { useTranslation } from "@/context/language-context"

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useTranslation()

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (langCode: "en" | "es") => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white hover:text-garnet transition-colors"
        aria-label={t("language.change")}
      >
        <Globe size={20} />
        <span className="text-sm uppercase">{language === "en" ? "EN" : "ES"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-dark-gray border border-gray-800 shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code as "en" | "es")}
              className={`block w-full text-left px-4 py-2 text-sm ${
                language === lang.code ? "bg-garnet text-white" : "text-white hover:bg-light-gray"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}