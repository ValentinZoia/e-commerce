import {ProductsHeader }from '@/components'
import {CarouselHome} from './_components'
import { ProductStatus, Product } from '@/types'


const featuredProducts: Product[] = [
  {
      id: 1,
      name: 'Smartphone Premium',
      description: 'Último modelo con cámara profesional',
      price: 999,
      stock: 50,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isFeatured: true,
      categoryId: 'electronics'
  },
  {
      id: 2,
      name: 'Sofá de Diseño',
      description: 'Sofá ergonómico en piel sintética',
      price: 1200,
      stock: 15,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isFeatured: true,
      categoryId: 'furniture'
  },
  {
      id: 3,
      name: 'Cafetera Automática',
      description: 'Prepara café como un barista profesional',
      price: 299,
      stock: 30,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isFeatured: true,
      categoryId: 'home'
  }
];

// Productos nuevos (isNew: true)
const newProducts: Product[] = [
  {
      id: 4,
      name: 'Audífonos Inalámbricos',
      description: 'Nueva generación con cancelación de ruido',
      price: 199,
      stock: 40,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isNew: true,
      categoryId: 'electronics'
  },
  {
      id: 5,
      name: 'Zapatillas Running',
      description: 'Tecnología de amortiguación avanzada',
      price: 129,
      stock: 25,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isNew: true,
      categoryId: 'sports'
  },
  {
      id: 6,
      name: 'Libro de Cocina',
      description: 'Nuevas recetas para 2023',
      price: 35,
      stock: 100,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isNew: true,
      categoryId: 'books'
  }
];

// Productos en promoción (isPromotion: true con discount)
const promotionProducts: Product[] = [
  {
      id: 7,
      name: 'Televisor 4K',
      description: '55 pulgadas con HDR',
      price: 799,
      discount: 0.2, // 20% de descuento
      stock: 20,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isPromotion: true,
      categoryId: 'electronics'
  },
  {
      id: 8,
      name: 'Juego de Sartenes',
      description: 'Antiadherente de última generación',
      price: 89,
      discount: 0.15, // 15% de descuento
      stock: 35,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isPromotion: true,
      categoryId: 'home'
  },
  {
      id: 9,
      name: 'Mochila Profesional',
      description: 'Resistente al agua con compartimentos',
      price: 59,
      discount: 0.3, // 30% de descuento
      stock: 45,
      image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
      isPromotion: true,
      categoryId: 'fashion'
  }
];




const Home = () => {
  //hacer un fetch a los productos en promocion-destacados-nuevos
  //hacer un enum para promocion-destacados-nuevos y pasarlo como prop
  
  
  return (
    <>
    <CarouselHome />
    <ProductsHeader title="Productos en Promoción" produsctsStatus={ProductStatus.PROMOTION} products={promotionProducts} />
    <ProductsHeader title="Productos Destacados" produsctsStatus={ProductStatus.FEATURED} products={featuredProducts}/>
    <ProductsHeader title="Productos Nuevos" produsctsStatus={ProductStatus.NEW} products={newProducts}/>
    
    </>
    
  )
}

export default Home