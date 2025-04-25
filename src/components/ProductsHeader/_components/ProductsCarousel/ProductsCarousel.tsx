import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/Product/ProductCard";
import { ProductStatus } from "@/types/product";
import { useFetchProducts } from "@/hooks/useFetchProducts";

interface ProductsCarouselProps {
  productsStatus: ProductStatus;
}

const ProductsCarousel = ({ productsStatus }: ProductsCarouselProps) => {
  const { status, error, products } = useFetchProducts({
    productsStatus: productsStatus,
  });

  if (status === "loading")
    return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  return (
    <>
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <ProductCard product={product} productsStatus={productsStatus} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </>
  );
};

export default ProductsCarousel;
