import {
  createCheckoutSession,
  extendCheckoutSession,
  deleteCheckoutSession,
} from "@/data/Checkout/checkout.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCheckoutSessionMutations() {
  const queryClient = useQueryClient();

  const doCheckoutSession = useMutation({
    mutationFn: (userId: string) => createCheckoutSession(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout-session"] });
    },
  });
  const doExtendCheckoutSession = useMutation({
    mutationFn: (token: string) => extendCheckoutSession(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout-session"] });
    },
  });
  const doDeleteCheckoutSession = useMutation({
    mutationFn: (token: string) => deleteCheckoutSession(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkout-session"] });
    },
  });
  return {
    doCheckoutSession,
    doExtendCheckoutSession,
    doDeleteCheckoutSession,
  };
}
