import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { AddProductButton } from "@/components";

interface Props {
  product: Product;
}

const ProductSizesHandler = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<number | null>(null);
  const addProductButtonDisabled: boolean =
    (product.sizes ? selectedStock === 0 : false) || !product.sizes
      ? false
      : selectedSize === null;

  return (
    <>
      {product.sizes && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="">
              Talle: <span className="font-medium">{selectedSize}</span>
            </p>
            <p className="">
              Stock del talle:{" "}
              <span className="font-medium">{selectedStock}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size.name}
                variant="outline"
                className={cn(
                  "h-8 w-10 rounded-sm cursor-pointer border-[1px]",
                  selectedSize === size.name
                    ? "bg-gray-300 text-black border-black hover:bg-gray-300"
                    : "bg-white"
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

      {/* Agregar al carrito */}
      <div className="w-full flex items-center gap-4">
        <AddProductButton
          product={product}
          disabled={addProductButtonDisabled}
          size={selectedSize ? selectedSize : undefined}
        />
      </div>
    </>
  );
};

export default ProductSizesHandler;
