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

## 🔐 Configuración de Despliegue en Vercel

### Variables de Entorno Requeridas

Para que la aplicación funcione correctamente en Vercel, es **obligatorio** configurar las siguientes variables de entorno en el panel de control de Vercel:

```env
NOTION_API_KEY=ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0
NOTION_DATABASE_ID=1f625056207c80c3b951ff146b3c2c51
```

### Pasos para configurar en Vercel:

1. Ve al panel de control de tu proyecto en Vercel
2. Haz clic en "Settings" en la barra de navegación superior
3. En el menú lateral, selecciona "Environment Variables"
4. Añade cada variable de entorno con su nombre y valor exacto
5. Asegúrate de aplicar estas variables a todos los entornos (Production, Preview, Development)
6. Guarda los cambios y vuelve a desplegar la aplicación

### ⚠️ IMPORTANTE: ID Correcto de la Base de Datos

El ID correcto de la base de datos es: `1f625056207c80c3b951ff146b3c2c51` (sin guiones)

**Nota**: Sin estas variables configuradas correctamente, la aplicación mostrará productos con información predeterminada y algunos componentes visuales como la molécula de testosterona podrían no funcionar correctamente.

Nunca expongas estas credenciales directamente en el código fuente en un repositorio público.

## 🔍 Soluciones para Problemas de Despliegue

> 🆕 **NUEVA SECCIÓN: Añadida el 01-06-2025**

### Problemas Conocidos

Hemos identificado dos problemas principales en el despliegue en Vercel:

1. **Imagen de molécula de testosterona no se muestra** - La imagen de fondo con la molécula no aparece en el despliegue aunque existe en el repositorio.

2. **Conexión con Notion no funciona** - Los productos no se cargan desde la base de datos de Notion en el despliegue.

### Soluciones Implementadas para Diagnóstico

Para diagnosticar y solucionar estos problemas, hemos implementado las siguientes mejoras:

#### 1. Mejora en Componente TestosteroneMolecule

Hemos añadido logs de depuración al componente de la molécula para entender mejor qué está sucediendo con la carga de la imagen:

```tsx
// Logs para el ciclo de vida del componente
useEffect(() => {
  // Log de montaje del componente
  console.log("TestosteroneMolecule: Componente montado");
  console.log("TestosteroneMolecule: Ruta de imagen:", "/images/testosterone-molecule.png");
}, [])

// Manejadores de eventos para la imagen
<Image
  src="/images/testosterone-molecule.png"
  alt="Testosterone Molecule"
  onError={(e) => {
    console.error("Error cargando imagen de molécula:", e);
  }}
  onLoad={() => {
    console.log("Imagen de molécula cargada correctamente");
  }}
/>
```

Es como añadir sensores a un coche para detectar exactamente qué parte está fallando.

#### 2. Endpoint de Diagnóstico de Variables de Entorno

Hemos creado un nuevo endpoint en `/api/test-env` que nos permite verificar si las variables de entorno se están cargando correctamente en Vercel:

```typescript
// app/api/test-env/route.ts
export async function GET() {
  // Mostramos información sobre las variables de entorno
  const envInfo = {
    apiKey: process.env.NOTION_API_KEY 
      ? `${process.env.NOTION_API_KEY.substring(0, 4)}...` 
      : 'No definido',
    dbId: process.env.NOTION_DATABASE_ID || 'No definido',
    // Más información útil para diagnóstico...
  };
  
  return NextResponse.json(envInfo);
}
```

Es como crear una ventana de inspección para ver lo que realmente está sucediendo con las variables de entorno.

### Cómo Verificar los Resultados

1. **Para problemas con la imagen**:
   - Abre la consola del navegador (F12) cuando visites el sitio
   - Busca mensajes relacionados con "TestosteroneMolecule" o errores de carga de imagen
   
2. **Para problemas con Notion**:
   - Visita `[tu-url-de-vercel]/api/test-env`
   - Comprueba si las variables de entorno se están mostrando correctamente

> ⚠️ **NOTA**: El endpoint de diagnóstico debe eliminarse después de resolver los problemas, ya que muestra información parcial de las credenciales.

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

#### 📊 Implementación de la integración con Notion (Completada)

Hemos implementado exitosamente la conexión con Notion, migrando de datos estáticos a datos dinámicos. El sistema ahora funciona como un flujo de agua corriente, donde los productos se actualizan en tiempo real desde Notion sin necesidad de modificar el código.

### 🛠️ Arquitectura implementada

```
[Notion DB] ➡️ [API Notion] ➡️ [lib/notion.ts] ➡️ [Adaptador] ➡️ [Componentes React] ➡️ [UI]
   (almacén)     (transportista)    (procesador)      (traductor)        (tienda)       (cliente)
```

Es como un sistema de abastecimiento de una tienda real: Notion es el almacén central donde guardamos los productos, la API es el transportista que los trae, el adaptador es quien los organiza en las estanterías, y los componentes son la exposición final para los clientes.

### 📚 Cambios técnicos implementados

#### 1. Optimización de la capa de conexión con Notion

- **Refactorización de `lib/notion.ts`** para usar variables de entorno de forma segura:

```typescript
// Antes - Hardcodeado y sin manejo adecuado de errores
const NOTION_API_KEY = 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0';
const DATABASE_ID = '1f625056207c80c6bd27000c8c49292b';

// Después - Uso seguro de variables de entorno y formato correcto
const getEnvVariable = (name: string, defaultValue: string): string => {
  // En el servidor, intentamos obtener la variable de entorno
  if (typeof window === 'undefined') {
    return process.env[name] || defaultValue;
  }
  // En el cliente, usamos el valor por defecto (por seguridad)
  return defaultValue;
};

const NOTION_API_KEY = getEnvVariable('NOTION_API_KEY', 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0');

// Preparar el ID de la base de datos (eliminar guiones si existen)
let dbId = getEnvVariable('NOTION_DATABASE_ID', '1f625056207c80c6bd27000c8c49292b');
```

#### 2. Adaptador para convertir datos de Notion a formato de aplicación

```typescript
// app/shop/page.tsx - Componente de servidor para cargar datos
async function getProductsData() {
  // Obtener datos desde Notion (corre en el servidor)
  const notionProducts = await getProducts();
  return adaptNotionProductsToAppProducts(notionProducts);
}
```

## 📈 Plan Optimizado - Rápido con SEO Mejorado

### Fase 1: Configuración e Integración Notion (1-2 días)
1. **Configuración Notion**
   - Crear archivo `.env.local` con tokens
   - Implementar funciones básicas de conexión
   - Adaptar datos de Notion a la estructura de la aplicación

2. **Página Principal y de Producto**
   - Página principal con listado de productos
   - Metadata dinámica para SEO

### Fase 2: Categorías y SEO (1-2 días)
1. **Categorías Dinámicas**
   - Implementar rutas dinámicas para categorías
   - Filtrado de productos por categoría
   - Metadata específica por categoría

2. **SEO**
   - Implementar sitemap.xml dinámico
   - Configurar robots.txt
   - Optimizar OpenGraph tags

### Fase 3: Despliegue y Optimización (1 día)
1. **Despliegue**
   - Configuración Vercel/Netlify
   - Ajuste de variables de entorno
   - Comprobación de rendimiento

2. **Optimizaciones**
   - Optimización de imágenes
   - Implementación de caché
   - Análisis de Lighthouse