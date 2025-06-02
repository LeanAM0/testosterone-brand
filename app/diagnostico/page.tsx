'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DiagnosticoPage() {
  const [envInfo, setEnvInfo] = useState({
    imageStatus: 'Verificando...',
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    // Verificar si la imagen se carga correctamente
    const img = new Image();
    img.src = '/images/testosterone-molecule.png';
    
    img.onload = () => {
      setEnvInfo(prev => ({
        ...prev,
        imageStatus: '✅ Imagen cargada correctamente'
      }));
      console.log('Imagen de diagnóstico cargada correctamente');
    };
    
    img.onerror = () => {
      setEnvInfo(prev => ({
        ...prev,
        imageStatus: '❌ Error al cargar la imagen'
      }));
      console.error('Error al cargar la imagen de diagnóstico');
    };

    // Verificar variables de entorno del lado del servidor
    fetch('/api/test-env')
      .then(response => {
        if (!response.ok) {
          throw new Error('Endpoint no disponible');
        }
        return response.json();
      })
      .then(data => {
        console.log('Datos de variables de entorno:', data);
      })
      .catch(error => {
        console.error('Error al verificar variables de entorno:', error);
      });
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Página de Diagnóstico</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Estado de Imágenes</h2>
        <p className="mb-2">Estado de la molécula: {envInfo.imageStatus}</p>
        <p className="mb-4">Timestamp: {envInfo.timestamp}</p>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Prueba de Imagen:</h3>
          <div className="relative h-40 w-40 mx-auto bg-gray-700 rounded">
            <img 
              src="/images/testosterone-molecule.png" 
              alt="Molécula de Testosterona"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Variables de Entorno</h2>
        <p className="mb-2">Las variables de entorno solo son visibles en el servidor.</p>
        <p className="mb-2">Verifica si aparecen errores relacionados con Notion en la consola.</p>
        <p className="mb-4">También puedes revisar la configuración en el panel de Vercel:</p>
        <ul className="list-disc list-inside">
          <li>Vercel Dashboard → Proyecto → Settings → Environment Variables</li>
          <li>Asegúrate de tener configuradas NOTION_API_KEY y NOTION_DATABASE_ID</li>
        </ul>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Pasos Siguientes</h2>
        <ul className="list-disc list-inside">
          <li>Verifica la consola del navegador (F12 → Console)</li>
          <li>Actualiza la página para ver si los cambios del repositorio han surtido efecto</li>
          <li>Si persisten los problemas con Notion, verifica las variables en Vercel</li>
        </ul>
        <div className="mt-4">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}