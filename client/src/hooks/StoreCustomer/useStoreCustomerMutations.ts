import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createStoreCustomerData,
  deleteStoreCustomerData,
  updateStoreCustomerData,
} from "@/data/StoreCustomer/StoreCustomer.api";
import { StoreCustomerFormValues } from "@/lib/zod-schemas/storeCustomerSchema";
import { ReactQueryKeys } from "@/types";

export function useStoreCustomerMutations() {
  const queryClient = useQueryClient();

  const createMuation = useMutation({
    mutationFn: (values: StoreCustomerFormValues) =>
      createStoreCustomerData(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.STORE_CUSTOMER],
      });
    },
  });

  const updateMuation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: StoreCustomerFormValues;
    }) => updateStoreCustomerData(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.STORE_CUSTOMER],
      });
    },
  });

  const deleteMuation = useMutation({
    mutationFn: ({ id }: { id: string }) => deleteStoreCustomerData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ReactQueryKeys.STORE_CUSTOMER],
      });
    },
  });

  return {
    createMuation,
    updateMuation,
    deleteMuation,
  };
}
