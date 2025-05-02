import { addToCart } from '@/store/states';
import { useAppDispatch } from '@/store/store';
import { CartItem, Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';

interface AddProductButtonProps {
  product: Product
  size?: "sm" | "lg" | "xl"| "default" | "icon" | null | undefined
}

const AddProductButton = ({product, size}: AddProductButtonProps) => {
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
  
    const isOutOfStock = product.stock === 0;
    return (
    <Button
          onClick={() => handleAddToCart(product)}
          disabled={isOutOfStock}
          size={size || "sm"}
          className= {`gap-1 cursor-pointer ${size == "xl" && "text-md"}`}
          type="button"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
  )
}

export default AddProductButton