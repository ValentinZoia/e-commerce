import { Product } from "../entities";

export interface GetAllQueryOptions {
  category?: string;
  featured?: boolean;
  promotion?: boolean;
  new?: boolean;
  take?: number;
  skip?: number;
}

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Product | null>;
  getByName(name: string): Promise<Product | null>;
  getAll(options?: GetAllQueryOptions): Promise<Product[]>;
}
