import { getAllStoreCustomerData } from "@/data/StoreCustomer/StoreCustomer.api";
import { ReactQueryKeys } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useStoreCustomerSuspense() {
  return useSuspenseQuery({
    queryKey: [ReactQueryKeys.STORE_CUSTOMER],
    queryFn: () => getAllStoreCustomerData(),
  });
}
