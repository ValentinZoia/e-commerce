import { Category } from "../../domain/entities/Category";
import { ICategoryRepository } from "../../domain/Interfaces/ICategoryRepository";
import { IValidator } from "../../domain/Interfaces/IValidator";
import { ValidationError } from "../../infrastructure/validators/ValidationError";

export class CategoryService {
  constructor(
    private catetgoryRespository: ICategoryRepository,
    private categoryValidator: IValidator<Category>
  ) {}

  async createCategory(categoryData: unknown): Promise<Category> {
    //Validar datos
    const validatedCategory = await this.categoryValidator.validate(
      categoryData
    );

    //verificar si el nombre de la categoria ya existe
    const existingCategory = await this.catetgoryRespository.getByName(
      validatedCategory.name
    );
    if (existingCategory) {
      const error: Record<string, string[]> = {
        name: ["Ya existe una categoria con ese nombre"],
      };

      throw new ValidationError(error);
    }

    //crear categoria
    return this.catetgoryRespository.create(validatedCategory);
  }

  async updateCategory(id: string, categoryData: unknown): Promise<Category> {
    //verificar que exista esa categoria
    const existingCategory = await this.catetgoryRespository.getById(id);
    if (!existingCategory) {
      throw new Error("Categoria no encontrada");
    }

    //Validar datos
    const validatedCategory = await this.categoryValidator.validate(
      categoryData
    );

    //Verificar si el nombre de esa categoria tmb esta en uso
    const existingCategoryWithSameName =
      await this.catetgoryRespository.getByName(validatedCategory.name);
    if (existingCategoryWithSameName && existingCategory.id !== existingCategoryWithSameName.id) {
      const error: Record<string, string[]> = {
        name: ["Ya existe una categoria con ese nombre"],
      };

      throw new ValidationError(error);
    }

    //Actualizar Categoria
    return this.catetgoryRespository.update(id, validatedCategory);
  }

  async deleteCategory(id: string): Promise<void> {
    //Verificar que exista la categoria a eliminar
    const existingCategory = await this.catetgoryRespository.getById(id);
    if (!existingCategory) {
      throw new Error("Categoria no encontrada");
    }
    return this.catetgoryRespository.delete(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.catetgoryRespository.getAll();
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.catetgoryRespository.getById(id);
    if (!category) {
      throw new Error("Categoria no encontrada");
    }
    return category;
  }

  async getCategoryByName(name: string): Promise<Category> {
    const category = await this.catetgoryRespository.getByName(name);
    if (!category) {
      throw new Error("Categoria no encontrada");
    }
    return category;
  }
}
