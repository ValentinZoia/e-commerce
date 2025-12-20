import {
    createProduct,
    deleteProduct,
    updateProduct,
} from "@/data/Products/products.api";
import { ProductFormValues } from "@/lib/zod-schemas/productSchema";
import { ReactQueryKeys } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useProductMutations() {
    const queryClient = useQueryClient();

    const createItemMutation = useMutation({
        mutationFn: (data: ProductFormValues) => createProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.PRODUCTS],
            });
        },
    });

    const updateItemMutation = useMutation({
        mutationFn: ({
            id,
            values,
        }: {
            id: string;
            values: ProductFormValues;
        }) => updateProduct(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.PRODUCTS],
            });
        },
    });

    const deleteItemMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.PRODUCTS],
            });
        },
    });

    return {
        createItemMutation,
        updateItemMutation,
        deleteItemMutation,
    };
}
