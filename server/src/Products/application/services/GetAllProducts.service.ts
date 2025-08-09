import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Product } from "../../domain/entities";
import {
  GetAllQueryOptions,
  IProductRepository,
} from "../../domain/interfaces";

export class GetAllProductsService extends Service<
  [GetAllQueryOptions],
  Product[]
> {
  constructor(private readonly productRepository: IProductRepository) {
    super();
  }

  async execute(options?: GetAllQueryOptions): Promise<Product[]> {
    if (options?.take && options.take < 0) {
      throw CustomError.badRequest("El valor de take debe ser mayor a 0");
    }

    if (options?.skip && options.skip < 0) {
      throw CustomError.badRequest("El valor de skip debe ser mayor a 0");
    }

    const products = await this.productRepository.getAll({
      category: options?.category,
      featured: options?.featured,
      promotion: options?.promotion,
      new: options?.new,
      take: options?.take,
      skip: options?.skip,
    });

    return products;
  }
}
