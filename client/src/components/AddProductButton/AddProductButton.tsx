import { addToCart } from '@/store/states';
import { useAppDispatch } from '@/store/store';
import { CartItem, Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';

interface AddProductButtonProps {
  product: Product
  disabled:boolean
  
}

const AddProductButton = ({product, disabled}: AddProductButtonProps) => {
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
      disabled={isOutOfStock || disabled}
      onClick={() => handleAddToCart(product)}
      
      className="w-full bg-lime-500 hover:bg-lime-600 text-md text-black  h-10 px-12 rounded-none cursor-pointer">
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        Agregar al carrito
      </div>
      
      
    </Button>
  )
}

export default AddProductButton