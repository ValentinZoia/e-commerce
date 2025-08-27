import { Button } from "@/components/ui/button";
import { useCartActions } from "@/hooks/Cart/useCartActions";
import { Trash2 } from "lucide-react";

function ButtonEmptyCart() {
  const { emptyCart } = useCartActions();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={emptyCart}
      className="h-8 cursor-pointer text-xs text-destructive hover:text-destructive"
    >
      <Trash2 className="h-4 w-4 mr-1" />
      Vaciar carrito
    </Button>
  );
}
export default ButtonEmptyCart;
