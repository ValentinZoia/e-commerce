import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { ProductsList } from "@/components/ProductList";
import { ProductStatus } from "@/types/product";
import { Suspense } from "react";
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams] = useSearchParams();

  // Get the value of the 'q' query parameter
  const searchTerm = searchParams.get("q");

  return (
    <Suspense fallback={<LoaderPage />}>
      <ProductsList
        title={`Resultados para: ${searchTerm}`}
        productsStatus={ProductStatus.All}
        search={searchTerm ? searchTerm : undefined}
      />
    </Suspense>
  );
}
export default SearchPage;
