import { Category } from "../entities";

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  update(id: string, category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Category[]>;
  getById(categoryId: string): Promise<Category | null>;
  getByName(name: string): Promise<Category | null>;
}
