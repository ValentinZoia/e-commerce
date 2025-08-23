import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { CartItem } from "@/types/cart";
import {
  removeItemFromCart,
  removeProductFromCart,
  clearCart,
  plusItemFromCart,
} from "@/store/states/cart";
import {
  // CartTriggerButton,
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

  const dispatch = useAppDispatch();
  const { totalItems, totalPrice, items, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  //Vaciar carrito
  const emptyCart = () => {
    dispatch(clearCart());
  };

  //remover item individual
  const removeItem = (productId: string, size?: string) => {
    dispatch(removeItemFromCart({ id: productId, size }));
  };

  //incrementar item individual
  const plusItem = (productId: string, size?: string) => {
    dispatch(plusItemFromCart({ id: productId, size: size }));
  };

  //remover item completo
  const removeProduct = (productId: string, size?: string) => {
    dispatch(removeProductFromCart({ id: productId, size: size }));
  };
  const closeSheet = () => {
    setIsOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const hasItems = cartItems.length > 0;
  return (
    <div className="p-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {/* <CartTriggerButton totalItems={totalItems} totalPrice={totalPrice} /> */}
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
          <CartHeader hasItems={hasItems} onEmptyCart={emptyCart} />

          {!hasItems ? (
            <EmptyCartMessage />
          ) : (
            <>
              <CartItemList
                items={cartItems}
                onRemoveItem={removeItem}
                onRemoveProduct={removeProduct}
                onPlusItem={plusItem}
              />

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
