import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina múltiples clases CSS usando clsx y las optimiza con tailwind-merge
 * Esto permite combinar clases condicionales y eliminar conflictos entre clases de Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}