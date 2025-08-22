import { Product, ProductStatus } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  calculateItemCashPrice,
  calculateItemPrice,
} from "@/utilities/cartSlice";
import { formatPrice } from "@/utilities";
import ProductCardImage from "./ProductCardIamge/ProductCardImage";
import { AddProductButton } from "../AddProductButton";
import { Star, Truck } from "lucide-react";
import { renderStockMessage } from "./RenderStockMessage";

interface ProductCardProps {
  product: Product;
  productsStatus?: ProductStatus;
  isForCarousel?: boolean;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isDiscount =
    product.discountPercentage === null || product.discountPercentage === 0
      ? false
      : true;
  const isCashDiscount =
    product.cashDiscountPercentage === null ||
    product.cashDiscountPercentage === 0
      ? false
      : true;

  const discountText = product.discountPercentage
    ? `${product.discountPercentage * 100}% OFF`
    : null;

  return (
    <Card
      className={`group h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-[1.02] bg-white overflow-hidden flex flex-col`}
    >
      <div className="relative flex-shrink-0">
        <ProductCardImage product={product} discountText={discountText} />
      </div>

      <CardContent className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">(4.2)</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(calculateItemPrice(product))}
              </span>
              {isDiscount && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {product.installments && product.installments[0] && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                <p className="text-xs text-green-700 font-meduim">
                  💳 {product.installments[0].quantity} cuotas de
                  {formatPrice(product.installments[0].amount)} sin interés
                </p>
              </div>
            )}

            {isCashDiscount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <p className="text-sm text-blue-700 font-semibold">
                  💰 Efectivo : {formatPrice(calculateItemCashPrice(product))}
                </p>
                <p className="text-xs text-blue-600">
                  Ahorrás{" "}
                  {formatPrice(
                    calculateItemPrice(product) -
                      calculateItemCashPrice(product)
                  )}
                </p>
              </div>
            )}
          </div>
          {product.isFreeShipping && (
            <div className="flex items-center gap-1 text-green-600">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-medium">Envío gratis</span>
            </div>
          )}
          {renderStockMessage(product)}
        </div>

        <div className="pt-2">
          <AddProductButton product={product} disabled={false} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
