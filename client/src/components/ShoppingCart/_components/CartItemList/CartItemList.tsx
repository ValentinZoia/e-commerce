import { CartItem } from "@/types/cart";
import { CartItemCard } from "../CartItemCard";

interface CartItemsListProps {
  items: CartItem[];
  needActions?: boolean;
}

function CartItemList({ items, needActions }: CartItemsListProps) {
  return (
    <div className="space-y-3 max-h-[300px] overflow-auto">
      {items.map((item) => (
        <CartItemCard
          key={`${item.productId}-${item.size}`}
          item={item}
          needActions={needActions}
        />
      ))}
    </div>
  );
}
export default CartItemList;
