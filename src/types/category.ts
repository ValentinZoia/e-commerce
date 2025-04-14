import { BaseEntity } from "./baseTypes";
import { Product } from "./product";

export interface Category extends BaseEntity {
    name: string;
    slug: string;
    description?: string;
    products?: Product[];
  }