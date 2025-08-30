import { defaultValues } from "@/lib/zod-schemas/productSchema";
import { DetailOrderProductsCard } from "@/pages/Checkout/_components/DetailOrderProducts";
import { DetailOrderProductsBody } from "@/pages/Checkout/_components/DetailOrderProductsBody";
import { ItemList } from "@/pages/Checkout/_components/ItemList";
import { CartItem } from "@/types";
import { Order, OrderItem } from "@/types/order";
import { DetailCustomerData } from "../DetailCustomerData";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import confetti from "canvas-confetti";
const orderItemToCartItemMap = (item: OrderItem): CartItem => ({
  productId: item.productId,

  quantity: item.quantity,
  size: item.size,
  product: {
    ...defaultValues,
    name: item.productName,
    id: item.productId,
    stock: 0,
    price: item.unitPrice,
    images: [item.imageUrl as string],
    installments: [],
  },
});
function OrderDetailCard({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const items: CartItem[] = order.products.map(orderItemToCartItemMap);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
      confetti();
    }, 500);
  }, []);

  return (
    <div className="bg-white px-4 py-4 w-full h-screen">
      <div className="flex items-center gap-2 py-8">
        <CircleCheck className="text-green-500 size-12" />
        <div className="flex flex-col">
          <span className="text-muted-foreground">#{order.id.slice(0, 7)}</span>
          <h1 className="text-3xl font-bol">
            Gracias para tu compra {order.customerName}
          </h1>
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-2 ">
        <div>
          <DetailOrderProductsCard
            headerTitle="Detalles de la Compra"
            BodyComponent={
              <DetailOrderProductsBody
                totalItems={order.products.length}
                totalPrice={order.total}
                isFreeShipping={order.isFreeShipping}
                paymentMethod={order.paymentMethod}
                initialInstallments={order.installments}
                initialCashDiscoutnt={order.cashDiscountPercentage}
              />
            }
            HeaderComponent={<ItemList items={items} needActions={false} />}
          />
        </div>
        <div>
          <DetailOrderProductsCard
            headerTitle="Detalles del Cliente"
            BodyComponent={<></>}
            HeaderComponent={
              <DetailCustomerData
                customerEmail={order.customerEmail as string}
                customerName={order.customerName}
                customerPhone={order.customerPhone}
              />
            }
          />
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="bg-green-500 text-white 
             data-[state=open]:animate-in 
             data-[state=closed]:animate-out"
          >
            <DialogHeader className="flex justify-center items-center">
              <CircleCheck className="text-white size-16" />
            </DialogHeader>
            <span className="text-center font-bold text-2xl">
              ¡Felicidades! Su orden ha sido confirmada.
            </span>
            <span className="font-light">
              Nos comunicaremos con usted a la brevedad por WhatsApp para
              continuar con la compra.
            </span>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="text-black"
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
export default OrderDetailCard;
