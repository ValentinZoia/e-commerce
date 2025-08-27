import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { CartItem } from "@/types/cart";

import {
  CartCheckoutButton,
  CartHeader,
  CartItemList,
  CartSummary,
  EmptyCartMessage,
} from "./_components";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/utilities";

const CartPanel = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems, totalPrice, items, loading } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  const closeSheet = () => {
    setIsOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  const hasItems = cartItems.length > 0;
  return (
    <div className="p-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="relative cursor-pointer hover:bg-transparent"
          >
            <div className="bg-lime-100 rounded-full p-2">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div className="flex flex-col items-start gap-0">
              <span className="text-xs">Carrito ({totalItems})</span>
              <span className="text-xs font-light">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <span className="sr-only">Shopping Cart</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="px-6">
          <CartHeader hasItems={hasItems} />

          {!hasItems ? (
            <EmptyCartMessage />
          ) : (
            <>
              <CartItemList items={cartItems} />

              <Separator className="my-4" />

              <CartSummary totalPrice={totalPrice} items={cartItems} />

              <CartCheckoutButton hasItems={hasItems} onClose={closeSheet} />
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartPanel;
