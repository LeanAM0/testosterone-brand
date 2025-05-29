"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/context/language-context"

interface WhatsAppButtonProps {
  productName?: string
  selectedSize?: string
  isContact?: boolean
}

const WhatsAppButton = ({ productName, selectedSize, isContact = false }: WhatsAppButtonProps) => {
  const [message, setMessage] = useState("")
  const { t, language } = useTranslation()

  useEffect(() => {
    if (isContact) {
      setMessage(
        language === "en"
          ? "Hi, I'd like to ask about your products."
          : "Hola, me gustaría preguntar sobre sus productos.",
      )
    } else if (productName && selectedSize) {
      setMessage(
        language === "en"
          ? `Hi, I'd like to order the *${productName}* in size *${selectedSize}*.`
          : `Hola, me gustaría ordenar el *${productName}* en talla *${selectedSize}*.`,
      )
    } else if (productName) {
      setMessage(
        language === "en"
          ? `Hi, I'd like to know more about the *${productName}*.`
          : `Hola, me gustaría saber más sobre el *${productName}*.`,
      )
    }
  }, [productName, selectedSize, isContact, language])

  const encodedMessage = encodeURIComponent(message)
  const whatsappLink = `https://wa.me/?text=${encodedMessage}`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center 
        px-4 sm:px-6 py-2 sm:py-3 
        bg-garnet hover:bg-opacity-90 
        text-white font-medium 
        transition-colors duration-200 
        uppercase tracking-wider text-sm sm:text-base
        ${isContact ? "w-full md:w-auto" : ""}
      `}
    >
      {isContact ? t("contact.whatsapp") : t("product.buy")}
    </a>
  )
}

export default WhatsAppButton