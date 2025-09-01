import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductById } from "@/data/Products/products.api";
import { ReactQueryKeys } from "@/types";
export function useProductByIdSuspense(id: string) {
  return useSuspenseQuery({
    queryKey: [ReactQueryKeys.PRODUCT, id],
    queryFn: () => getProductById(id),
  });
}
