import { CategoryDataDto } from "../dtos";
import { Category } from "../entities";

export interface ICategoryRepository {
    create(category:CategoryDataDto): Promise<Category>;
    update(id:string, category:CategoryDataDto): Promise<Category>;
    delete(id:string): Promise<void>;
    getAll(): Promise<Category[]>;
    getById(categoryId:string): Promise<Category | null>;
    getByName(name:string): Promise<Category | null>;
}