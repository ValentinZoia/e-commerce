import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/data/Categories/categories.api";
import { CategoryFormValues } from "@/lib/zod-schemas/categorySchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCategoryMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CategoryFormValues) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: CategoryFormValues }) =>
      updateCategory(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
