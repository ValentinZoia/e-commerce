import { Button } from "@/components/ui/button";
import { useCheckoutSessionMutations } from "@/hooks/Checkout/useCheckoutMutations";
import { DBResponseCommand } from "@/types";
import { CheckoutDataResponse } from "@/types/checkout";
// import { PublicRoutes } from "@/types/route";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CartCheckoutButtonProps {
  hasItems: boolean;
  onClose?: () => void; // Función para cerrar el sheet del carrito
}

function createPilotId() {
  const time = Date.now().toString(36); // base36 para acortar
  const rand = Math.random().toString(36).slice(2, 8); // parte aleatoria
  const extra =
    typeof navigator !== "undefined"
      ? navigator.userAgent.length.toString(36) // algo del navegador
      : process.pid.toString(36); // algo del proceso en Node

  return `${time}-${rand}-${extra}`;
}

function CartCheckoutButton({ hasItems, onClose }: CartCheckoutButtonProps) {
  const navigate = useNavigate();
  const { doCheckoutSession } = useCheckoutSessionMutations();
  const handleCheckout = async () => {
    if (hasItems) {
      const userId = createPilotId();
      doCheckoutSession.mutate(userId, {
        onSuccess: (res: DBResponseCommand<CheckoutDataResponse>) => {
          navigate(res.data.checkoutUrl);
          onClose?.(); // Cerrar el sheet después de navegar
        },
        onError: (err: any) => {
          console.error(err);
          toast.error(err.message);
        },
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="h-12 cursor-pointer text-md   font-light bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:text-white"
      onClick={handleCheckout}
      disabled={!hasItems}
    >
      Iniciar compra
    </Button>
  );
}
export default CartCheckoutButton;
