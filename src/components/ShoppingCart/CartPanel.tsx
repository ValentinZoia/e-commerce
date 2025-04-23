import { useState, useEffect } from "react"
import { ShoppingCart, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"
import { RootState, useAppDispatch } from "@/store/store"
import { useSelector } from "react-redux"
import {CartItem} from '@/types/cart'
import {removeItemFromCart, removeProductFromCart, clearCart} from '@/store/states/cart'
import {CartItemCard} from './_components'

 

const CartPanel = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const dispatch = useAppDispatch();
    const { totalItems, totalPrice, items, loading, error } = useSelector((state:RootState) => state.cart);

    useEffect(() => {
        setCartItems(items);
      }, [items]);
  
    
  //Vaciar carrito
    const emptyCart = () => {
        dispatch(clearCart());
    };

    //remover item individual
    const removeItem = (productId: string) => {
        dispatch(removeItemFromCart(productId));
    };

    //remover item completo
    const removeProduct = (productId: string) => {
        dispatch(removeProductFromCart(productId));
    };


  
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>
  
  return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative cursor-pointer">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Shopping Cart ({totalItems})</h3>
                {cartItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={emptyCart}
                    className="h-8 text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Empty Cart
                  </Button>
                )}
              </div>
    
              {cartItems.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">Your cart is empty</div>
              ) : (
                <>
                  <div className="space-y-3 max-h-[300px] overflow-auto">
                    {cartItems.map((item) => (
                      <CartItemCard key={item.productId} item={item} removeItem={removeItem} removeProduct={removeProduct} />
                    ))}
                  </div>
    
                  <Separator className="my-4" />
    
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${totalPrice.toFixed(0)}</span>
                  </div>
    
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      View Cart
                    </Button>
                    <Button size="sm">Checkout</Button>
                  </div>
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
}

export default CartPanel