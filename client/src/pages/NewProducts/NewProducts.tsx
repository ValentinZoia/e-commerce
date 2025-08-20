import { ProductsList } from "@/components";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { ProductStatus } from "@/types";
import { Suspense } from "react";

const NewProducts = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ProductsList
        title={`Productos Nuevos`}
        productsStatus={ProductStatus.NEW}
      />
    </Suspense>
  );
};

export default NewProducts;
