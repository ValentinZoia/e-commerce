import { SkeletonProductCard } from "../SkeletonProductCard";
import { CarouselItem } from "@/components/ui/carousel";

const ProductsCarouselSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4">
          <SkeletonProductCard />
        </CarouselItem>
      ))}
    </>
  );
};

export default ProductsCarouselSkeleton;