import { CartItem } from "@/types/cart";
import { formatPrice } from "@/utilities";

interface CartSummaryProps {
  totalPrice: number;
  items: CartItem[];
}

function CartSummary({ totalPrice, items }: CartSummaryProps) {
  // Obtener el descuento en efectivo del primer producto (asumiendo que es el mismo para todos)
  const cashDiscountPercentage = items[0]?.product?.cashDiscountPercentage || 0;
  const discountedPrice = totalPrice - cashDiscountPercentage * totalPrice;

  return (
    <div className="flex items-start justify-between">
      <span>Total:</span>
      <div className="flex flex-col items-end gap-0">
        <span className="text-lg">{formatPrice(totalPrice)}</span>
        {cashDiscountPercentage > 0 && (
          <p className="text-celeste text-sm font-light">
            <span>O {formatPrice(discountedPrice)} </span>
            <span>con Efectivo o Transferencia</span>
          </p>
        )}
      </div>
    </div>
  );
}
export default CartSummary;
