import { addToCart } from '@/store/states';
import { useAppDispatch } from '@/store/store';
import { CartItem, Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';

interface AddProductButtonProps {
  product: Product
  disabled:boolean
  size?:string
  
}

const AddProductButton = ({product, disabled, size}: AddProductButtonProps) => {
  const dispatch = useAppDispatch();
  
    //Agregamos al carrito
    const handleAddToCart = (product: Product) => {
      
      const data: CartItem = {
        productId: product.id,
        quantity: 1,
        product,
        size
      };
  
      dispatch(addToCart(data));
    };
  
    const isOutOfStock = product.stock === 0;
    return (
      <Button 
      disabled={isOutOfStock || disabled}
      onClick={() => handleAddToCart(product)}
      
      className="w-full bg-addCart hover:bg-addCart/80 text-md text-black font-light  h-10 px-12 rounded-none cursor-pointer">
      <div className="flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        Agregar al carrito
      </div>
      
      
    </Button>
  )
}

export default AddProductButton