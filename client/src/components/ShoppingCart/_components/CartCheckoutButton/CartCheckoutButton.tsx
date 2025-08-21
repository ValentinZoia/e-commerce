import { Button } from "@/components/ui/button";
import { PublicRoutes } from "@/types/route";
import { useNavigate } from "react-router-dom";

interface CartCheckoutButtonProps {
  hasItems: boolean;
  onClose?: () => void; // Función para cerrar el sheet del carrito
}

function CartCheckoutButton({ hasItems, onClose }: CartCheckoutButtonProps) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (hasItems) {
      navigate(PublicRoutes.CHECKOUT);
      onClose?.(); // Cerrar el sheet después de navegar
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
