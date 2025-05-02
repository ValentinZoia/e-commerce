import { Product, ProductStatus } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/Image";
import { useState } from "react";
import {
  calculateItemCashPrice,
  calculateItemPrice,
} from "@/utilities/cartSlice";
import { Link } from "react-router-dom";

// import { cn } from "@/lib/utils";
// import { calculateItemPrice } from "@/utilities/cartSlice";
// import { Link } from "react-router-dom";
// import { AddProductButton } from "@/components";

interface ProductCardProps {
  product: Product;
  productsStatus?: ProductStatus;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const discountText = product.discountPercentage
    ? `${product.discountPercentage * 100}% OFF`
    : null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(price)
      .replace(",00", ",00");
  };

  const handleMouseEnter = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const renderStockMessage = () => {
    if (!product.stock) return;
    if (product.stock === 1) {
      return (
        <p className="text-amber-600 font-medium text-sm mt-1">
          ¡No te lo pierdas es el último!
        </p>
      );
    } else if (product.stock < 5) {
      return (
        <p className="text-amber-600 font-medium text-sm mt-1">
          ¡Solo quedan {product.stock} en stock!
        </p>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <Link to={`/products/${product.id}`} className="w-full">
      <div
        className="relative aspect-square overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          placeholderSrc="https://placehold.co/300"
          errorSrc="https://placehold.co/300"
          lazy={true}
          aspectRatio={1}
          threshold={0.2}
        />
        {product.discountPercentage && product.discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-emerald-600 hover:bg-emerald-700">
            -{discountText}
          </Badge>
        )}
      </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="text-base font-medium text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-0">
            <span className="text-gray-500 line-through text-sm">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">
                {formatPrice(calculateItemPrice(product))}
              </span>
              <span className="text-md  font-normal text-emerald-600">
                {discountText}
              </span>
            </div>

            {product.installments && product.installments[0] && (
              <p className="text-xs text-gray-600">
                {product.installments[0].quantity} x{" "}
                {formatPrice(product.installments[0].amount)} sin interés
              </p>
            )}
          </div>

          {product.cashDiscountPercentage &&
            product.cashDiscountPercentage > 0 && (
              <p className="text-sm text-emerald-600 font-semibold">
                {formatPrice(calculateItemCashPrice(product))} con Efectivo o
                Transferencia
              </p>
            )}

          {renderStockMessage()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
