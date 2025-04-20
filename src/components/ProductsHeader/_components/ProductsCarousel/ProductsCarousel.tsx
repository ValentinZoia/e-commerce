
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

import ProductCard from "@/components/Product/ProductCard"
import{Product} from '@/types/product'

const ProductsExample: Product[] = [
  {
    id: 1,
    stock: 10,
    name: "Product 2",
    description: "Description 2",
    price: 15000,
    image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
    categoryId:"ropa",
    isNew: true,
  },
  {
    id: 2,
    stock: 10,
    name: "Product 3",
    description: "Description 3",
    price: 15000,
    image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
    categoryId:"ropa",
    isNew: true,
  },
  {
    id: 3,
    stock: 10,
    name: "Product 1",
    description: "Description 1",
    price: 15000,
    image: "https://http2.mlstatic.com/D_NQ_NP_664355-MLA75212155381_032024-O.webp",
    categoryId:"ropa",
    isNew: true,
  },

  
];

const ProductsCarousel = () => {
  
  
  
  return (
    <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {ProductsExample.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
    </Carousel>
  )
}

export default ProductsCarousel