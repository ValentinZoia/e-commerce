// import { useLoaderData } from "react-router-dom";

import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { CheckoutForm } from "./_components/CheckoutForm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  plusItemFromCart,
  removeItemFromCart,
  removeProductFromCart,
} from "@/store/states/cart";
import { CartItemList } from "@/components/ShoppingCart/_components";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utilities";

function Checkout() {
  const dispatch = useAppDispatch();
  const { totalItems, totalPrice, items } = useSelector(
    (state: RootState) => state.cart
  );
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
  const isFreeShipping = items.every((item) => item.product?.isFreeShipping);
  return (
    <div className=" bg-white px-4 py-4 w-full h-screen grid grid-cols-1 lg:grid-cols-2 gap-2 ">
      <div className="">
        <h1 className="text-3xl font-bold pb-2">Completa con tus Datos</h1>
        <p className="text-muted-foreground">
          Te enviaremos un mensaje por whatsapp para completar la compra
          personalmente con vos!
        </p>
        <CheckoutForm items={items} total={totalPrice} subtotal={totalPrice} />
      </div>
      <div>
        <Card className="rounded-none">
          <CardHeader className="px-4 md:px-6">
            <CardTitle>Detalles</CardTitle>
            <CardDescription>
              <div>
                {items.length === 0 && "No hay productos en el carrito"}
                <CartItemList
                  items={items}
                  onRemoveItem={removeItem}
                  onRemoveProduct={removeProduct}
                  onPlusItem={plusItem}
                />
              </div>
            </CardDescription>
            <Separator />
            <div className="p-2 flex flex-col gap-2">
              <div className="flex justify-between text-muted-foreground text-sm">
                <span className="text-muted-foreground">TotalItems:</span>
                <span className="">{totalItems}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span className="">Subtotal:</span>
                <span className="">${totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span className="text-muted-foreground">Envío:</span>
                <span className="">
                  {isFreeShipping ? "Gratis" : "No especificado"}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground text-sm">
                <span className="text-muted-foreground">Método de pago:</span>
                <span className="">No especificado</span>
              </div>
            </div>
            <Separator />
            <div>
              <div className="p-2 flex justify-between items-center  text-sm">
                <span className="text-muted-foreground">Total:</span>
                <span className="text-2xl font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
export default Checkout;
