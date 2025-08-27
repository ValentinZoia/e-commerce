import { CartItemList } from "@/components/ShoppingCart/_components/CartItemList";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types";

interface DetailOrderProductsHeaderProps {
  items: CartItem[];
  needActions?: boolean;
}

function DetailOrderProductsHeader({
  items,
  needActions,
}: DetailOrderProductsHeaderProps) {
  return (
    <CardHeader className="px-4 md:px-6">
      <CardTitle>Detalles</CardTitle>
      <CardDescription>
        <div>
          {items.length === 0 && "No hay productos en el carrito"}
          <CartItemList items={items} needActions={needActions} />
        </div>
      </CardDescription>
    </CardHeader>
  );
}
export default DetailOrderProductsHeader;
