import { BaseEntity } from "./shared";
import { Category } from "./category";
import { GetItemParamsBase } from "./shared";

export interface Product extends BaseEntity {
    name: string;
    description: string;
    price: number;
    discountPercentage: number | null;
    cashPrice: number | null; // Precio de contado
    cashDiscountPercentage: number | null; // Porcentaje de descuento de contado
    stock: number;
    sizes: Size[] | []; // Relación con el modelo Sizes (Talles)
    currentSize: string | null;
    freeShippingThreshold: number | null; // Indica el monto mínimo para envío gratis
    isFreeShipping: boolean; // Indica si el producto tiene envío gratis
    isFeatured: boolean;
    isPromotion: boolean;
    isNew: boolean;
    categoryId: string;
    category?: Category[];
    installments: Installment[] | []; // Relación con el modelo Installments (Cuotas)
    images: string[];
}

// Tipo para Installments (Cuotas)
export interface Installment {
    quantity: number | null;
    amount: number | null;
}

// Tipo para Sizes (Talles)
export interface Size {
    name: string;
    stock: number;
}

export interface ProductsState {
    products: Product[];
    featuredProducts: Product[];
    promotionalProducts: Product[];
    newProducts: Product[];
    categoryProducts: Product[];
    currentProduct: Product | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    lastFetched: {
        all: number | undefined;
        new: number | undefined;
        featured: number | undefined;
        promotion: number | undefined;
        singleProduct: number | undefined;
        forCategory: number | undefined;
    };
}

export enum ProductStatus {
    All = "all",
    SINGLEPRODUCT = "singleProduct",
    NEW = "new",
    FEATURED = "featured",
    PROMOTION = "promotion",
    FORCATEGORY = "forCategory",
}

export interface GetProductsParams extends GetItemParamsBase<Product> {
    category?: string;
    featured?: boolean;
    promotion?: boolean;
    new?: boolean;
    priceMin?: number;
    priceMax?: number;
    inStock?: boolean;
    freeShipping?: boolean;
    size?: string;
}
