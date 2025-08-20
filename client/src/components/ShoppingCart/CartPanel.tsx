import { useState, useEffect } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

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
import { CartItemCard } from "./_components";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPrice } from "@/utilities";

const CartPanel = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const plusItem = (productId: string, size?: string) => {
    dispatch(plusItemFromCart({ id: productId, size: size }));
  };

  //remover item completo
  const removeProduct = (productId: string, size?: string) => {
    dispatch(removeProductFromCart({ id: productId, size: size }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) console.log(error);

  return (
    <div className="p-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="relative cursor-pointer hover:bg-transparent"
          >
            <div className="bg-lime-100 rounded-full p-2">
              <ShoppingBag className="h-5 w-5 " />
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
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>Carrito de compras</SheetTitle>

            {cartItems.length >= 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={emptyCart}
                className="h-8 cursor-pointer text-xs text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Vaciar carrito
              </Button>
            )}
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Tu carrito esta vacio
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-[300px] overflow-auto">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={`${item.productId}-${item.size}`}
                    item={item}
                    removeItem={removeItem}
                    removeProduct={removeProduct}
                    plusItem={plusItem}
                  />
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex items-start justify-between">
                <span className="">Total:</span>
                <div className="flex flex-col items-end gap-0">
                  <span className="text-lg">{formatPrice(totalPrice)}</span>
                  {cartItems[0].product?.cashDiscountPercentage &&
                    cartItems[0].product?.cashDiscountPercentage > 0 && (
                      <p className="text-celeste text-sm font-light">
                        <span className=" ">
                          O{" "}
                          {formatPrice(
                            totalPrice -
                              cartItems[0].product?.cashDiscountPercentage *
                                totalPrice
                          )}{" "}
                        </span>
                        <span className="">con Efectivo o Transferencia</span>
                      </p>
                    )}
                </div>
              </div>

              {/* <div className=" w-full flex items-center justify-center"> */}
              <Button
                variant="outline"
                className=" h-12 cursor-pointer text-md bg-addCart hover:bg-addCart/80 font-light"
              >
                Iniciar compra
              </Button>

              {/* </div> */}
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartPanel;
