import {
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/data/Orders/orders.api";
import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useOrderMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: OrderFormValues) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: OrderFormValues }) =>
      updateOrder(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
