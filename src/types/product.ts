import { BaseEntity } from "./baseTypes";
import { Category } from "./category";

export interface Product extends BaseEntity {
    name: string;
    description?: string;
    price: number;
    discount?: number; //must be a number between 0 and 1
    stock: number;
    image: string;
    isFeatured?: boolean;
    isNew?: boolean;
    isPromotion?: boolean;
    categoryId: string;
    category?: Category;
  }

  export interface ProductsState {
    products: Product[];
    featuredProducts: Product[];
    currentProduct: Product | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export enum ProductStatus {
    NEW = 'new',
    FEATURED = 'featured',
    PROMOTION = 'promotion',
  }