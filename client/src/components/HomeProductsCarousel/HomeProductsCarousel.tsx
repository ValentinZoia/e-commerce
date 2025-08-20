import { useProductsSuspense } from "@/hooks/Products/useProducts";
import { ProductStatus } from "@/types/product";
import { CarouselItem } from "@/components/ui/carousel";
import ProductCard from "@/components/Product/ProductCard";

interface HomeProductsCarouselProps {
  productsStatus: ProductStatus;
}

function HomeProductsCarousel({ productsStatus }: HomeProductsCarouselProps) {
  const { data } = useProductsSuspense({
    featured: productsStatus === ProductStatus.FEATURED ? true : false,
    promotion: productsStatus === ProductStatus.PROMOTION ? true : false,
    new: productsStatus === ProductStatus.NEW ? true : false,
    page: 1,
    limit: 10,
  });

  return (
    <>
      {data.data.map((product) => (
        <CarouselItem
          key={product.id}
          className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/3 2xl:basis-1/4"
        >
          <ProductCard product={product} productsStatus={productsStatus} />
        </CarouselItem>
      ))}
    </>
  );
}
export default HomeProductsCarousel;
