import {CartItem, CartState, Product } from "@/types"
import { findCartItem, calculateItemPrice, checkStock, addItemToState} from "@/utilities/cartSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"




const initialState: CartState={
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error:  null,
}



export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action: PayloadAction<CartItem>) =>{
            const item = action.payload;

            // Validaciones de seguridad
            //verificamos que exita el producto
            if(!item?.product) {
                state.error = "Producto no valido";
                return;
            };
            //verificamos que haya stock
            if(item.product.stock <= 0){
                state.error = "Producto sin stock";
                return;
            }
            //preguntamos si el producto ya esta en el carrito o es nuevo
            const existingItem = findCartItem(state.items, item.product.id);

            const itemPrice = calculateItemPrice(item.product);
            if(existingItem){
                //verificar stock antes de incrementar
                if(!checkStock(item.product, existingItem.quantity + 1)){
                    state.error = "No hay suficiente stock";
                    return;
                }
                //si el producto ya esta en el carrito, incrementamos la cantidad
                existingItem.quantity += 1;
                
            }else{
                //si el producto no esta en el carrito, lo agregamos
                
                const newProduct: Product = {...item.product , price: itemPrice};
                const itemData: CartItem = {...item, product: newProduct,size:item.size};
                
                addItemToState(state, itemData);
            }

            state.totalItems += 1;
            state.totalPrice += itemPrice * item.quantity;
            state.loading = false;
            state.error = null;
            
        },

        removeItemFromCart:(state, action: PayloadAction<string>)=>{
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
                state.totalPrice -= existingItem?.product ? existingItem.product.price : 0;
                
              } else {
                // Si solo queda 1, lo eliminamos completamente
                state.totalItems -= 1;
                state.totalPrice -= existingItem?.product ? existingItem.product.price : 0; 
                state.items = state.items.filter(item => item.productId !== productId);
              }


        },
        plusItemFromCart:(state, action: PayloadAction<string>)=>{
            const productId = action.payload;

            //verificar si existe el producto en el carrito
            const existingItem = findCartItem(state.items, productId);
            if(!existingItem || !existingItem.product){
                state.error = "Producto no encontrado";
                return;
            };

            //verificar el stock antes de incrementar
            if(!checkStock(existingItem.product, existingItem.quantity + 1)){
                state.error = "No hay suficiente stock";
                return;
            }
            //si el producto ya esta en el carrito, incrementamos la cantidad
            existingItem.quantity += 1;
            state.totalItems += 1;
            state.totalPrice += existingItem?.product ? existingItem.product.price : 0;
            state.loading = false;
            state.error = null;
        

        },
        //remover producto completo del carrito

        removeProductFromCart:(state, action: PayloadAction<string>)=>{
            const productId = action.payload;

            const existingItem = findCartItem(state.items, productId);

            if(!existingItem){
                state.error = "Producto no encontrado";
                return;
            }

            state.totalItems -= existingItem.quantity;
            state.totalPrice -= existingItem?.product ? existingItem.product.price * existingItem.quantity :0;
            state.items = state.items.filter(item => item.productId !== productId);
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

export const {addToCart, removeItemFromCart, removeProductFromCart, clearCart, plusItemFromCart} = cartSlice.actions;

export default cartSlice.reducer;