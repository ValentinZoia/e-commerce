import { ReactQueryKeys } from "@/types";
import { GetProductsParams } from "@/types/product";

export const productsKeys = {
  all: [ReactQueryKeys.PRODUCTS] as const,
  list: (params: GetProductsParams) =>
    [
      ...productsKeys.all,
      "list",
      {
        page: params.page,
        limit: params.limit,
        search: params.search ?? "",
        category: params.category ?? "",
        featured: params.featured ?? "",
        promotion: params.promotion ?? "",
        priceMax: params.priceMax ?? "",
        priceMin: params.priceMin ?? "",
        inStock: params.inStock ?? "",
        freeShipping: params.freeShipping ?? "",
        size: params.size ?? "",
        _new: params.new ?? "",
        sortBy: params.sortBy ?? "",
        sortDir: params.sortDir ?? "",
      },
    ] as const,
};
