import { lazy, Suspense, memo } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductStatus } from "@/types";
import { ProductsCarouselSkeleton } from "@/components";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Lazy load del carousel - no carga hasta que sea visible
const LazyHomeProductsCarousel = lazy(() => 
  import("../HomeProductsCarousel/HomeProductsCarousel")
);

interface ProductsHeaderProps {
  title: string;
  productsStatus: ProductStatus;
  categoryId?: string;
}

// Memoized component para evitar re-renders
const ProductsHeader = memo(({
  title,
  productsStatus,
  categoryId,
}: ProductsHeaderProps) => {
  const carouselKey = `${productsStatus}-${categoryId || 'all'}`;

  return (
    <section className="py-10">
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link
            to={`/${productsStatus}`}
            className="text-sm font-medium flex items-center hover:underline"
          >
            Ver todos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <Suspense fallback={<ProductsCarouselSkeleton />}>
              <LazyHomeProductsCarousel
                key={carouselKey} // Force re-render cuando cambia el status
                productsStatus={productsStatus}
                categoryId={categoryId}
              />
            </Suspense>
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-gray-50" />
          <CarouselNext className="hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-gray-50" />
        </Carousel>
        <div className="flex justify-center mt-6 md:hidden">
          <p className="text-sm text-gray-500">
            Desliza para ver más productos
          </p>
        </div>
      </div>
    </section>
  );
});

ProductsHeader.displayName = "ProductsHeader";

export default ProductsHeader;