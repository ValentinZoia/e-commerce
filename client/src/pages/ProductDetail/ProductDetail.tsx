import { useLoaderData } from "react-router-dom";
import ProductDetailFetchData from "./_components/ProductDetailFetchData/ProductDetailFetchData";
import { Suspense } from "react";
import LoaderPage from "@/components/LoaderPage/LoaderPage";

const ProductDetail = () => {
  //obtenemos el productId de la url
  const { productId } = useLoaderData() as {
    productId: string;
  };

  if (!productId) {
    throw new Response("Invalid category ID", { status: 400 });
  }

  return (
    <main className="bg-white min-h-screen rounded-md">
      <Suspense fallback={<LoaderPage />}>
        <ProductDetailFetchData id={productId} />
      </Suspense>
    </main>
  );
};

export default ProductDetail;
