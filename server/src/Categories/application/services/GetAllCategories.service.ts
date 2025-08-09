import { ICategoryRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { Category } from "../../domain/entities";

export class GetAllCategoriesService extends Service<[null], Category[]> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}
