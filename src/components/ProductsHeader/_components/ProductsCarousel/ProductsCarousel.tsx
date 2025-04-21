
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import ProductCard from "@/components/Product/ProductCard"
import{Product, ProductStatus} from '@/types/product'



  


interface ProductsCarouselProps {
  productsStatus: ProductStatus;
  products: Product[]
}

const ProductsCarousel = ({productsStatus, products}:ProductsCarouselProps) => {
  
  
  
  return (
    <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
                    <ProductCard product={product} productsStatus={productsStatus} />
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