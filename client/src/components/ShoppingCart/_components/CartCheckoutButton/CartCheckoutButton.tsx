import { Button } from "@/components/ui/button";
import { useCheckoutSessionMutations } from "@/hooks/Checkout/useCheckoutMutations";
import { DBResponseCommand } from "@/types";
import { CheckoutDataResponse } from "@/types/checkout";
// import { PublicRoutes } from "@/types/route";
import { useNavigate } from "react-router-dom";

interface CartCheckoutButtonProps {
  hasItems: boolean;
  onClose?: () => void; // Función para cerrar el sheet del carrito
}

function CartCheckoutButton({ hasItems, onClose }: CartCheckoutButtonProps) {
  const navigate = useNavigate();
  const { doCheckoutSession } = useCheckoutSessionMutations();
  const handleCheckout = async () => {
    if (hasItems) {
      doCheckoutSession.mutate("esteesmiuseriddeprueba3", {
        onSuccess: (res: DBResponseCommand<CheckoutDataResponse>) => {
          navigate(res.data.checkoutUrl);
          onClose?.(); // Cerrar el sheet después de navegar
        },
        onError: (err: any) => console.error(err),
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="h-12 cursor-pointer text-md bg-addCart hover:bg-addCart/80 font-light"
      onClick={handleCheckout}
      disabled={!hasItems}
    >
      Iniciar compra
    </Button>
  );
}
export default CartCheckoutButton;
