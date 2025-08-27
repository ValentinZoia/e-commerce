import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ButtonEmptyCart } from "../ButtonEmptyCart";

interface CartHeaderProps {
  hasItems: boolean;
}

function CartHeader({ hasItems }: CartHeaderProps) {
  return (
    <SheetHeader className="flex flex-row items-center justify-between">
      <SheetTitle>Carrito de compras</SheetTitle>
      {hasItems && <ButtonEmptyCart />}
    </SheetHeader>
  );
}
export default CartHeader;
