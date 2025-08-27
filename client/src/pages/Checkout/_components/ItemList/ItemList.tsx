import { CartItemList } from "@/components/ShoppingCart/_components";
import { CartItem } from "@/types";
interface ItemListProps {
  items: CartItem[];
  needActions?: boolean;
}

function ItemList({ items, needActions }: ItemListProps) {
  return (
    <div>
      {items.length === 0 && "No hay productos en el carrito"}
      <CartItemList items={items} needActions={needActions} />
    </div>
  );
}
export default ItemList;
