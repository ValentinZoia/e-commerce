import { ProductsList } from "@/components";
import LoaderPage from "@/components/LoaderPage/LoaderPage";

import { ProductStatus } from "@/types";
import { Suspense } from "react";

//En esta pagina se mostrarian todos los productos
//Hay que hacer un fetching de datos

const Products = () => {
  return (
    <Suspense fallback={<LoaderPage />}>
      <ProductsList
        title={`Todos los productos`}
        productsStatus={ProductStatus.All}
      />
    </Suspense>
  );
};

export default Products;
