# Testosterone Brand Website

Este es un sitio web moderno para una marca de productos relacionados con la testosterona, desarrollado con Next.js y TypeScript.

## 🚀 Tecnologías Principales

- **Framework**: Next.js 15.2.4
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: Radix UI
- **Animaciones**: Framer Motion
- **Gestión de Estado**: Context API
- **Internacionalización**: Sistema de traducción propio
- **Tema**: Soporte para temas claro/oscuro

## 📁 Estructura del Proyecto

```
testosterone-brand/
├── app/              # Páginas de la aplicación
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes UI de Radix
│   └── ...          # Componentes personalizados
├── context/         # Contextos de React
├── hooks/           # Hooks personalizados
├── lib/             # Funciones utilitarias y datos
├── public/          # Assets estáticos
└── styles/          # Estilos globales
```

## 🛠️ Características Principales

- **Multi-idioma**: Soporte para múltiples idiomas
- **Tema adaptable**: Soporte para temas claro/oscuro
- **Optimización**: Carga perezosa y optimización de imágenes
- **Componentes reutilizables**: Sistema robusto de componentes
- **Efectos visuales**: Animaciones y efectos especiales
- **SEO**: Optimizado para motores de búsqueda
- **Responsive**: Diseño adaptable para todos los dispositivos

## 📦 Dependencias Principales

- `@radix-ui/react-*`: Componentes UI accesibles
- `framer-motion`: Animaciones
- `next-themes`: Gestión de temas
- `lucide-react`: Iconos
- `tailwindcss`: Sistema de estilos
- `date-fns`: Manejo de fechas

## 🚀 Instalación y Desarrollo

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   pnpm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

## 📝 Convenciones del Proyecto

- **Archivos de componentes**: `.tsx`
- **Archivos de estilos**: Tailwind CSS
- **Manejo de estado**: Context API
- **Rutas**: Sistema de archivos de Next.js
- **Componentes UI**: Radix UI

## 📱 Componentes Principales

- `Hero`: Sección principal del sitio
- `ProductCard`: Tarjetas de productos
- `Navbar`: Barra de navegación
- `Footer`: Pie de página
- `LanguageSwitcher`: Selector de idiomas
- `ThemeProvider`: Gestión de temas
- `TestosteroneMolecule`: Componente especializado

## 📚 Contextos Disponibles

- `LanguageContext`: Manejo de idiomas
- `ThemeContext`: Gestión de temas

## 🎨 Estilos y Animaciones

- Sistema de estilos basado en Tailwind CSS
- Animaciones con Framer Motion
- Efectos visuales personalizados
- Temas claro/oscuro

## 📱 Responsive Design

El sitio está completamente optimizado para:
- Desktop
- Tablet
- Móvil

## 📝 Notas Importantes

- El proyecto utiliza TypeScript para tipado estático
- Se incluye soporte para WhatsApp
- Se implementan efectos visuales personalizados
- El sitio está optimizado para SEO

## 🔑 Credenciales de Notion

> ⚠️ **IMPORTANTE**: Estas credenciales son solo para desarrollo. En producción, utiliza variables de entorno seguras.

- **Notion API Key**: `ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0`
- **Notion Database ID**: `1f625056207c80c6bd27000c8c49292b`

### Configuración de Notion para Producción

Para el despliegue en producción, configura estas variables de entorno en tu plataforma de hosting:

```env
NOTION_API_KEY=ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0
NOTION_DATABASE_ID=1f625056207c80c6bd27000c8c49292b
```

Nunca expongas estas credenciales directamente en el código fuente en un repositorio público.

## 📝 Contribución

1. Clona el repositorio
2. Crea una rama para tu funcionalidad
3. Realiza los cambios necesarios
4. Envía un Pull Request

## 📝 Licencia

Este proyecto está bajo licencia MIT.

## 📋 Plan de Implementación Simplificado

### Fase 1: Configuración Básica (1-2 días)
- Estructura básica Next.js + TypeScript
- Configuración de variables de entorno para Notion
- Componentes esenciales: ProductCard, Navbar y Footer

### Fase 2: Integración Notion (1 día)
- Conexión básica con Notion API
- Funciones mínimas para obtener productos
- Página principal con grid de productos

### Fase 3: Despliegue (1 día)
- Inicialización de repositorio GitHub
- Configuración de Git
- Conexión con Vercel
- Despliegue inicial

### Fase 4: Optimizaciones (1 día)
- Implementación de caché básico
- Optimización de imágenes
- Configuración básica de SEO

### Características Mínimas
- Grid de productos
- Navegación básica
- Carga de datos desde Notion
- Despliegue en Vercel

### Herramientas Necesarias
- Vercel CLI
- GitHub
- Notion API Token
- Git

Este plan permite tener una versión funcional en 4-5 días, manteniendo el código limpio y facilitando futuras mejoras.

## 📈 Plan Optimizado - Rápido con SEO Mejorado

### Fase 1: Configuración e Integración Notion (1-2 días)
1. **Configuración Notion**
   - Crear archivo `.env.local` con tokens
   - Instalar dependencia: `@notionhq/client`

2. **API Básica Notion**
   - Implementar `getProducts()` y `getProductsByCategory()`
   - Mapear datos de Notion a estructura útil para la aplicación

### Fase 2: Página Principal con SEO (1 día)
1. **Página Principal con SEO**
   - Implementar metadata para SEO
   - Mostrar productos desde Notion
   - Optimizar OpenGraph tags

2. **Actualizar ProductCard**
   - Adaptarlo para usar datos de Notion
   - Mostrar imágenes, categorías y colores disponibles

### Fase 3: Páginas de Categoría con SEO (1 día)
1. **Páginas de Categoría**
   - Crear rutas dinámicas por categoría
   - Implementar SEO específico por categoría
   - Generar parámetros estáticos para mejor rendimiento

### Fase 4: Despliegue y GitHub (1 día)
1. **GitHub**
   - Configuración de repositorio y .gitignore

2. **Vercel**
   - Conexión con GitHub
   - Configuración de variables de entorno

### Fase 5: Optimizaciones Importantes (1 día, opcional)
1. **Caché Básico**
   - Revalidación cada 60 minutos
   - Configuración de dominios de imágenes

2. **SEO Adicional**
   - Sitemap dinámico
   - Robots.txt
   - OpenGraph mejorado

### Características Priorizadas
- ✅ Integración rápida con Notion
- ✅ SEO mejorado en todas las páginas
- ✅ Páginas de categoría dinámicas
- ✅ Metadata dinámica
- ✅ Sitemap para indexación

### Para implementaciones futuras (menos prioritarias)
- ⏳ Lazy loading de imágenes
- ⏳ Skeleton loading
- ⏳ Filtros avanzados
- ⏳ Paginación

Este plan permite tener un sitio funcional en 3-4 días con buen SEO, manteniendo la simplicidad y estableciendo una base sólida para mejoras futuras.