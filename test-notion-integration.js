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
function processImages(imagesProperty) {
  let images = [];
  
  if (imagesProperty?.files && Array.isArray(imagesProperty.files)) {
    console.log(`Encontradas ${imagesProperty.files.length} imágenes potenciales`);
    
    images = imagesProperty.files.map((file, index) => {
      try {
        // Determinar la URL correcta según el tipo
        const url = file.type === 'external' ? file.external?.url : 
                    file.type === 'file' ? file.file?.url : '';
                    
        return {
          url: url || '',
          name: file.name || `imagen-${index + 1}`
        }
      } catch (fileError) {
        console.error(`Error procesando archivo de imagen #${index + 1}:`, fileError);
        return { url: '', name: `error-image-${index + 1}` };
      }
    }).filter(img => img.url); // Filtrar imágenes sin URL
    
    console.log(`Imágenes válidas después de filtrar: ${images.length}`);
  }
  
  return images;
}

// Función para buscar propiedades con tolerancia a espacios
function findProperty(props, baseNames) {
  // Primero intentar con los nombres exactos
  for (const name of baseNames) {
    if (props[name]) return props[name];
  }
  
  // Si no se encuentra, buscar considerando espacios adicionales
  const propKeys = Object.keys(props);
  for (const name of baseNames) {
    const matchingKey = propKeys.find(key => 
      key.trim().toLowerCase() === name.toLowerCase());
    if (matchingKey) return props[matchingKey];
  }
  
  return null;
}

// Test 1: Verificar conexión a Notion
async function testConnection() {
  console.log('=== Test 1: Verificar conexión a Notion ===');
  try {
    const response = await notion.users.list();
    console.log('✅ CONEXIÓN EXITOSA: API de Notion responde correctamente');
    console.log(`Usuarios encontrados: ${response.results.length}`);
    return true;
  } catch (error) {
    console.error('❌ ERROR DE CONEXIÓN:', error.message);
    return false;
  }
}

// Test 2: Verificar acceso a la base de datos
async function testDatabaseAccess() {
  console.log('\n=== Test 2: Verificar acceso a la base de datos ===');
  try {
    const response = await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID
    });
    console.log('✅ BASE DE DATOS ENCONTRADA:', response.title[0]?.plain_text || response.id);
    return true;
  } catch (error) {
    console.error('❌ ERROR ACCEDIENDO A LA BASE DE DATOS:', error.message);
    return false;
  }
}

// Test 3: Obtener productos
async function testGetProducts() {
  console.log('\n=== Test 3: Obtener productos ===');
  try {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID
    });
    
    console.log(`✅ PRODUCTOS ENCONTRADOS: ${response.results.length}`);
    
    // Verificar que hay productos
    if (response.results.length === 0) {
      console.warn('⚠️ No se encontraron productos en la base de datos');
      return { success: false, products: [] };
    }
    
    // Mapear productos para test
    const products = response.results.map(page => {
      const props = page.properties;
      
      // Encontrar propiedades con tolerancia a espacios
      const nameProperty = findProperty(props, ['Nombre', 'nombre', 'Name', 'name']);
      const imagesProperty = findProperty(props, ['Imagenes', 'imagenes', 'Images', 'images']);
      
      // Obtener nombre
      let name = '';
      try {
        name = nameProperty?.title?.[0]?.plain_text || '';
      } catch (error) {
        console.error('Error al acceder al título:', error);
      }
      
      // Procesar imágenes
      const images = processImages(imagesProperty);
      
      return {
        id: page.id,
        name: name,
        imagesCount: images.length,
        hasValidImages: images.length > 0,
        firstImageUrl: images[0]?.url || 'No image'
      };
    });
    
    console.log(`Productos procesados: ${products.length}`);
    
    // Contar productos con imágenes
    const productsWithImages = products.filter(p => p.hasValidImages).length;
    console.log(`Productos con imágenes válidas: ${productsWithImages} de ${products.length}`);
    
    return { success: true, products, productsWithImages };
  } catch (error) {
    console.error('❌ ERROR OBTENIENDO PRODUCTOS:', error.message);
    return { success: false, products: [] };
  }
}

// Ejecutar todos los tests
async function runAllTests() {
  console.log('🧪 INICIANDO PRUEBAS DE INTEGRACIÓN CON NOTION 🧪\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };
  
  // Test 1: Conexión
  results.tests.connection = await testConnection();
  
  // Si falla la conexión, no seguir
  if (!results.tests.connection) {
    console.error('\n❌ TEST FALLIDO: No se pudo conectar a Notion. Deteniendo pruebas.');
    results.success = false;
    saveTestResults(results);
    return;
  }
  
  // Test 2: Acceso a la base de datos
  results.tests.databaseAccess = await testDatabaseAccess();
  
  // Si falla el acceso a la base de datos, no seguir
  if (!results.tests.databaseAccess) {
    console.error('\n❌ TEST FALLIDO: No se pudo acceder a la base de datos. Deteniendo pruebas.');
    results.success = false;
    saveTestResults(results);
    return;
  }
  
  // Test 3: Obtener productos
  const productResult = await testGetProducts();
  results.tests.getProducts = productResult.success;
  results.productsData = {
    total: productResult.products.length,
    withImages: productResult.productsWithImages
  };
  
  // Evaluar resultado final
  results.success = results.tests.connection && 
                    results.tests.databaseAccess && 
                    results.tests.getProducts;
  
  // Mostrar resultado final
  console.log('\n=== RESULTADO FINAL ===');
  if (results.success) {
    console.log('✅ TODAS LAS PRUEBAS PASARON CORRECTAMENTE');
  } else {
    console.log('❌ ALGUNAS PRUEBAS FALLARON');
  }
  
  // Guardar resultados
  saveTestResults(results);
}

// Ejecutar los tests
runAllTests();