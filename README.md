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
