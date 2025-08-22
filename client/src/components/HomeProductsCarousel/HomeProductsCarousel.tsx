import { useProductsSuspense } from "@/hooks/Products/useProducts";
import { ProductStatus } from "@/types/product";
import { CarouselItem } from "@/components/ui/carousel";
import ProductCard from "@/components/Product/ProductCard";

interface HomeProductsCarouselProps {
  productsStatus: ProductStatus;
  categoryId?: string;
}

function HomeProductsCarousel({
  productsStatus,
  categoryId,
}: HomeProductsCarouselProps) {
  const { data } = useProductsSuspense({
    featured: productsStatus === ProductStatus.FEATURED ? true : undefined,
    promotion: productsStatus === ProductStatus.PROMOTION ? true : undefined,
    new: productsStatus === ProductStatus.NEW ? true : undefined,
    category:
      productsStatus === ProductStatus.FORCATEGORY ? categoryId : undefined,
    page: 1,
    limit: 10,
  });

  return (
    <>
      {data.data.map((product) => (
        <CarouselItem
          key={product.id}
          className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3  lg:basis-1/4 xl:basis-1/5"
        >
          <ProductCard
            product={product}
            productsStatus={productsStatus}
            isForCarousel={true}
          />
        </CarouselItem>
      ))}
    </>
  );
}
export default HomeProductsCarousel;
