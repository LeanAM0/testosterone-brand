// Test para verificar la integración con Notion
// Este script comprueba que podemos conectarnos a Notion, obtener productos y procesar imágenes

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Configuración
const NOTION_API_KEY = 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0';
const NOTION_DATABASE_ID = '1f625056-207c-80c3-b951-ff146b3c2c51';

// Inicializar cliente Notion
const notion = new Client({
  auth: NOTION_API_KEY
});

// Función para guardar los resultados
function saveTestResults(results) {
  const filePath = path.join(__dirname, 'test-results.json');
  fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
  console.log(`Resultados guardados en ${filePath}`);
}

// Función para procesar imágenes similar a la de la aplicación
function extractValidImages(page) {
  const images = [];
  
  // Buscar en campos de tipo files (para imágenes directas)
  if (page.properties.Imágenes && page.properties.Imágenes.files) {
    const imageFiles = page.properties.Imágenes.files;
    console.log(`Encontradas ${imageFiles.length} imágenes potenciales`);
    
    // Filtrar solo archivos de tipo imagen
    const validImages = imageFiles.filter(file => {
      // Verificar que sea una URL de archivo externo
      return file.type === 'external' || file.type === 'file';
    });
    
    console.log(`Imágenes válidas después de filtrar: ${validImages.length}`);
    
    // Extraer las URLs
    validImages.forEach(file => {
      const url = file.type === 'external' ? file.external.url : file.file.url;
      images.push(url);
    });
  }
  
  return images;
}

// Iniciar test
console.log('🧪 INICIANDO PRUEBAS DE INTEGRACIÓN CON NOTION 🧪\n');

// Test 1: Verificar conexión a Notion
async function testNotionConnection() {
  console.log('=== Test 1: Verificar conexión a Notion ===');
  try {
    const response = await notion.users.list({});
    console.log(`✅ CONEXIÓN EXITOSA: API de Notion responde correctamente`);
    console.log(`Usuarios encontrados: ${response.results.length}`);
    return true;
  } catch (error) {
    console.error(`❌ ERROR DE CONEXIÓN: ${error.message}`);
    return false;
  }
}

// Test 2: Verificar acceso a la base de datos
async function testDatabaseAccess() {
  console.log('\n=== Test 2: Verificar acceso a la base de datos ===');
  try {
    const database = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID
    });
    console.log(`✅ BASE DE DATOS ENCONTRADA: ${database.title[0].plain_text}`);
    return true;
  } catch (error) {
    console.error(`❌ ERROR ACCEDIENDO A LA BASE DE DATOS: ${error.message}`);
    return false;
  }
}

// Test 3: Obtener productos
async function testGetProducts() {
  console.log('\n=== Test 3: Obtener productos ===');
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      sorts: [
        {
          property: 'Nombre',
          direction: 'ascending',
        },
      ],
    });
    
    console.log(`✅ PRODUCTOS ENCONTRADOS: ${response.results.length}`);
    
    // Procesar productos
    const products = [];
    let productsWithImages = 0;
    
    for (const page of response.results) {
      // Extraer imágenes
      const images = extractValidImages(page);
      
      // Crear objeto de producto
      const product = {
        id: page.id,
        name: page.properties.Nombre.title[0]?.plain_text || 'Sin nombre',
        description: page.properties.Descripción.rich_text[0]?.plain_text || '',
        price: page.properties.Precio.number || 0,
        category: page.properties.Categoría.select?.name || 'Sin categoría',
        images: images
      };
      
      products.push(product);
      
      if (images.length > 0) {
        productsWithImages++;
      }
    }
    
    console.log(`Productos procesados: ${products.length}`);
    console.log(`Productos con imágenes válidas: ${productsWithImages} de ${products.length}`);
    
    // Mostrar primera imagen del primer producto (si existe)
    if (products.length > 0 && products[0].images.length > 0) {
      console.log(`Primera imagen URL: ${products[0].images[0]}`);
    }
    
    return {
      success: true,
      count: products.length,
      withImages: productsWithImages
    };
  } catch (error) {
    console.error(`❌ ERROR OBTENIENDO PRODUCTOS: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

// Ejecutar tests de forma secuencial
async function runTests() {
  const results = {
    connectionTest: false,
    databaseTest: false,
    productsTest: null,
    timestamp: new Date().toISOString()
  };
  
  // Test 1
  results.connectionTest = await testNotionConnection();
  if (!results.connectionTest) {
    console.log('\n❌ TEST FALLIDO: No se pudo conectar a Notion API');
    saveTestResults(results);
    return;
  }
  
  // Test 2
  results.databaseTest = await testDatabaseAccess();
  if (!results.databaseTest) {
    console.log('\n❌ TEST FALLIDO: No se pudo acceder a la base de datos');
    saveTestResults(results);
    return;
  }
  
  // Test 3
  results.productsTest = await testGetProducts();
  
  // Resultado final
  console.log('\n=== RESULTADO FINAL ===');
  if (results.connectionTest && results.databaseTest && results.productsTest.success) {
    console.log('✅ TODOS LOS TESTS PASARON CORRECTAMENTE');
  } else {
    console.log('❌ ALGUNOS TESTS FALLARON');
  }
  
  saveTestResults(results);
}

// Iniciar tests
runTests();