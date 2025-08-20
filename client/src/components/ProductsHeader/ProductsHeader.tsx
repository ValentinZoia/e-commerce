import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductStatus } from "@/types";
import { ProductsCarouselSkeleton } from "@/components";
import { Suspense } from "react";
import HomeProductsCarousel from "../HomeProductsCarousel/HomeProductsCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface PoductsHeaderProps {
  title: string;
  productsStatus: ProductStatus;
}

const ProductsHeader = ({ title, productsStatus }: PoductsHeaderProps) => {
  return (
    <section className="py-10">
      <div className="container">
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
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            <Suspense fallback={<ProductsCarouselSkeleton />}>
              <HomeProductsCarousel productsStatus={productsStatus} />
            </Suspense>
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ProductsHeader;
