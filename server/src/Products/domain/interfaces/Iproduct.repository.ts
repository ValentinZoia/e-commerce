import { Product } from "../entities";

export type SortDir = "asc" | "desc";

export interface GetAllQueryOptionsBase {
  take?: number;
  skip?: number;
  sortBy?: keyof Product | string;
  sortDir?: SortDir;
  search?: string;
}

export interface ProductsGetAllQueryOptions extends GetAllQueryOptionsBase {
  category?: string;
  featured?: boolean;
  promotion?: boolean;
  new?: boolean;
  priceMax?: number;
  priceMin?: number;
  inStock?: boolean;
  freeShipping?: boolean;
  size?: string;
}

export interface GetAllItemsResult<T> {
  items: T[];
  total: number;
}

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Product | null>;
  getByName(name: string): Promise<Product | null>;
  getAll(
    options?: ProductsGetAllQueryOptions
  ): Promise<GetAllItemsResult<Product>>;
}
