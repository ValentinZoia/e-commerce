import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { AddProductButton } from "@/components";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { findCartItem } from "@/utilities/cartSlice";
import { Check } from "lucide-react";

interface Props {
  product: Product;
  isForProductCard?: boolean;
}

const ProductSizesHandler = ({ product, isForProductCard = false }: Props) => {
  const SelectedSizeDefault = (product: Product): string | null => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes[0].name;
    }
    return null;
  };
  const SelectedStockDefault = (product: Product): number | null => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes[0].stock;
    }
    return null;
  };

  const [selectedSize, setSelectedSize] = useState<string | null>(
    SelectedSizeDefault(product)
  );
  const [selectedStock, setSelectedStock] = useState<number | null>(
    SelectedStockDefault(product)
  );
  const addProductButtonDisabled: boolean =
    product.sizes && product.sizes.length > 0 ? selectedStock === null : false;

  const { items } = useSelector((state: RootState) => state.cart);
  const existingItem = findCartItem(items, product.id, selectedSize as string);

  return (
    <div className="flex flex-col gap-4">
      {product.sizes && product.sizes.length > 0 && (
        <div className="space-y-2">
          {!isForProductCard && (
            <div className="flex items-center gap-2 flex-wrap">
              <p className="">
                Talle: <span className="font-medium">{selectedSize}</span>
              </p>
              <p className="">
                Stock del talle:{" "}
                <span className="font-medium">{selectedStock}</span>
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size.name}
                variant="outline"
                className={cn(
                  " rounded-none cursor-pointer border-[1px]",
                  selectedSize === size.name
                    ? "bg-gray-300 text-black border-black hover:bg-gray-300"
                    : "bg-white",
                  isForProductCard ? "h-6 w-4 text-sm" : "h-8 w-10"
                )}
                onClick={() => {
                  setSelectedSize(size.name);
                  setSelectedStock(size.stock);
                }}
                disabled={size.stock === 0}
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="h-[15px]">
        {existingItem && (
          <div className="flex items-center gap-2 transition-all duration-300 ease-in-out transform opacity-0  animate-fade-in">
            <Check className="size-3 text-green-500" />
            <span className="text-sm text-gray-400 ">
              Ya agregaste este producto
            </span>
          </div>
        )}
      </div>
      {/* Agregar al carrito */}
      <div className="w-full flex items-center gap-4">
        <AddProductButton
          product={product}
          disabled={addProductButtonDisabled}
          size={selectedSize ? selectedSize : undefined}
        />
      </div>
    </div>
  );
};

export default ProductSizesHandler;
