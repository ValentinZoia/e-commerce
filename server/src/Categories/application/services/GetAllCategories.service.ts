import { ICategoryRepository } from "../../domain/interfaces";
import { Category } from "../../domain/entities";
import { Service } from "../../../shared/application/base";

export class GetAllCategoriesService extends Service<
  [null],
  Category[]
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(): Promise<Category[]> {
     return await this.categoryRepository.getAll();
  }
}
