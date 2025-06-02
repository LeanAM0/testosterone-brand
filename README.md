# 🏋️ Testosterone Brand

> Página web de marca de ropa de entrenamiento, construida con Next.js, TypeScript, Tailwind CSS, y alimentada por Notion como base de datos.

## 📋 Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Integración con Notion](#integración-con-notion)
- [Problemas conocidos de despliegue](#problemas-conocidos-de-despliegue)

## ✨ Características

- Diseño responsivo y moderno
- Catálogo de productos con filtros
- Detalles de producto
- Carrito de compras
- Animaciones suaves con Framer Motion
- Integración con Notion como headless CMS

## 🛠️ Tecnologías

- **Next.js 15.2.4** - Framework de React
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework CSS utilitario
- **Radix UI** - Componentes accesibles y sin estilo
- **Framer Motion** - Biblioteca de animaciones
- **Context API** - Gestión de estado global
- **Notion API** - Headless CMS para datos de productos

## 🚀 Instalación

1. **Clona el repositorio**

```bash
git clone https://github.com/tu-usuario/testosterone-brand.git
cd testosterone-brand
```

2. **Instala las dependencias**

```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:

```
NOTION_API_KEY=tu_api_key_de_notion
NOTION_DATABASE_ID=tu_database_id_de_notion
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
```

5. **Abre tu navegador**

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔑 Configuración de variables de entorno

### Variables locales

Para desarrollo local, crea un archivo `.env.local` con:

```
NOTION_API_KEY=tu_api_key_de_notion
NOTION_DATABASE_ID=tu_database_id_de_notion
```

### Variables en Vercel

Para despliegue en Vercel:

1. Ve a tu proyecto en el [Dashboard de Vercel](https://vercel.com/dashboard)
2. Navega a Settings > Environment Variables
3. Añade `NOTION_API_KEY` y `NOTION_DATABASE_ID` con sus respectivos valores
4. Redespliega el proyecto para que tome las nuevas variables

## 📁 Estructura del proyecto

```
testosterone-brand/
├── app/               # Rutas y páginas de Next.js
├── components/        # Componentes reutilizables
├── context/           # Contextos de React
├── hooks/             # Hooks personalizados
├── lib/               # Utilidades y funciones
├── public/            # Archivos estáticos
│   └── images/        # Imágenes
├── styles/            # Estilos globales
├── types/             # Definiciones de tipos TypeScript
├── .env.local         # Variables de entorno local (no en git)
├── next.config.js     # Configuración de Next.js
└── package.json       # Dependencias y scripts
```

## 🔄 Integración con Notion

### Configuración de la base de datos en Notion

1. Crea una base de datos en Notion con las siguientes propiedades:
   - `Name` (título)
   - `Description` (texto enriquecido)
   - `Price` (número)
   - `Category` (selección)
   - `Image` (URL o archivos)
   - `Stock` (número)
   - `Featured` (checkbox)

2. Crea una integración en [Notion Developers](https://www.notion.so/my-integrations)
   - Obtén tu `API Key`
   - Otorga acceso a tu integración a la base de datos

3. Obtén el ID de tu base de datos desde la URL:
   - `https://www.notion.so/workspace/ESTE-ES-TU-ID-DE-BASE-DE-DATOS?...`
   - Asegúrate de usar el ID sin guiones para las variables de entorno

### Uso en el código

El archivo `lib/notion.ts` contiene las funciones para interactuar con Notion:

```typescript
import { Client } from '@notionhq/client';

// Inicializa el cliente de Notion con la API Key
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Obtener todos los productos
export async function getProducts() {
  // Implementación...
}

// Obtener un producto por ID
export async function getProductById(id: string) {
  // Implementación...
}
```

## 🚧 Problemas conocidos de despliegue

Durante el despliegue a Vercel, hemos identificado dos problemas principales:

### 1️⃣ Problema con la carga de imágenes estáticas

**Síntomas:**
- Errores 404 al cargar imágenes
- Consola muestra errores como: `Failed to load resource: the server responded with a status of 404 ()`
- Afecta a imágenes como `testosterone-molecule.png`, `fitness-bg.jpg`, etc.

**Soluciones intentadas:**
1. **Corregir nombres de archivos en el código**:
   - Verificamos que los nombres en el código coincidieran con los archivos en `/public/images`
   - La imagen `testosterone-molecule.png` existe en el repositorio pero sigue sin cargarse

2. **Implementar un "detective de rutas"**:
   - Creamos un sistema que prueba múltiples rutas posibles para las imágenes
   - Intentamos con variaciones como `/images/...`, `public/images/...`, etc.

3. **Reemplazar imágenes con SVG**:
   - Implementamos una versión SVG de la molécula directamente en el código
   - Esto eliminaba la dependencia de archivos externos

4. **Simplificar completamente el componente**:
   - Creamos una versión simplificada usando solo HTML y CSS
   - Sin dependencias de imágenes o SVG complejos

**Posibles causas del problema:**
1. **Configuración incorrecta de Next.js**: El archivo `next.config.mjs` podría no estar configurado correctamente para manejar imágenes estáticas en Vercel.
2. **Caché de Vercel**: El sistema de caché podría estar sirviendo versiones antiguas de los archivos.
3. **Problemas de routing**: La estructura de carpetas en Vercel podría no coincidir con la local.
4. **Compilación incompleta**: El proceso de build podría no estar copiando correctamente los archivos estáticos.

### 2️⃣ Problemas con variables de entorno de Notion

**Síntomas:**
- La página de productos no carga datos
- No hay errores visibles relacionados con la API de Notion
- El endpoint de diagnóstico `/api/test-env` devuelve 404

**Soluciones implementadas:**
1. **Página de diagnóstico**: Se creó una página en `/diagnostico` para mostrar el estado del sistema
2. **API de prueba**: Se implementó un endpoint `/api/test-env` para verificar las variables de entorno

**Posibles causas:**
1. **Variables no configuradas**: Las variables `NOTION_API_KEY` y `NOTION_DATABASE_ID` podrían no estar configuradas correctamente en el panel de Vercel.
2. **Formato incorrecto**: El ID de la base de datos podría tener formato incorrecto (con o sin guiones).
3. **Problemas de permisos**: La integración de Notion podría no tener los permisos adecuados.
4. **Errores en la conexión**: Podría haber problemas en el código que maneja la conexión a Notion.

### 🔄 Próximos pasos recomendados

1. **Revisar logs de build**:
   - Examinar detalladamente los logs de construcción en Vercel
   - Buscar errores relacionados con la copia de archivos estáticos

2. **Verificar configuración de Next.js**:
   - Revisar `next.config.mjs` para asegurar que las imágenes estáticas se manejan correctamente
   - Considerar agregar configuración específica para Vercel

3. **Probar con CDN externo**:
   - Subir las imágenes a un servicio como Cloudinary
   - Actualizar el código para cargar imágenes desde URL externas

4. **Dominio personalizado**:
   - Configurar un dominio personalizado puede resolver problemas de caché
   - Permitiría un nuevo despliegue desde cero

5. **Revisar variables de entorno**:
   - Confirmar que las variables están correctamente configuradas en Vercel
   - Verificar que no hay espacios o caracteres inválidos

6. **Cambios en la estructura del proyecto**:
   - Considerar mover las imágenes a carpetas diferentes
   - Simplificar la estructura de rutas

Si los problemas persisten, podría ser necesario considerar una auditoría completa del proyecto o migrar a un proveedor de hosting diferente como Netlify, Railway o Firebase Hosting.