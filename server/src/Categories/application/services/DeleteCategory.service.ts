

import { CustomError, ValidationError } from "../../../shared/domain/errors";
import { ICategoryRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";

export class DeleteCategoryService extends Service<
  [string],
  void
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(id: string): Promise<void> {
    //Verificar que exista la categoria a eliminar
        const existingCategory = await this.categoryRepository.getById(id);
        if (!existingCategory) {
          throw CustomError.notFound("Categoria a eliminar no encontrada");
        }
        await this.categoryRepository.delete(id);
  }
}
 