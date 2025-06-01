# Documentación de Componentes

## Componentes Principales

### Componentes de Interfaz

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `Navbar` | `components/navbar.tsx` | Barra de navegación principal con enlaces, selector de idioma y tema |
| `Footer` | `components/footer.tsx` | Pie de página con enlaces, información de contacto y redes sociales |
| `Hero` | `components/hero.tsx` | Sección principal de la página de inicio con mensaje principal |
| `ProductCard` | `components/product-card.tsx` | Tarjeta para mostrar productos con imagen, nombre, precio y categoría |
| `LanguageSwitcher` | `components/language-switcher.tsx` | Selector de idioma para cambiar entre idiomas disponibles |
| `Loader` | `components/loader.tsx` | Componente de carga para transiciones de página |
| `NavigationLoader` | `components/navigation-loader.tsx` | Loader específico para navegación entre páginas |
| `WhatsAppButton` | `components/whatsapp-button.tsx` | Botón flotante para contacto vía WhatsApp |

### Componentes de Efectos Visuales

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `BackgroundEffect` | `components/background-effect.tsx` | Efecto de fondo con animación de partículas |
| `GlitchEffect` | `components/glitch-effect.tsx` | Efecto de glitch para textos |
| `InterferenceEffect` | `components/interference-effect.tsx` | Efecto de interferencia visual |
| `TestosteroneMolecule` | `components/testosterone-molecule.tsx` | Representación visual de la molécula de testosterona |
| `FitnessEmojis` | `components/fitness-emojis.tsx` | Animación de emojis relacionados con fitness |

### Componentes de Layout

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| `ThemeProvider` | `components/theme-provider.tsx` | Proveedor de tema para toda la aplicación |
| `ClientLayout` | `components/client-layout.tsx` | Layout específico para componentes del lado del cliente |

## Detalle de Componentes Clave

### BackgroundEffect
```typescript
interface BackgroundEffectProps {
  className?: string
}
```

El componente `BackgroundEffect` crea un canvas animado de fondo con partículas en movimiento. Utiliza el hook `useMediaQuery` para adaptarse a diferentes tamaños de pantalla y optimiza el rendimiento ajustando la densidad de partículas según el dispositivo.

**Propiedades**:
- `className`: Clase CSS opcional para personalizar el componente

**Características**:
- Adaptativo según el tamaño de pantalla
- Efecto de partículas fluido
- Optimizado para rendimiento

### ProductCard
```typescript
interface ProductCardProps {
  id: string
  name: string
  image: string
  price: number
  category: string
}
```

El componente `ProductCard` muestra la información de un producto con una imagen, nombre, categoría y precio. Es un componente fundamental para la visualización de productos en grids.

**Propiedades**:
- `id`: Identificador único del producto
- `name`: Nombre del producto
- `image`: URL de la imagen del producto
- `price`: Precio del producto
- `category`: Categoría del producto

**Características**:
- Diseño responsive
- Animaciones en hover
- Optimización de imágenes con Next.js Image

### Navbar
```typescript
interface NavbarProps {
  className?: string
}
```

El componente `Navbar` implementa la barra de navegación principal del sitio. Incluye el logo, enlaces de navegación, selector de idioma y un botón para cambiar entre tema claro y oscuro.

**Propiedades**:
- `className`: Clase CSS opcional para personalizar el componente

**Características**:
- Menú responsive para móvil
- Integración con el contexto de idioma
- Integración con el sistema de temas
- Animaciones fluidas

### Hero
```typescript
interface HeroProps {
  className?: string
}
```

El componente `Hero` es la sección principal de la página de inicio, con un mensaje llamativo, imagen de fondo y botón de llamada a la acción.

**Propiedades**:
- `className`: Clase CSS opcional para personalizar el componente

**Características**:
- Diseño responsive
- Efectos visuales
- Integración con el contexto de idioma

## Componentes UI de Radix

El proyecto utiliza múltiples componentes de Radix UI para interfaces accesibles y estandarizadas:

- `Accordion`: Para secciones colapsables
- `Alert`: Para mensajes importantes
- `Dialog`: Para ventanas modales
- `Dropdown`: Para menús desplegables
- `Tabs`: Para navegación por pestañas
- `Toast`: Para notificaciones
- Y muchos más

Estos componentes son extendidos y personalizados para mantener la estética del proyecto, ubicados en la carpeta `components/ui/`.