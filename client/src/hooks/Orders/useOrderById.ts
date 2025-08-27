import { getOrderById } from "@/data/Orders/orders.api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useOrderByIdSuspense(id: string) {
  return useSuspenseQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
  });
}
