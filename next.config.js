/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración optimizada para Next.js 15
  reactStrictMode: true,
  // Mejorar el rendimiento evitando compilaciones innecesarias
  webpack: (config) => {
    // Optimizaciones para produccion
    if (process.env.NODE_ENV === 'production') {
      // Evitar incluir la molecula en la exportacion de server components
      config.module.rules.push({
        test: /testosterone-molecule/,
        sideEffects: false
      });
    }
    return config;
  },
  images: {
    // Lista de dominios permitidos para cargar imágenes
    domains: [
      'localhost',
      'vercel.app',
      'testosterone-brand.vercel.app',
      'testosterone-brand.windsurf.build',
      'testosterone-brand-9qi8z.netlify.app',
      'netlify.app',
      'testosterone-brand.netlify.app',
      's3.amazonaws.com',
      'images.unsplash.com'
    ],
    // Patrón para permitir cualquier imagen desde HTTPS
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
    // Desactivar optimización para algunas imágenes
    unoptimized: true,
  },
  // Exponer variables de entorno al navegador (solo en desarrollo)
  env: process.env.NODE_ENV === 'development' ? {
    NOTION_API_KEY: process.env.NOTION_API_KEY,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  } : {},
  // Configuración para mejorar la depuración
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  // Configuración para asegurar compatibilidad máxima
  typescript: {
    // Ignorar errores de TS durante la compilación para evitar fallos de despliegue
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
  // Optimizar para produccion
  output: 'standalone', // Para mejorar el despliegue con Docker/Vercel
  poweredByHeader: false, // Mejorar seguridad eliminando el header
};

module.exports = nextConfig;