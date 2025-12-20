import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/data/Products/products.api";
import { productsKeys } from "@/data/Products/products.keys";
import type { GetProductsParams } from "@/types";

export function useProductsSuspense(params: GetProductsParams) {
    return useSuspenseQuery({
        queryKey: productsKeys.list(params),
        queryFn: () => getProducts(params),

        staleTime: 5 * 60 * 1000, //5 minutos cache
        gcTime: 10 * 60 * 1000, // 10 min en memoria

        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
    });
}
