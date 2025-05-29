"use client"

import WhatsAppButton from "@/components/whatsapp-button"
import { useTranslation } from "@/context/language-context"

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center">{t("contact.title")}</h1>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-300 mb-6 sm:mb-8">{t("contact.text1")}</p>

          <p className="text-gray-300 mb-8 sm:mb-12">{t("contact.text2")}</p>

          <div className="mb-8 sm:mb-12">
            <WhatsAppButton isContact={true} />
          </div>

          <div className="border-t border-gray-800 pt-8 sm:pt-12 mt-8 sm:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t("contact.follow")}</h2>
            <p className="text-gray-300 mb-6 sm:mb-8">{t("contact.social")}</p>

            <div className="flex justify-center space-x-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-garnet transition-colors text-base sm:text-lg"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-garnet transition-colors text-base sm:text-lg"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}