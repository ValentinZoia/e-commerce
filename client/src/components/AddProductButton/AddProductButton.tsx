import { addToCart } from "@/store/states";
import { useAppDispatch } from "@/store/store";
import { CartItem, Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface AddProductButtonProps {
  product: Product;
  disabled: boolean;
  size?: string;
}

const AddProductButton = ({
  product,
  disabled,
  size,
}: AddProductButtonProps) => {
  const dispatch = useAppDispatch();

  //Agregamos al carrito
  const handleAddToCart = (product: Product) => {
    const data: CartItem = {
      productId: product.id,
      quantity: 1,
      product,
      size,
    };

    dispatch(addToCart(data));
  };

  const isOutOfStock = product.stock === 0;
  return (
    <Button
      disabled={isOutOfStock || disabled}
      onClick={() => handleAddToCart(product)}
      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Agregar al carrito
      </div>
    </Button>
  );
};

export default AddProductButton;
