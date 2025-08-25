import useCheckoutSession from "@/hooks/Checkout/useCheckout";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import LoaderAuthGuard from "./LoaderAuthGuard";
const PrivateValidationFragment = <Outlet />;
function CheckoutGuard() {
  const { token } = useLoaderData() as {
    token: string;
  };
  const { isLoading, isValid } = useCheckoutSession({ token: token });

  if (isLoading) {
    return <LoaderAuthGuard />;
  }

  return isValid ? PrivateValidationFragment : <Navigate replace to={`/`} />;
}
export default CheckoutGuard;
