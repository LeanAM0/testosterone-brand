import { NextResponse } from 'next/server';

/**
 * Este endpoint de diagnóstico nos ayuda a entender cómo se están
 * procesando las variables de entorno en el despliegue de Vercel.
 * 
 * IMPORTANTE: Eliminar este archivo después de solucionar los problemas
 * ya que expone información sensible (aunque parcial) de las credenciales.
 */
export async function GET() {
  // Recopilamos información de diagnóstico sobre variables de entorno
  const envInfo = {
    // Solo mostramos los primeros 4 caracteres de la API key por seguridad
    apiKey: process.env.NOTION_API_KEY 
      ? `${process.env.NOTION_API_KEY.substring(0, 4)}...` 
      : 'No definido',
    
    // Verificamos el ID de la base de datos con y sin guiones
    dbId: process.env.NOTION_DATABASE_ID || 'No definido',
    dbIdLength: process.env.NOTION_DATABASE_ID 
      ? process.env.NOTION_DATABASE_ID.length 
      : 0,
    dbIdHasHyphens: process.env.NOTION_DATABASE_ID 
      ? process.env.NOTION_DATABASE_ID.includes('-') 
      : false,
    
    // Información general del entorno
    nodeEnv: process.env.NODE_ENV || 'No definido',
    vercelEnv: process.env.VERCEL_ENV || 'No definido',
    
    // Timestamp para verificar que no es una respuesta cacheada
    timestamp: new Date().toISOString(),
  };
  
  // Retornamos la información como JSON
  return NextResponse.json(envInfo);
}