import {
  createCheckoutSession,
  extendCheckoutSession,
  deleteCheckoutSession,
} from "@/data/Checkout/checkout.api";
import { ReactQueryKeys } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheckoutSessionMutations() {
  const queryClient = useQueryClient();

  const doCheckoutSession = useMutation({
    mutationFn: (userId: string) => createCheckoutSession(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.CHECKOUT] });
    },
  });
  const doExtendCheckoutSession = useMutation({
    mutationFn: (token: string) => extendCheckoutSession(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.CHECKOUT] });
    },
  });
  const doDeleteCheckoutSession = useMutation({
    mutationFn: (token: string) => deleteCheckoutSession(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ReactQueryKeys.CHECKOUT] });
    },
  });
  return {
    doCheckoutSession,
    doExtendCheckoutSession,
    doDeleteCheckoutSession,
  };
}
