import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductById } from "@/data/Products/products.api";
export function useProductByIdSuspense(id: string) {
  return useSuspenseQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
}
