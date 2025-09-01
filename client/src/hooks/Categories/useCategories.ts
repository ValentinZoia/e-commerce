import { useSuspenseQuery } from "@tanstack/react-query";
import { getCategories } from "@/data/Categories/categories.api";
import { categoriesKeys } from "@/data/Categories/categories.keys";
import type { Category, GetItemParamsBase } from "@/types";

export function useCategoriesSuspense(params: GetItemParamsBase<Category>) {
  return useSuspenseQuery({
    queryKey: categoriesKeys.list(params),
    queryFn: () => getCategories(params),
  });
}
