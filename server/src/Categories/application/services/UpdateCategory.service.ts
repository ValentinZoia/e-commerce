import { CustomError, ValidationError } from "../../../shared/domain/errors";
import { ICategoryRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { CategoryDataDto } from "../../domain/dtos";
import { Category } from "../../domain/entities";

export class UpdateCategoryService extends Service<
  [string, CategoryDataDto],
  Category
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(id: string, data: CategoryDataDto): Promise<Category> {
    //1. Verificar que exista esa categoria a actualizar
    const existingCategory = await this.categoryRepository.getById(id);
    if (!existingCategory)
      throw CustomError.notFound("Categoria a actualizar no encontrada");

    //2. Verificar si el nombre de esa categoria tmb esta en uso
    const existingCategoryWithSameName =
      await this.categoryRepository.getByName(data.name);
    if (
      existingCategoryWithSameName &&
      existingCategory.id !== existingCategoryWithSameName.id
    ) {
      throw new ValidationError({
        name: ["Ya existe una categoria con ese nombre"],
      });
    }
    const updatedCategory = new Category(
      id,
      data.name,
      data.slug,
      data.description
    );

    //3. Actualizar Categoria
    return await this.categoryRepository.update(id, updatedCategory);
  }
}
