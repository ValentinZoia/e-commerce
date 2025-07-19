import { ICategoryRepository } from "../../domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";
import { Category } from "../../domain/entities";
import { Service } from "../../../shared/application/base";

export class GetCategoryByNameService extends Service<[string], Category> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(name: string): Promise<Category> {
    const category = await this.categoryRepository.getByName(name);
    if (!category) {
      throw CustomError.notFound(`Categoria con name: ${name} no encontrada`);
    }
    return category;
  }
}
