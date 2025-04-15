import { BaseEntity } from "./baseTypes";
import { Category } from "./category";

export interface Product extends BaseEntity {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    isFeatured?: boolean;
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