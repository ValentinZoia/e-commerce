import { getOrders } from "@/data/Orders/orders.api";
import { ordersKeys } from "@/data/Orders/orders.keys";
import { GetOrdersParams } from "@/types/order";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useOrdersSuspense(params: GetOrdersParams) {
  return useSuspenseQuery({
    queryKey: ordersKeys.list(params),
    queryFn: () => getOrders(params),
  });
}
