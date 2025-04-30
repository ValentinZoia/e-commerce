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
import { ProductsCarouselSkeleton } from "@/components";
import { EmptyState } from "@/components/EmptyState";

interface ProductsCarouselProps {
  productsStatus: ProductStatus;
}

const ProductsCarousel = ({ productsStatus }: ProductsCarouselProps) => {
  const { status, error, products } = useFetchProducts({
    productsStatus: productsStatus,
  });

  if (error) return <EmptyState title={`Error: ${error}`} />;

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-2 md:-ml-4">
        {status === "loading" ? (
          <ProductsCarouselSkeleton />
        ) : !products || products.length === 0 ? (
          <EmptyState title="No se encontraron productos"/>
        ) : (
          products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <ProductCard product={product} productsStatus={productsStatus} />
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      {status !== "loading" && products && products.length > 0 && (
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      )}
    </Carousel>
  );
};

export default ProductsCarousel;