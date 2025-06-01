# Imágenes de Productos - Testosterone Brand

Esta carpeta contiene todas las imágenes de los productos que se muestran en la tienda online. Estas imágenes son fundamentales para la experiencia de compra de los usuarios.

## Estructura y Nombrado

Las imágenes siguen una convención de nombrado consistente para facilitar su gestión:

`[nombre-producto]-[vista].jpg`

Donde:
- `nombre-producto`: Nombre del producto en minúsculas con guiones
- `vista`: Perspectiva de la imagen (front, back, side, detail)

## Catálogo de Imágenes

| Nombre del Archivo | Producto | Vista | Categoría |
|-------------------|----------|-------|-----------|
| `arnold-pose-hoodie-back.jpg` | Sudadera Arnold Pose | Trasera | Hoodie |
| `austrian-oak-hoodie-back.jpg` | Sudadera Austrian Oak | Trasera | Hoodie |
| `austrian-oak-hoodie-front.jpg` | Sudadera Austrian Oak | Frontal | Hoodie |
| `cbum-tee-back.jpg` | Camiseta CBum | Trasera | T-Shirt |
| `molecule-tee-front.jpg` | Camiseta Molécula | Frontal | T-Shirt |
| `testosterone-metal-hoodie-back.jpg` | Sudadera Testosterone Metal | Trasera | Hoodie |
| `testosterone-metal-hoodie-front.jpg` | Sudadera Testosterone Metal | Frontal | Hoodie |
| `wolf-metal-hoodie.jpg` | Sudadera Wolf Metal | Frontal | Hoodie |

## Especificaciones Técnicas

Para mantener un sitio web rápido y con buena calidad visual:

- **Resolución**: 1200x1500px (4:5 ratio, óptimo para tiendas online)
- **Formato**: JPG con compresión de calidad 85-90%
- **Tamaño**: < 250KB por imagen para óptima carga
- **Fondo**: Preferiblemente blanco o neutro para destacar el producto
- **Iluminación**: Uniforme, sin sombras duras

## Cómo Añadir Nuevas Imágenes

1. Asegúrate de que la imagen cumple con las especificaciones técnicas
2. Nombra el archivo siguiendo la convención establecida
3. Coloca la imagen en esta carpeta
4. Actualiza este README si es necesario para documentar la nueva imagen

## Uso en Componentes

Estas imágenes se utilizan principalmente en:

1. El componente `ProductCard` para las vistas de grid:
   ```tsx
   <Image 
     src={`/images/products/${product.imageName}`} 
     alt={product.name}
     width={400}
     height={500}
     className="product-image"
   />
   ```

2. La página de detalle de producto:
   ```tsx
   <div className="product-gallery">
     {product.images.map((img, index) => (
       <Image 
         key={index}
         src={`/images/products/${img}`} 
         alt={`${product.name} - Vista ${index + 1}`}
         width={800}
         height={1000}
         className="product-detail-image"
       />
     ))}
   </div>
   ```

## Notas sobre Optimización

- Todas las imágenes son servidas a través del componente `Image` de Next.js
- Esto proporciona automáticamente:
  - Redimensionamiento adaptativo
  - Formatos modernos (WebP)
  - Lazy loading
  - Minimización de CLS (Cumulative Layout Shift)