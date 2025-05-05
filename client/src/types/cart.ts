import { Product } from "./product";


export interface CartItem {
    productId: string;
    quantity: number;
    size?: string | null;
    product?: Product; // Populated on client side
  }
  
  export interface CartState  {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    loading: boolean;
    error: string | null;
    _persist?: { // <-- Añade esta propiedad opcional
      version: number;
      rehydrated: boolean;
    };
  } 