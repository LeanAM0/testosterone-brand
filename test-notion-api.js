// Script para probar la API de Notion directamente
const { Client } = require('@notionhq/client');

// Inicializar cliente de Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY || 'ntn_W9937756284trEsdAxqQdsnhpxiIotqBdU6aFiroLmUgu0'
});

// ID de la base de datos
const DATABASE_ID = process.env.NOTION_DATABASE_ID || '1f625056207c80c6bd27000c8c49292b';

// Función principal
async function main() {
  try {
    console.log('🔍 Probando conexión a Notion API...');
    
    // Obtener usuarios para verificar conexión
    const users = await notion.users.list({});
    console.log(`✅ Conexión exitosa! ${users.results.length} usuarios encontrados.`);
    
    // Obtener información de la base de datos
    console.log(`\n🔍 Buscando base de datos con ID: ${DATABASE_ID}...`);
    const database = await notion.databases.retrieve({
      database_id: DATABASE_ID
    });
    console.log(`✅ Base de datos encontrada: ${database.title[0]?.plain_text || database.title}`);
    
    // Obtener propiedades de la base de datos
    console.log('\n📋 Propiedades de la base de datos:');
    const properties = database.properties;
    Object.keys(properties).forEach(propName => {
      console.log(` - ${propName} (${properties[propName].type})`);
    });
    
    // Consultar productos
    console.log('\n🔍 Consultando productos...');
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Nombre',
          direction: 'ascending',
        },
      ],
    });
    
    console.log(`✅ ${response.results.length} productos encontrados.\n`);
    
    // Mostrar resumen de productos
    response.results.forEach((page, index) => {
      const properties = page.properties;
      const name = properties.Nombre?.title[0]?.plain_text || 'Sin nombre';
      const price = properties.Precio?.number || 'Sin precio';
      const category = properties.Categoría?.select?.name || 'Sin categoría';
      
      console.log(`Producto #${index + 1}: ${name} | $${price} | ${category}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

// Ejecutar
main();