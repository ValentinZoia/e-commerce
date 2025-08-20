import { useProductByIdSuspense } from "@/hooks/Products/useProductById";
import { ProductDetailCard } from "../ProductDetailCard";

function ProductDetailFetchData({ id }: { id: string }) {
  const { data } = useProductByIdSuspense(id);

  return (
    <section className="container mx-auto my-12 py-4 ">
      <ProductDetailCard product={data} />
    </section>
  );
}
export default ProductDetailFetchData;
