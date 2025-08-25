import { getCheckoutSession } from "@/data/Checkout/checkout.api";
import { useQuery } from "@tanstack/react-query";

const useCheckoutSession = ({ token }: { token: string }) => {
  const { data, isLoading, isError, isSuccess, isFetching, isPending } =
    useQuery({
      queryKey: ["checkout-session"],
      queryFn: () => getCheckoutSession(token),
    });

  if (isSuccess) {
    return {
      data,
      isValid: true,
      isLoading: isLoading || isFetching || isPending,
    };
  }

  if (isError) {
    return {
      data: null,
      isValid: false,
      isLoading: isLoading || isFetching || isPending,
    };
  }
  return {
    data: null,
    isValid: false,
    isLoading: isLoading || isFetching || isPending,
  };
};

export default useCheckoutSession;
