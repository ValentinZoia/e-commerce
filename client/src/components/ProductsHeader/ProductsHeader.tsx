import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ProductStatus } from "@/types";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { EmptyState } from "../EmptyState";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/Product/ProductCard";

import { ProductsCarouselSkeleton } from "@/components";

interface PoductsHeaderProps {
  title: string;
  productsStatus: ProductStatus;
}

const ProductsHeader = ({ title, productsStatus }: PoductsHeaderProps) => {
  const { status, error, products } = useFetchProducts({
    productsStatus: productsStatus,
  });

  if (error) return <EmptyState title={`Error: ${error}`} />;

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
            {status === "loading" ? (
              <ProductsCarouselSkeleton />
            ) : !products || products.length === 0 ? (
              <EmptyState title="No se encontraron productos" />
            ) : (
              products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <ProductCard
                    product={product}
                    productsStatus={productsStatus}
                  />
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
      </div>
    </section>
  );
};

export default ProductsHeader;
