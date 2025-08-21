import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utilities";
import { ShoppingBag } from "lucide-react";

interface CartTriggerButtonProps {
  totalItems: number;
  totalPrice: number;
}

function CartTriggerButton({ totalItems, totalPrice }: CartTriggerButtonProps) {
  return (
    <Button
      variant="ghost"
      className="relative cursor-pointer hover:bg-transparent"
    >
      <div className="bg-lime-100 rounded-full p-2">
        <ShoppingBag className="h-5 w-5" />
      </div>
      <div className="flex flex-col items-start gap-0">
        <span className="text-xs">Carrito ({totalItems})</span>
        <span className="text-xs font-light">{formatPrice(totalPrice)}</span>
      </div>
      <span className="sr-only">Shopping Cart</span>
    </Button>
  );
}
export default CartTriggerButton;
