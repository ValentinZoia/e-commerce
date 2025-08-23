import { BaseEntity } from "./shared";
import { Product } from "./product";

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description: string | null;
  products: Product[] | null;
}

export interface CategoriesState {
  categories: Category[];
  currentCategory: Category | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastFetched: {
    all: number | undefined;

    singleCategory: number | undefined;
  };
}

export enum CategoryStatus {
  All = "all",
  SINGLECATEGORY = "singleCategory",
}
