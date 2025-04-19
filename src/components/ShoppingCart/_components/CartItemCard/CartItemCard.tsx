import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/types";
import { Trash2, X } from "lucide-react";


interface CartItemProps {
  item: CartItem;
  removeItem: (productId: number) => void;
  removeProduct: (productId: number) => void;
}


const CartItemCard = ({item, removeItem, removeProduct}: CartItemProps) => {
  return (
    <Card key={item.productId} className="overflow-hidden">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
            <img
              src={item.product?.image || "/placeholder.svg"}
              alt={item.product?.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.product?.name}</p>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  ${item.product?.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  x{item.quantity}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeItem(item.productId)}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove one</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive"
                  onClick={() => removeProduct(item.productId)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove all</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
