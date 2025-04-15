import { CartItem } from "@/types"


// Encuentra un ítem en el carrito
export const findCartItem = (items: CartItem[], productId: number) => {
    return items.find(item => item.productId === productId);
};

// Calcula el precio considerando posibles descuentos
export const calculateItemPrice = (product: {
    price: number;
    discount?: number;
}) => {
    return product.discount 
        ? product.price * (1 - product.discount)
        : product.price;
};

// Verifica el stock disponible
export const checkStock = (product: {
    stock: number;
}, desiredQuantity: number) => {
    return product.stock >= desiredQuantity;
};

// Agrega un ítem al estado del carrito
export const addItemToState = (state: { items: CartItem[] }, item: CartItem) => {
    state.items.push({
        productId: item.productId,
        product: item.product,
        quantity: 1,
       
    });
    
};