import {
    createCategory,
    deleteCategory,
    updateCategory,
} from "@/data/Categories/categories.api";
import { CategoryFormValues } from "@/lib/zod-schemas/categorySchema";
import { ReactQueryKeys } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCategoryMutations() {
    const queryClient = useQueryClient();

    const createItemMutation = useMutation({
        mutationFn: (data: CategoryFormValues) => createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CATEGORIES],
            });
        },
    });

    const updateItemMutation = useMutation({
        mutationFn: ({
            id,
            values,
        }: {
            id: string;
            values: CategoryFormValues;
        }) => updateCategory(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CATEGORIES],
            });
        },
    });

    const deleteItemMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ReactQueryKeys.CATEGORIES],
            });
        },
    });

    return {
        createItemMutation,
        updateItemMutation,
        deleteItemMutation,
    };
}
