"use client"

import { createContext, useContext, useState, type ReactNode, useCallback, useEffect } from "react"

type Language = "en" | "es"

interface Translations {
  [key: string]: {
    en: string
    es: string
  }
}

// Translations
const translations: Translations = {
  // Navigation
  "nav.home": {
    en: "Home",
    es: "Inicio",
  },
  "nav.shop": {
    en: "Shop",
    es: "Tienda",
  },
  "nav.about": {
    en: "About",
    es: "Nosotros",
  },
  "nav.contact": {
    en: "Contact",
    es: "Contacto",
  },

  // Hero section
  "hero.discipline": {
    en: "DISCIPLINE",
    es: "DISCIPLINA",
  },
  "hero.is": {
    en: "IS",
    es: "ES",
  },
  "hero.power": {
    en: "POWER",
    es: "PODER",
  },
  "hero.description": {
    en: "High-performance apparel designed for those who understand that greatness is forged through discipline.",
    es: "Ropa de alto rendimiento diseñada para quienes entienden que la grandeza se forja a través de la disciplina.",
  },
  "hero.shop_button": {
    en: "Shop Collection",
    es: "Ver Colección",
  },

  // Footer
  "footer.tagline": {
    en: "High-performance apparel for those who understand that discipline is the ultimate power.",
    es: "Ropa de alto rendimiento para quienes entienden que la disciplina es el poder supremo.",
  },
  "footer.navigation": {
    en: "Navigation",
    es: "Navegación",
  },
  "footer.connect": {
    en: "Connect",
    es: "Conectar",
  },
  "footer.rights": {
    en: "All rights reserved.",
    es: "Todos los derechos reservados.",
  },

  // Language
  "language.change": {
    en: "Change language",
    es: "Cambiar idioma",
  },

  // Featured Collection
  "featured.collection": {
    en: "FEATURED COLLECTION",
    es: "COLECCIÓN DESTACADA",
  },
  "view.all.products": {
    en: "View All Products",
    es: "Ver Todos los Productos",
  },

  // Vision Section
  "our.vision": {
    en: "OUR VISION",
    es: "NUESTRA VISIÓN",
  },
  "vision.paragraph1": {
    en: "At Testosterone, we believe that true strength comes from within. Our apparel is designed for those who understand that the body is a temple, and discipline is the key to unlocking your full potential.",
    es: "En Testosterone, creemos que la verdadera fuerza viene de adentro. Nuestra ropa está diseñada para quienes entienden que el cuerpo es un templo, y la disciplina es la clave para liberar todo tu potencial.",
  },
  "vision.paragraph2": {
    en: "Each piece is crafted with precision and purpose, using premium materials that enhance performance while maintaining an aesthetic that reflects the intensity of your training.",
    es: "Cada pieza está elaborada con precisión y propósito, utilizando materiales premium que mejoran el rendimiento mientras mantienen una estética que refleja la intensidad de tu entrenamiento.",
  },
  "learn.more": {
    en: "Learn More",
    es: "Saber Más",
  },

  // Shop Page
  "shop.title": {
    en: "SHOP",
    es: "TIENDA",
  },
  "shop.all": {
    en: "All",
    es: "Todo",
  },
  "shop.tanks": {
    en: "Tanks",
    es: "Camisetas",
  },
  "shop.hoodies": {
    en: "Hoodies",
    es: "Sudaderas",
  },
  "shop.compression": {
    en: "Compression",
    es: "Compresión",
  },
  "shop.shorts": {
    en: "Shorts",
    es: "Pantalones Cortos",
  },
  "shop.accessories": {
    en: "Accessories",
    es: "Accesorios",
  },

  // Product Page
  "product.description": {
    en: "Description",
    es: "Descripción",
  },
  "product.size": {
    en: "Size",
    es: "Talla",
  },
  "product.features": {
    en: "Features",
    es: "Características",
  },
  "product.buy": {
    en: "Buy via WhatsApp",
    es: "Comprar por WhatsApp",
  },

  // About Page
  "about.title": {
    en: "ABOUT US",
    es: "SOBRE NOSOTROS",
  },
  "about.values": {
    en: "OUR VALUES",
    es: "NUESTROS VALORES",
  },
  "about.values.text": {
    en: "Testosterone was born from a simple belief: that the discipline required in the gym extends to every aspect of life. Our brand stands for three core values that guide everything we do:",
    es: "Testosterone nació de una simple creencia: que la disciplina requerida en el gimnasio se extiende a todos los aspectos de la vida. Nuestra marca representa tres valores fundamentales que guían todo lo que hacemos:",
  },
  "about.discipline": {
    en: "Discipline",
    es: "Disciplina",
  },
  "about.discipline.text": {
    en: "We believe that true strength comes from consistency and dedication. Our apparel is designed for those who understand that greatness is achieved through daily commitment.",
    es: "Creemos que la verdadera fuerza proviene de la consistencia y la dedicación. Nuestra ropa está diseñada para aquellos que entienden que la grandeza se logra a través del compromiso diario.",
  },
  "about.aesthetics": {
    en: "Aesthetics",
    es: "Estética",
  },
  "about.aesthetics.text": {
    en: "The pursuit of physical perfection is an art form. Our designs reflect the beauty in the struggle, the elegance in power, and the pride in transformation.",
    es: "La búsqueda de la perfección física es una forma de arte. Nuestros diseños reflejan la belleza en la lucha, la elegancia en el poder y el orgullo en la transformación.",
  },
  "about.performance": {
    en: "Performance",
    es: "Rendimiento",
  },
  "about.performance.text": {
    en: "Every piece we create is engineered to enhance your training. From fabric selection to fit, we obsess over the details that make the difference when pushing your limits.",
    es: "Cada pieza que creamos está diseñada para mejorar tu entrenamiento. Desde la selección de telas hasta el ajuste, nos obsesionamos con los detalles que marcan la diferencia cuando superas tus límites.",
  },
  "about.story": {
    en: "OUR STORY",
    es: "NUESTRA HISTORIA",
  },
  "about.story.text1": {
    en: "Founded by a group of fitness enthusiasts who were dissatisfied with the quality and aesthetic of available gym apparel, Testosterone emerged as a response to a need for clothing that truly represents the intensity and dedication of serious training.",
    es: "Fundada por un grupo de entusiastas del fitness que estaban insatisfechos con la calidad y la estética de la ropa de gimnasio disponible, Testosterone surgió como respuesta a la necesidad de ropa que realmente represente la intensidad y dedicación del entrenamiento serio.",
  },
  "about.story.text2": {
    en: "We started in a small garage, designing pieces we wanted to wear ourselves. Each design was tested in the crucible of intense training sessions, refined based on performance, and styled to reflect the powerful mindset required to transform the body.",
    es: "Comenzamos en un pequeño garaje, diseñando piezas que queríamos usar nosotros mismos. Cada diseño fue probado en el crisol de intensas sesiones de entrenamiento, refinado en base al rendimiento y estilizado para reflejar la poderosa mentalidad requerida para transformar el cuerpo.",
  },
  "about.story.text3": {
    en: "Today, we continue to create apparel that serves as both functional equipment for your training and a statement of your commitment to the iron discipline that forges greatness.",
    es: "Hoy, continuamos creando ropa que sirve tanto como equipo funcional para tu entrenamiento como una declaración de tu compromiso con la disciplina de hierro que forja la grandeza.",
  },

  // Contact Page
  "contact.title": {
    en: "CONTACT US",
    es: "CONTÁCTANOS",
  },
  "contact.text1": {
    en: "At Testosterone, we believe in direct communication. All of our customer service and purchasing is handled through WhatsApp for a personalized experience.",
    es: "En Testosterone, creemos en la comunicación directa. Todo nuestro servicio al cliente y compras se manejan a través de WhatsApp para una experiencia personalizada.",
  },
  "contact.text2": {
    en: "Whether you have questions about our products, need sizing advice, or want to place an order, our team is ready to assist you.",
    es: "Ya sea que tengas preguntas sobre nuestros productos, necesites consejos sobre tallas o quieras hacer un pedido, nuestro equipo está listo para ayudarte.",
  },
  "contact.whatsapp": {
    en: "Contact on WhatsApp",
    es: "Contactar por WhatsApp",
  },
  "contact.follow": {
    en: "FOLLOW US",
    es: "SÍGUENOS",
  },
  "contact.social": {
    en: "Stay updated with our latest collections, fitness inspiration, and community stories by following us on social media.",
    es: "Mantente actualizado con nuestras últimas colecciones, inspiración fitness e historias de la comunidad siguiéndonos en redes sociales.",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  const t = useCallback(
    (key: string): string => {
      if (translations[key]) {
        return translations[key][language]
      }
      // Return the key if translation not found
      console.warn(`Translation missing for key: ${key}`)
      return key
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}