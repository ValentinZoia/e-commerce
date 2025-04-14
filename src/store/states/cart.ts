import {CartItem, CartState } from "@/types"
import { findCartItem, calculateItemPrice, checkStock, addItemToState} from "@/utilities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"




const initialState: CartState={
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error:  null,
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartItem>) =>{
            const item = action.payload;

            // Validaciones de seguridad
            if(!item?.product) {
                state.error = "Producto no valido";
                return;
            };

            if(item.product.stock <= 0){
                state.error = "Producto sin stock";
                return;
            }

            const existingItem = findCartItem(state.items, item.product.id);

            const itemPrice = calculateItemPrice(item.product);
            if(existingItem){
                //verificar stock antes de incrementar
                if(!checkStock(item.product, existingItem.quantity + 1)){
                    state.error = "No hay suficiente stock";
                    return;
                }
                existingItem.quantity += 1;
                
            }else{
                addItemToState(state, item);
            }
            state.totalItems += 1;
            state.totalPrice += itemPrice * item.quantity;// a revisar
            state.loading = false;
            state.error = null;
        },

        removeFromCart:(state, action: PayloadAction<number>)=>{
            const productId = action.payload;

            const existingItem = findCartItem(state.items, productId);

            if(!existingItem){
                state.error = "Producto no encontrado";
                return;
            }
            if (existingItem.quantity > 1) {
                // Si hay más de 1, reducimos la cantidad
                existingItem.quantity -= 1;
                state.totalItems -= 1;
                
              } else {
                // Si solo queda 1, lo eliminamos completamente
                state.totalItems -= 1;
                state.totalPrice -= existingItem?.product ? existingItem.product.price : 0; 
                state.items = state.items.filter(item => item.productId !== productId);
              }


        },

        clearCart:(state)=>{
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
            state.loading = false;
            state.error = null;
        },
    }
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;