import { BaseEntity } from "./baseTypes";
import { Category } from "./category";

export interface Product extends BaseEntity {
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
    category?: Category;
  }