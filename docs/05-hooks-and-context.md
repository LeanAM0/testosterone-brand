# Documentación de Hooks y Contextos

## Hooks Personalizados

El proyecto utiliza varios hooks personalizados para abstraer funcionalidades comunes y mejorar la reutilización de código.

### useMediaQuery

**Ubicación**: `hooks/use-media-query.ts`

Este hook permite realizar consultas de media queries en componentes React, facilitando el diseño responsive:

```typescript
import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Establecer el valor inicial
    setMatches(media.matches)
    
    // Definir callback para actualizar el estado
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    // Añadir el event listener
    media.addEventListener("change", listener)
    
    // Cleanup
    return () => {
      media.removeEventListener("change", listener)
    }
  }, [query])
  
  return matches
}
```

**Ejemplo de uso**:
```tsx
const isMobile = useMediaQuery("(max-width: 768px)")

return (
  <div className={isMobile ? "mobile-layout" : "desktop-layout"}>
    {/* Contenido adaptativo */}
  </div>
)
```

### useScrollPosition

**Ubicación**: `hooks/use-scroll-position.ts`

Este hook permite rastrear la posición de scroll para efectos visuales o comportamientos basados en el scroll:

```typescript
import { useState, useEffect } from "react"

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY)
    }
    
    window.addEventListener("scroll", updatePosition)
    
    // Actualizar posición inicial
    updatePosition()
    
    return () => window.removeEventListener("scroll", updatePosition)
  }, [])
  
  return scrollPosition
}
```

**Ejemplo de uso**:
```tsx
const scrollPosition = useScrollPosition()

// Navbar que cambia al hacer scroll
return (
  <nav className={scrollPosition > 100 ? "navbar-scrolled" : "navbar"}>
    {/* Contenido de navbar */}
  </nav>
)
```

### useLocalStorage

**Ubicación**: `hooks/use-local-storage.ts`

Este hook facilita el almacenamiento y recuperación de datos en localStorage:

```typescript
import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para almacenar nuestro valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })
  
  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue] as const
}
```

**Ejemplo de uso**:
```tsx
const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", [])

// Añadir producto a favoritos
const addToFavorites = (productId: string) => {
  setFavorites(prev => [...prev, productId])
}
```

## Contextos

Los contextos permiten compartir estado entre componentes sin pasar props manualmente a través del árbol de componentes.

### LanguageContext

**Ubicación**: `context/language-context.tsx`

Este contexto gestiona la traducción y el cambio de idioma en toda la aplicación:

```typescript
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Diccionario de traducciones
const translations = {
  es: {
    "featured.collection": "Colección Destacada",
    "shop.now": "Comprar Ahora",
    "contact.us": "Contáctanos",
    // ... más traducciones
  },
  en: {
    "featured.collection": "Featured Collection",
    "shop.now": "Shop Now",
    "contact.us": "Contact Us",
    // ... más traducciones
  }
}

type Language = "es" | "en"
type TranslationKey = keyof typeof translations.es

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>("language", "es")
  
  const t = (key: TranslationKey) => {
    return translations[language][key] || key
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
```

**Hook para acceder al contexto**:
```typescript
export function useLanguage() {
  const context = useContext(LanguageContext)
  
  if (context === undefined) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider")
  }
  
  return context
}
```

**Ejemplo de uso**:
```tsx
import { useLanguage } from "@/context/language-context"

function ProductTitle({ title }: { title: string }) {
  const { t } = useLanguage()
  
  return (
    <h2>{title} - {t("shop.now")}</h2>
  )
}
```

### ThemeContext

**Ubicación**: `context/theme-context.tsx`

Este contexto maneja el cambio entre tema claro y oscuro:

```typescript
import { createContext, useContext, useEffect } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system")
  
  useEffect(() => {
    const root = window.document.documentElement
    
    root.classList.remove("light", "dark")
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

**Hook para acceder al contexto**:
```typescript
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider")
  }
  
  return context
}
```

**Ejemplo de uso**:
```tsx
import { useTheme } from "@/context/theme-context"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}
```

## Combinación de Hooks y Contextos

El proyecto utiliza composición de hooks y contextos para características más complejas:

```typescript
// Ejemplo: Hook que combina useMediaQuery y ThemeContext
export function useResponsiveTheme() {
  const { theme, setTheme } = useTheme()
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  
  const actualTheme = theme === "system" 
    ? prefersDark ? "dark" : "light" 
    : theme
  
  return { theme: actualTheme, setTheme }
}
```

Este enfoque modular y basado en hooks facilita:

1. **Reutilización**: Los hooks encapsulan lógica que puede reutilizarse en cualquier componente
2. **Separación de preocupaciones**: Cada hook y contexto tiene una responsabilidad única
3. **Testabilidad**: Es más fácil probar funciones pequeñas y aisladas
4. **Mantenibilidad**: El código está organizado de manera lógica y predecible