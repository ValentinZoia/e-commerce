import { ProductsList } from "@/components";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { ProductStatus } from "@/types";
import { Suspense } from "react";

const FeaturedProducts = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ProductsList
        title={`Productos Destacados`}
        productsStatus={ProductStatus.FEATURED}
      />
    </Suspense>
  );
};

export default FeaturedProducts;
