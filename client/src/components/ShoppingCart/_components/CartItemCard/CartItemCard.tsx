import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import { Image } from "@/components/Image";
import { formatPrice } from "@/utilities";


interface CartItemProps {
  item: CartItem;
  removeItem: (productId: string) => void;
  removeProduct: (productId: string) => void;
  plusItem: (productId: string) => void;
}

const CartItemCard = ({ item, removeItem, removeProduct, plusItem }: CartItemProps) => {
  const product = item.product;
  if (!product) return null;
  const isDiscount = product.discountPercentage !== undefined && product.discountPercentage > 0;
  return (
    <Card
      key={item.productId}
      className="overflow-hidden border-none shadow-none"
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-3">
          <div
            className={
              "w-20 h-20 border rounded  overflow-hidden"
            }
          >
            <Image
              src={product.images[0]}
              alt={`${product.name}`}
              placeholderSrc="https://placehold.co/80"
              width={80}
              height={80}
              className="object-cover w-full h-full"
              lazy={true}
              aspectRatio={1}
              threshold={0.2}
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col flex-wrap gap-2">
            <p className="text-sm truncate max-w-50">
              {item.product?.name} 
            </p>
            <p className="text-sm truncate">
              {item.size && `(${item.size})`}
            </p>
            <div className="border-[1px] rounded-sm py-0.5 max-w-20 flex items-center justify-between ">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() => removeItem(item.productId)}
              >
                <Minus className="h-3 w-3 font-light text-gray-500" />
              </Button>
              <span>{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() => plusItem(item.productId)}
                
              >
                <Plus className="h-3 w-3 text-gray-500 " />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-destructive"
              onClick={() => removeProduct(item.productId)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove all</span>
            </Button>
            {/* precio normal tachado si hay decuento aparece sino no */}
            {isDiscount && (
              <div className="flex flex-rox gap-1">
                <span className="text-celeste font-semilight text-xs">
                  -{product.discountPercentage && product.discountPercentage * 100}%
                </span>
                <span className="text-gray-500 text-xs line-through">
                  {formatPrice(product.price / (1 - (product.discountPercentage ? product.discountPercentage : 0)))}
                </span>
              </div>
            )}

            {/* precio normal o con descuento fijo */}
            <div className="flex items-center gap-2">
              <span className="text-md ">
              {formatPrice(product.price)}
              </span>

              
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItemCard;
