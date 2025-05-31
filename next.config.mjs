/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['www.notion.so', 'prod-files-secure.s3.us-west-2.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Esta configuración ayuda con problemas de dependencias
    esmExternals: 'loose',
  },
  // Permitimos imágenes de Notion
  webpack(config) {
    return config;
  },
}

export default nextConfig