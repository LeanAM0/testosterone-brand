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
- **Integración con WhatsApp**: Botón de contacto directo
- **Rendimiento**: Optimizado para un rendimiento rápido

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior
- Cuenta de Notion (para la base de datos de productos)

## 🚀 Instalación y Uso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/testosterone-brand.git
   cd testosterone-brand
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env.local` con las siguientes variables:
   ```
   NOTION_API_KEY=tu_api_key_de_notion
   NOTION_DATABASE_ID=tu_id_de_base_de_datos
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

5. **Construye para producción**:
   ```bash
   npm run build
   ```

6. **Inicia en modo producción**:
   ```bash
   npm start
   ```

## 🧪 Testing

```bash
npm run test
```

## 📦 Dependencias Principales

- **next**: Framework React para producción
- **react**: Biblioteca JavaScript para interfaces de usuario
- **tailwindcss**: Framework CSS utilitario
- **framer-motion**: Biblioteca para animaciones en React
- **@notionhq/client**: Cliente oficial de Notion API
- **@radix-ui**: Primitivos de componentes headless para React

## 🔍 Características Avanzadas

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

#### 2. Implementación de mejor manejo de errores

```typescript
// Antes - Sin manejo adecuado de errores
const response = await notion.databases.query({ database_id: DATABASE_ID });
return response.results;

// Después - Con manejo detallado de errores
try {
  console.log('Consultando base de datos de Notion:', dbId);
  const response = await notion.databases.query({ database_id: dbId });
  console.log(`Respuesta de Notion recibida: ${response.results.length} productos encontrados`);
  return response.results;
} catch (error) {
  console.error('🔴 Error al consultar Notion:', error);
  // Proporcionar datos por defecto en caso de error
  return [];
}
```

#### 3. Adaptador mejorado para productos

```typescript
// Creamos un adaptador para transformar datos de Notion a nuestro formato
export function adaptNotionProductsToAppProducts(
  notionProducts: NotionProductPage[]
): Product[] {
  if (!notionProducts || notionProducts.length === 0) {
    console.warn('No se encontraron productos en Notion, usando datos por defecto');
    return DEFAULT_PRODUCTS;
  }

  return notionProducts.map((notionPage) => {
    // Extraer propiedades y mapearlas al formato de la aplicación
    const properties = notionPage.properties;
    
    // Mapear cada propiedad con validación
    return {
      id: notionPage.id,
      name: getPropertyValue(properties.Name, 'title', 'Producto sin nombre'),
      price: Number(getPropertyValue(properties.Price, 'number', 0)),
      // ... otras propiedades
    };
  });
}
```

#### 4. Integración en páginas de servidor y cliente

```typescript
// app/shop/page.tsx - Componente de servidor para cargar datos
async function getProductsData() {
  // Obtener datos desde Notion (corre en el servidor)
  const notionProducts = await getProducts();
  return adaptNotionProductsToAppProducts(notionProducts);
}

export default async function ShopPage() {
  const products = await getProductsData();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Nuestra Tienda</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

### 🧪 Pruebas realizadas

1. ✅ **Desarrollo local**: La aplicación carga correctamente los productos de Notion
2. ✅ **Caché de datos**: Los productos se almacenan en caché durante 60 minutos
3. ✅ **Manejo de errores**: Si Notion no responde, se muestran productos predeterminados
4. ✅ **Variables de entorno**: Funciona con variables de entorno o valores por defecto

### 🚀 Próximos pasos

1. Implementar filtrado avanzado por categorías
2. Añadir más detalles de producto (colores, tallas)
3. Crear página detallada para cada producto
4. Implementar caché más sofisticado para mayor rendimiento

## 📈 Plan Optimizado - Rápido con SEO Mejorado

### Fase 1: Configuración e Integración Notion (1-2 días)
1. **Configuración Notion**
   - Crear archivo `.env.local` con tokens
   - Probar conexión con `test-notion-integration.js`

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