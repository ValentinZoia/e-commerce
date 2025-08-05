import { ICategoryRepository } from "../../domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";
import { Category } from "../../domain/entities";
import { Service } from "../../../shared/application/base";

export class GetCategoryByIdService extends Service<[string], Category> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(id: string): Promise<Category> {
    const category = await this.categoryRepository.getById(id);
    if (!category || category === null) {
      throw CustomError.notFound(`Categoria con id: ${id} no encontrada`);
    }
    return category;
  }
}
