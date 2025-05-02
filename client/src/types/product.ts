import { BaseEntity } from "./baseTypes";
import { Category } from "./category";

export interface Product extends BaseEntity {
  
  name: string;
  description?: string ;
  price: number;
  discountPercentage?: number ;
  cashPrice?: number ; // Precio de contado
  cashDiscountPercentage?: number ; // Porcentaje de descuento de contado
  stock?: number;
  sizes?: Sizes[]; // Relación con el modelo Sizes (Talles)
  currentSize?: string ;
  freeShippingThreshold?: number ; // Indica el monto mínimo para envío gratis
  isFreeShipping?: boolean ; // Indica si el producto tiene envío gratis
  isFeatured?: boolean ;
  isPromotion?: boolean ;
  isNew?: boolean ;
  categoryId: string;
  category?: Category[];
  installments?: Installments[];// Relación con el modelo Installments (Cuotas)
  images: string[];
  
  }

 // Tipo para Installments (Cuotas)
export interface Installments  {
  
  quantity: number;
  amount: number;
  
};

// Tipo para Sizes (Talles)
export interface Sizes  {

  name: string;
  stock: number;
 
};

  export interface ProductsState {
    products: Product[];
    featuredProducts: Product[];
    promotionalProducts: Product[];
    newProducts: Product[];
    currentProduct: Product | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    lastFetched: {
      all: number | undefined;
      new: number | undefined;
      featured: number | undefined;
      promotion: number | undefined;
      singleProduct: number | undefined;
    } 
  }

  export enum ProductStatus {
    All = 'all',
    SINGLEPRODUCT = 'singleProduct',
    NEW = 'new',
    FEATURED = 'featured',
    PROMOTION = 'promotion',
  }