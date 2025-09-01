import { ReactQueryKeys } from "@/types";
import { GetOrdersParams } from "@/types/order";

export const ordersKeys = {
  all: [ReactQueryKeys.ORDERS] as const,
  list: (params: GetOrdersParams) =>
    [
      ...ordersKeys.all,
      "list",
      {
        page: params.page,
        limit: params.limit,
        search: params.search ?? "",
        sortBy: params.sortBy ?? "",
        sortDir: params.sortDir ?? "",
        customerEmail: params.customerEmail ?? "",
        customerName: params.customerName ?? "",
        customerPhone: params.customerPhone ?? "",
        productId: params.productId ?? "",
        status: params.status ?? "",
      },
    ] as const,
};
