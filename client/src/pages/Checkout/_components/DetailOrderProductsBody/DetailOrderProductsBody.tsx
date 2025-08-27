import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utilities";
interface DetailOrderProductsBodyProps {
  totalItems: number;
  totalPrice: number;
  isFreeShipping: boolean;
  paymentMethod: string | null;
}

function DetailOrderProductsBody({
  totalItems,
  totalPrice,
  isFreeShipping,
  paymentMethod,
}: DetailOrderProductsBodyProps) {
  return (
    <CardContent>
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
          <span className="">
            {paymentMethod ? paymentMethod : "No especificado"}
          </span>
        </div>
      </div>
      <Separator />
      <div>
        <div className="p-2 flex justify-between items-center  text-sm">
          <span className="text-muted-foreground">Total:</span>
          <span className="text-2xl font-bold">{formatPrice(totalPrice)}</span>
        </div>
      </div>
    </CardContent>
  );
}
export default DetailOrderProductsBody;
