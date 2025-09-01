import { getOrderById } from "@/data/Orders/orders.api";
import { ReactQueryKeys } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useOrderByIdSuspense(id: string) {
  return useSuspenseQuery({
    queryKey: [ReactQueryKeys.ORDER, id],
    queryFn: () => getOrderById(id),
  });
}
