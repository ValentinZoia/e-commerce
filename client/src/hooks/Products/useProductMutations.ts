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

  const createMutation = useMutation({
    mutationFn: (data: ProductFormValues) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PRODUCTS] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ProductFormValues }) =>
      updateProduct(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PRODUCTS] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.PRODUCTS] });
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
