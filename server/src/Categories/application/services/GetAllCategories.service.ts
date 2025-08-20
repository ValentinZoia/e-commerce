import { ICategoryRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { Category } from "../../domain/entities";
import {
  GetAllItemsResult,
  GetAllQueryOptionsBase,
} from "../../../Products/domain/interfaces";
import { CustomError } from "../../../shared/domain/errors";

export class GetAllCategoriesService extends Service<
  [GetAllQueryOptionsBase],
  GetAllItemsResult<Category>
> {
  constructor(private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  async execute(
    options?: GetAllQueryOptionsBase
  ): Promise<GetAllItemsResult<Category>> {
    if (options?.take && options.take < 0) {
      throw CustomError.badRequest("El valor de take debe ser mayor a 0");
    }

    if (options?.skip && options.skip < 0) {
      throw CustomError.badRequest("El valor de skip debe ser mayor a 0");
    }

    const categories = await this.categoryRepository.getAll({
      take: options?.take,
      skip: options?.skip,
      sortBy: options?.sortBy,
      sortDir: options?.sortDir,
      search: options?.search,
    });

    return categories;
  }
}
