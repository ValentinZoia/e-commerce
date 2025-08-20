import { Category } from "@/types";
import { GetItemParamsBase } from "@/types/shared";

export const categoriesKeys = {
  all: ["categories"] as const,
  list: (params: GetItemParamsBase<Category>) =>
    [
      ...categoriesKeys.all,
      "list",
      {
        page: params.page,
        limit: params.limit,
        search: params.search ?? "",
        sortBy: params.sortBy ?? "",
        sortDir: params.sortDir ?? "",
      },
    ] as const,
};
