import { ProductsList } from "@/components";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { ProductStatus } from "@/types";
import { Suspense } from "react";

const PromotionalProducts = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ProductsList
        title={`Productos en Promoción`}
        productsStatus={ProductStatus.PROMOTION}
      />
    </Suspense>
  );
};

export default PromotionalProducts;
