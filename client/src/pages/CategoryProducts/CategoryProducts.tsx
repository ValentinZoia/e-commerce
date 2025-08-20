import { ProductStatus } from "@/types";
import { useLoaderData } from "react-router-dom";
import { ProductsList } from "@/components";
import { Suspense } from "react";

const CategoryProducts = () => {
  const { categoryId } = useLoaderData() as {
    categoryId: string;
  };
  if (!categoryId) {
    throw new Response("Invalid category ID", { status: 400 });
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsList
        title={`Productos de la categoria ${categoryId}`}
        productsStatus={ProductStatus.FORCATEGORY}
        categoryId={categoryId}
      />
    </Suspense>
  );
};

export default CategoryProducts;
