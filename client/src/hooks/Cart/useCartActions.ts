import {
  clearCart,
  plusItemFromCart,
  removeItemFromCart,
  removeProductFromCart,
} from "@/store/states";
import { useAppDispatch } from "@/store/store";

export function useCartActions() {
  const dispatch = useAppDispatch();
  //remover item individual
  const removeItem = (productId: string, size?: string) => {
    dispatch(removeItemFromCart({ id: productId, size }));
  };

  //incrementar item individual
  const plusItem = (productId: string, size?: string) => {
    dispatch(plusItemFromCart({ id: productId, size: size }));
  };

  //remover item completo
  const removeProduct = (productId: string, size?: string) => {
    dispatch(removeProductFromCart({ id: productId, size: size }));
  };
  //Vaciar carrito
  const emptyCart = () => {
    dispatch(clearCart());
  };
  return {
    removeItem,
    plusItem,
    removeProduct,
    emptyCart,
  };
}
