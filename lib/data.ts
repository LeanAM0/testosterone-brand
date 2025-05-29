export interface Product {
  id: string
  name: string
  category: string
  price: string
  image: string
  images: string[]
  description: string
  features: string[]
}

export const products: Product[] = [
  {
    id: "austrian-oak-hoodie",
    name: "Austrian Oak Hoodie",
    category: "Hoodies",
    price: "$79.99",
    image: "/images/products/austrian-oak-hoodie-front.jpg",
    images: ["/images/products/austrian-oak-hoodie-front.jpg", "/images/products/austrian-oak-hoodie-back.jpg"],
    description:
      "Rinde homenaje a la leyenda del culturismo con esta sudadera premium. Presenta la icónica silueta de Arnold Schwarzenegger, 7 veces Mr. Olympia, en la espalda y la molécula de testosterona en el frente. Fabricada con algodón de alta calidad para máxima comodidad y durabilidad.",
    features: [
      "Algodón premium de 320 g/m²",
      "Estampado de alta definición resistente al lavado",
      "Capucha con doble capa",
      "Bolsillo canguro frontal",
      "Puños y cintura con elástico reforzado",
      "Disponible en negro",
    ],
  },
  {
    id: "arnold-pose-hoodie",
    name: "Arnold Pose Hoodie",
    category: "Hoodies",
    price: "$79.99",
    image: "/images/products/austrian-oak-hoodie-front.jpg",
    images: ["/images/products/austrian-oak-hoodie-front.jpg", "/images/products/arnold-pose-hoodie-back.jpg"],
    description:
      "Una celebración de la era dorada del culturismo. Esta sudadera presenta una pose clásica de Arnold Schwarzenegger en la espalda con la inscripción 'The Austrian Oak - 7x Mr. Olympia'. El diseño minimalista de la molécula de testosterona en el frente complementa perfectamente el impactante diseño posterior.",
    features: [
      "Algodón premium de 320 g/m²",
      "Estampado de alta definición resistente al lavado",
      "Capucha con doble capa",
      "Bolsillo canguro frontal",
      "Puños y cintura con elástico reforzado",
      "Disponible en negro",
    ],
  },
  {
    id: "testosterone-metal-hoodie",
    name: "Testosterone Metal Hoodie",
    category: "Hoodies",
    price: "$74.99",
    image: "/images/products/testosterone-metal-hoodie-front.jpg",
    images: [
      "/images/products/testosterone-metal-hoodie-front.jpg",
      "/images/products/testosterone-metal-hoodie-back.jpg",
    ],
    description:
      "Haz una declaración audaz con nuestra sudadera Testosterone Metal. Presenta el logotipo de Testosterone en un impresionante estilo de metal tanto en el frente como en la espalda. El diseño agresivo refleja la intensidad y dedicación necesarias para forjar un físico excepcional.",
    features: [
      "Algodón premium de 320 g/m²",
      "Estampado de alta definición resistente al lavado",
      "Capucha con doble capa",
      "Bolsillo canguro frontal",
      "Puños y cintura con elástico reforzado",
      "Disponible en negro",
    ],
  },
  {
    id: "wolf-metal-hoodie",
    name: "Wolf Metal Hoodie",
    category: "Hoodies",
    price: "$84.99",
    image: "/images/products/wolf-metal-hoodie.jpg",
    images: ["/images/products/wolf-metal-hoodie.jpg"],
    description:
      "Abraza tu naturaleza salvaje con nuestra sudadera Wolf Metal. Presenta el logotipo de Testosterone en estilo metal con una ilustración detallada de un lobo encadenado, simbolizando la bestia interior que impulsa tu entrenamiento. Un diseño único que combina agresividad y control.",
    features: [
      "Algodón premium de 320 g/m²",
      "Estampado de alta definición resistente al lavado",
      "Capucha con doble capa",
      "Bolsillo canguro frontal",
      "Puños y cintura con elástico reforzado",
      "Disponible en negro",
    ],
  },
  {
    id: "molecule-tee",
    name: "Molecule T-Shirt",
    category: "Tanks",
    price: "$39.99",
    image: "/images/products/molecule-tee-front.jpg",
    images: ["/images/products/molecule-tee-front.jpg", "/images/products/cbum-tee-back.jpg"],
    description:
      "Minimalismo científico para los conocedores del fitness. Esta camiseta presenta la estructura molecular de la testosterona en el frente y un potente homenaje a Chris Bumstead en la espalda. El diseño limpio y elegante hace una declaración sutil pero poderosa.",
    features: [
      "100% algodón peinado de 180 g/m²",
      "Estampado de alta definición resistente al lavado",
      "Cuello reforzado",
      "Corte regular con caída perfecta",
      "Disponible en negro",
    ],
  },
]

export const featuredProducts = [
  products[0], // Austrian Oak Hoodie
  products[2], // Testosterone Metal Hoodie
  products[4], // Molecule T-Shirt
]