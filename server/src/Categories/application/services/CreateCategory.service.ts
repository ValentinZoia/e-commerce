import { ValidationError } from "../../../shared/domain/errors";
import { ICategoryRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { CategoryDataDto } from "../../domain/dtos";
import { Category } from "../../domain/entities";

export class CreateCategoryService extends Service<
  [CategoryDataDto],
  Category
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(data: CategoryDataDto): Promise<Category> {
    //1. Verificar si el nombre ya existe
    const existingCategory = await this.categoryRepository.getByName(data.name);
    if (existingCategory)
      throw new ValidationError({
        name: ["Ya existe una categoria con ese nombre"],
      });
    const newCategory: Category = new Category(
      null, //id
      data.name,
      data.slug,
      data.description
    );

    //3. Crear Categoria
    return await this.categoryRepository.create(newCategory);
  }
}
