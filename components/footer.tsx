import Link from "next/link"
import { Instagram } from "lucide-react"
import { useTranslation } from "@/context/language-context"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-wider">TESTOSTERONE</h3>
            <p className="text-gray-400 text-sm max-w-xs">{t("footer.tagline")}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">{t("footer.navigation")}</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-400 hover-garnet text-sm">
                {t("nav.home")}
              </Link>
              <Link href="/shop" className="text-gray-400 hover-garnet text-sm">
                {t("nav.shop")}
              </Link>
              <Link href="/about" className="text-gray-400 hover-garnet text-sm">
                {t("nav.about")}
              </Link>
              <Link href="/contact" className="text-gray-400 hover-garnet text-sm">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">{t("footer.connect")}</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-garnet transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-garnet transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Testosterone. {t("footer.rights")}
        </div>
      </div>
    </footer>
  )
}

// TikTok icon component
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.589 6.686C19.3001 6.56538 19.0294 6.39992 18.7891 6.19409C18.4312 5.90409 18.1286 5.55488 17.8997 5.16283C17.3371 4.31283 17.3031 3.35816 17.2961 2.80283H13.8091V15.5998C13.8091 15.9351 13.8091 16.2673 13.7731 16.5968C13.7691 16.6368 13.7651 16.6768 13.7601 16.7168C13.7601 16.7238 13.7601 16.7318 13.7571 16.7388C13.6521 17.4673 13.2361 18.1188 12.6181 18.5398C12.0001 18.9608 11.2321 19.1178 10.4961 18.9748C9.35913 18.7608 8.47913 17.7538 8.40713 16.5968C8.31713 15.2048 9.35913 13.9828 10.7511 13.8538C11.0071 13.8328 11.2631 13.8538 11.5101 13.9178V10.4128C11.2521 10.3778 10.9911 10.3598 10.7301 10.3598C9.24813 10.3708 7.81513 10.9598 6.70913 12.0198C5.60313 13.0798 4.95813 14.4878 4.88713 15.9698C4.79713 18.0748 5.77913 20.0568 7.52913 21.2788C7.75513 21.4368 7.99113 21.5798 8.23613 21.7078C9.76513 22.5168 11.5711 22.6858 13.2361 22.1698C14.9011 21.6538 16.2661 20.4918 17.0001 18.9608C17.4141 18.1038 17.6311 17.1628 17.6311 16.2108V9.66583C18.7441 10.4128 20.0151 10.8498 21.3581 10.9478C21.6141 10.9688 21.8671 10.9798 22.1201 10.9798V7.50883C21.3401 7.50883 20.5731 7.34883 19.8701 7.04283C19.7771 6.92683 19.6841 6.80183 19.5891 6.68583L19.589 6.686Z"
      fill="currentColor"
    />
  </svg>
)

export default Footer