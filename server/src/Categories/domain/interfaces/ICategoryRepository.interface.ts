import {
  GetAllItemsResult,
  GetAllQueryOptionsBase,
} from "../../../Products/domain/interfaces";
import { Category } from "../entities";

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  update(id: string, category: Category): Promise<Category>;
  delete(id: string): Promise<void>;
  getAll(
    options?: GetAllQueryOptionsBase
  ): Promise<GetAllItemsResult<Category>>;
  getById(categoryId: string): Promise<Category | null>;
  getByName(name: string): Promise<Category | null>;
}
