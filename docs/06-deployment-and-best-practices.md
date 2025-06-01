# Documentación de Despliegue y Mejores Prácticas

## Despliegue en Vercel

### Preparación

Antes de desplegar el proyecto en Vercel, debes asegurarte de:

1. **Tener un repositorio GitHub**:
   - Inicializa Git en el proyecto:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```
   - Crea un repositorio en GitHub
   - Conecta tu repositorio local con GitHub:
     ```bash
     git remote add origin https://github.com/username/testosterone-brand.git
     git push -u origin main
     ```

2. **Configurar Variables de Entorno**:
   - Crea un archivo `.env.local` para desarrollo local
   - Prepara las variables para producción:
     ```
     NOTION_TOKEN=tu_token_de_notion
     NOTION_DATABASE_ID=tu_id_de_base_de_datos
     ```

### Proceso de Despliegue

1. **Conectar Vercel con GitHub**:
   - Inicia sesión en [Vercel](https://vercel.com)
   - Selecciona "Import Project"
   - Elige tu repositorio de GitHub

2. **Configuración del Proyecto**:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: next build
   - Output Directory: .next
   - Install Command: npm install (o pnpm install)

3. **Variables de Entorno**:
   - Añade las mismas variables de `.env.local` en la configuración de Vercel

4. **Despliegue**:
   - Haz clic en "Deploy"
   - Vercel construirá y desplegará automáticamente tu proyecto

### Configuración Avanzada

1. **Dominio Personalizado**:
   - En Vercel Dashboard, ve a tu proyecto
   - Selecciona "Domains"
   - Añade tu dominio personalizado
   - Sigue las instrucciones para configurar los registros DNS

2. **Monitorización**:
   - Vercel proporciona análisis de rendimiento
   - Configura alertas para problemas de rendimiento

## GitHub CI/CD

Para automatizar el proceso de despliegue, puedes configurar GitHub Actions:

1. **Archivo de Configuración**:
   - Crea `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy to Vercel
     
     on:
       push:
         branches: [main]
     
     jobs:
       deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - uses: actions/setup-node@v2
             with:
               node-version: '18'
           - name: Install dependencies
             run: npm ci
           - name: Run tests
             run: npm test
           - name: Deploy to Vercel
             uses: amondnet/vercel-action@v20
             with:
               vercel-token: ${{ secrets.VERCEL_TOKEN }}
               vercel-org-id: ${{ secrets.ORG_ID }}
               vercel-project-id: ${{ secrets.PROJECT_ID }}
               working-directory: ./
     ```

2. **Configuración de Secretos**:
   - En GitHub, ve a Settings > Secrets
   - Añade los secretos necesarios para Vercel

## Mejores Prácticas

### Rendimiento

1. **Optimización de Imágenes**:
   - Usa siempre el componente `Image` de Next.js
   - Configura correctamente los tamaños
   - Usa formatos modernos (WebP)

2. **Lazy Loading**:
   - Implementa lazy loading para componentes grandes
   - Utiliza `dynamic` de Next.js:
     ```jsx
     import dynamic from 'next/dynamic'
     
     const DynamicComponent = dynamic(() => import('@/components/heavy-component'), {
       loading: () => <p>Loading...</p>,
     })
     ```

3. **Code Splitting**:
   - Next.js hace code splitting automáticamente
   - Divide componentes grandes en más pequeños

### SEO

1. **Metadatos**:
   - Usa el objeto `metadata` en cada página:
     ```jsx
     export const metadata = {
       title: 'Título de la página',
       description: 'Descripción de la página...',
     }
     ```

2. **Sitemap**:
   - Implementa generación dinámica de sitemap:
     ```jsx
     // app/sitemap.ts
     import { getProducts } from '@/lib/notion'
     
     export default async function sitemap() {
       const products = await getProducts()
       
       const productUrls = products.map(product => ({
         url: `https://yourdomain.com/productos/${product.slug}`,
         lastModified: new Date(),
       }))
       
       return [
         {
           url: 'https://yourdomain.com',
           lastModified: new Date(),
         },
         ...productUrls,
       ]
     }
     ```

3. **Robots.txt**:
   - Crea un archivo `app/robots.ts`:
     ```jsx
     export default function robots() {
       return {
         rules: {
           userAgent: '*',
           allow: '/',
         },
         sitemap: 'https://yourdomain.com/sitemap.xml',
       }
     }
     ```

### Seguridad

1. **Variables de Entorno**:
   - Nunca expongas tokens o claves en el código
   - Usa `.env.local` para desarrollo
   - Configura variables en Vercel para producción

2. **Validación de Datos**:
   - Valida siempre los datos recibidos de APIs externas
   - Utiliza TypeScript para tipado estático

3. **CSP (Content Security Policy)**:
   - Implementa políticas de seguridad de contenido
   - Configura encabezados HTTP adecuados

### Mantenibilidad

1. **Estructura del Código**:
   - Mantén una estructura clara y consistente
   - Separa lógica de presentación

2. **Comentarios**:
   - Documenta componentes complejos
   - Explica decisiones de diseño importantes

3. **Pruebas**:
   - Implementa pruebas unitarias para componentes clave
   - Usa Jest y React Testing Library

## Gestión de Dependencias

### Actualización de Paquetes

Es importante mantener las dependencias actualizadas para evitar problemas de seguridad:

```bash
# Ver paquetes desactualizados
npm outdated

# Actualizar paquetes
npm update

# Actualizar a versiones principales nuevas (con precaución)
npx npm-check-updates -u
npm install
```

### Auditoría de Seguridad

Realiza auditorías de seguridad regularmente:

```bash
npm audit

# Arreglar problemas automáticamente cuando sea posible
npm audit fix
```

## Monitorización y Analítica

### Vercel Analytics

Vercel proporciona análisis incorporados que puedes activar en la configuración del proyecto:

1. **Web Vitals**:
   - Métricas de rendimiento como LCP, FID y CLS
   - Seguimiento de errores en tiempo real

2. **Uso**:
   - Estadísticas de uso y tráfico
   - Rendimiento por región

### Google Analytics

Para un análisis más detallado, integra Google Analytics:

```tsx
// app/layout.tsx
import GoogleAnalytics from '@/components/google-analytics'

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  )
}

// components/google-analytics.tsx
export default function GoogleAnalytics() {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
    </>
  )
}
```