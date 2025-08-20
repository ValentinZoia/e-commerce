import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/data/Products/products.api";
import { productsKeys } from "@/data/Products/products.keys";
import type { GetProductsParams } from "@/types";

export function useProductsSuspense(params: GetProductsParams) {
  return useSuspenseQuery({
    queryKey: productsKeys.list(params),
    queryFn: () => getProducts(params),
  });
}
