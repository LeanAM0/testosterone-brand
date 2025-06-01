# Documentación del Proyecto Testosterone Brand

## Visión General

Testosterone Brand es un sitio web moderno para una tienda de ropa de gimnasio, desarrollado con Next.js y TypeScript. El proyecto implementa una arquitectura basada en componentes reutilizables y utiliza Notion como base de datos a través de su API.

## Tecnologías Principales

| Tecnología      | Versión   | Propósito                            |
|-----------------|-----------|--------------------------------------|
| Next.js         | 15.2.4    | Framework de React                   |
| TypeScript      | ^5.0.0    | Tipado estático                      |
| Tailwind CSS    | ^10.4.20  | Estilos                              |
| Radix UI        | Varios    | Componentes UI accesibles            |
| Framer Motion   | Latest    | Animaciones                          |
| Notion API      | -         | Base de datos                        |
| next-themes     | ^0.4.4    | Gestión de temas claro/oscuro        |

## Estructura del Proyecto

```
testosterone-brand/
├── app/                # Páginas y rutas de la aplicación
│   ├── page.tsx        # Página principal
│   ├── layout.tsx      # Layout principal
│   └── [...]/          # Otras rutas
├── components/         # Componentes reutilizables
│   ├── ui/             # Componentes UI básicos
│   └── [...].tsx       # Componentes específicos
├── context/            # Contextos de React
├── docs/               # Documentación detallada
├── hooks/              # Hooks personalizados
├── lib/                # Funciones utilitarias y datos
│   └── notion.ts       # Integración con Notion
├── public/             # Assets estáticos
└── styles/             # Configuración de estilos
```

## Flujo de Datos

1. Los datos de productos se almacenan en Notion
2. La API de Notion se consulta a través de `lib/notion.ts`
3. Los datos se transforman y se pasan a los componentes
4. Los componentes renderizan la UI basada en estos datos

## Caracteristicas Principales

- **Multilingüe**: Soporte para múltiples idiomas mediante contexto personalizado
- **Tema**: Soporte para tema claro/oscuro con next-themes
- **Responsive**: Diseño adaptativo para todas las pantallas
- **SEO**: Optimizado para motores de búsqueda
- **Efectos Visuales**: Animaciones y efectos especiales

## Integración Notion

La base de datos de Notion contiene información sobre los productos, incluyendo:
- Nombre
- Categoría
- Descripción
- Precio
- Características
- Color
- Imágenes
- Disponibilidad
- Slug

## Despliegue

El proyecto está configurado para desplegarse en Vercel, conectado a un repositorio GitHub para CI/CD automático.