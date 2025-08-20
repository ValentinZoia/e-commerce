import { Product, ProductStatus } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  calculateItemCashPrice,
  calculateItemPrice,
} from "@/utilities/cartSlice";
import { formatPrice } from "@/utilities";
import ProductCardImage from "./ProductCardIamge/ProductCardImage";

interface ProductCardProps {
  product: Product;
  productsStatus?: ProductStatus;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isDiscount =
    product.discountPercentage === undefined || product.discountPercentage === 0
      ? false
      : true;
  const isCashDiscount =
    product.cashDiscountPercentage === undefined ||
    product.cashDiscountPercentage === 0
      ? false
      : true;

  const discountText = product.discountPercentage
    ? `${product.discountPercentage * 100}% OFF`
    : null;

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
      <ProductCardImage product={product} discountText={discountText} />
      <CardContent className="px-4 min-h-[180px] flex flex-col">
        <h3 className="text-base font-medium text-gray-800 mb-2">
          {product.name}
        </h3>
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div className=" flex flex-col justify-between items-start gap-0">
            {isDiscount && (
              <span className="text-gray-500 line-through text-sm md:text-md">
                {formatPrice(product.price)}
              </span>
            )}

            <div className="flex items-center gap-2">
              <span className="font-bold text-xl md:text-xl lg:text-xl xl:text-2xl">
                {formatPrice(calculateItemPrice(product))}
              </span>
              <span className="text-md  md:text-md lg:text-xs xl:text-lg font-normal text-celeste">
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

          {isCashDiscount && (
            <p className="text-sm text-celeste font-semibold">
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
