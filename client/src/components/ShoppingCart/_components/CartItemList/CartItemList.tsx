import { CartItem } from "@/types/cart";
import { CartItemCard } from "../CartItemCard";

interface CartItemsListProps {
  items: CartItem[];
  onRemoveItem: (productId: string, size?: string) => void;
  onRemoveProduct: (productId: string, size?: string) => void;
  onPlusItem: (productId: string, size?: string) => void;
}

function CartItemList({
  items,
  onRemoveItem,
  onRemoveProduct,
  onPlusItem,
}: CartItemsListProps) {
  return (
    <div className="space-y-3 max-h-[300px] overflow-auto">
      {items.map((item) => (
        <CartItemCard
          key={`${item.productId}-${item.size}`}
          item={item}
          removeItem={onRemoveItem}
          removeProduct={onRemoveProduct}
          plusItem={onPlusItem}
        />
      ))}
    </div>
  );
}
export default CartItemList;
