import { CartItem, Product } from "@/types"


// Encuentra un ítem en el carrito
export const findCartItem = (items: CartItem[], productId: string) => {
    return items.find(item => item.productId === productId);
};

// Calcula el precio considerando posibles descuentos
export const calculateItemPrice = (product: Product) => {
    return product.discountPercentage 
        ? product.price * (1 - product.discountPercentage)
        : product.price;
};

export const calculateItemCashPrice = (product: Product) => {
    const newPrice =calculateItemPrice(product); // Llama a la función para calcular el precio con descuento
    return product.cashDiscountPercentage 
        ? newPrice * (1 - product.cashDiscountPercentage)
        : newPrice;
}

// Verifica el stock disponible
export const checkStock = (product: Product, desiredQuantity: number) => {
    if(product.stock === undefined) return false; // Si no hay stock definido, no se puede verificar
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