import { CartItem, Product, ProductStatus } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/Image";

import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/store/states/cart";
import { cn } from "@/lib/utils";
import { calculateItemPrice } from "@/utilities/cartSlice";

interface ProductCardProps {
  product: Product;
  productsStatus: ProductStatus;
}

const ProductCard = ({ product, productsStatus }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  //Agregamos al carrito
  const handleAddToCart = (product: Product) => {
    const data: CartItem = {
      productId: product.id,
      quantity: 1,
      product,
    };

    dispatch(addToCart(data));
  };

  const isLowStock = product.stock <= 5 && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  const discountPorcentage = product?.discount ? product.discount * 100 : 0;
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        {((productsStatus === ProductStatus.PROMOTION && product.isPromotion) ||
          (productsStatus === ProductStatus.NEW && product.isNew)) && (
          <Badge
            className={cn("absolute top-2 right-2 z-10", {
              "bg-red-500 hover:bg-red-600":
                productsStatus === ProductStatus.PROMOTION,
              "bg-green-500 hover:bg-green-600":
                productsStatus === ProductStatus.NEW,
            })}
          >
            {productsStatus === ProductStatus.PROMOTION &&
              `-${discountPorcentage}%`}
            {productsStatus === ProductStatus.NEW && "Nuevo"}
          </Badge>
        )}
        <Image
          src={product.image}
          alt={product.name}
          placeholderSrc="https://placehold.co/300"
          errorSrc="https://placehold.co/300"
          lazy={true}
          aspectRatio={1}
          className="object-cover transition-transform hover:scale-105"
          threshold={0.2}
        />

        
      </div>
      <CardHeader className="px-4">
        <div className="flex flex-col items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1 text-lg">
              {product.name}
            </CardTitle>
            {product.category && (
              <CardDescription className="text-xs text-muted-foreground">
                {product.category.name}
              </CardDescription>
            )}
          </div>
          <div className="text-right flex items-center gap-2 mt-2">
            <span className={cn("font-bold" ,{
                "text-red-500":
                productsStatus === ProductStatus.PROMOTION,
            })}>
              ${calculateItemPrice(product).toFixed(2)}

            </span>
            {productsStatus === ProductStatus.PROMOTION && (
              <span className="text-sm text-muted-foreground line-through">${product.price}</span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardFooter className="flex flex-wrap gap-2 items-center justify-between px-4 pt-0">
        <div>
          {isOutOfStock ? (
            <Badge variant="destructive">Out of stock</Badge>
          ) : isLowStock ? (
            <Badge
              variant="outline"
              className="text-amber-500 border-amber-500"
            >
              Low stock: {product.stock} left
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="text-emerald-500 border-emerald-500"
            >
              In stock: {product.stock}
            </Badge>
          )}
        </div>
        <Button
          onClick={() => handleAddToCart(product)}
          disabled={isOutOfStock}
          size="sm"
          className="gap-1 cursor-pointer"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
