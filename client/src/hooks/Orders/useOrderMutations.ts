import {
    createOrder,
    updateOrder,
    deleteOrder,
} from "@/data/Orders/orders.api";
import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";
import { ReactQueryKeys } from "@/types";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useOrderMutations() {
    const queryClient = useQueryClient();

    const createOrderMutation = useMutation({
        mutationFn: (data: OrderFormValues) => createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.ORDERS],
            });
        },
    });

    const updateOrderMutation = useMutation({
        mutationFn: ({ id, values }: { id: string; values: OrderFormValues }) =>
            updateOrder(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.ORDERS],
            });
        },
    });

    const deleteOrderMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => deleteOrder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.ORDERS],
            });
        },
    });

    return {
        createOrderMutation,
        updateOrderMutation,
        deleteOrderMutation,
    };
}
