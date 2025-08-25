import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Product } from "../../domain/entities";
import {
  GetAllItemsResult,
  ProductsGetAllQueryOptions,
  IProductRepository,
} from "../../domain/interfaces";

export class GetAllProductsService extends Service<
  [ProductsGetAllQueryOptions],
  GetAllItemsResult<Product>
> {
  constructor(private readonly productRepository: IProductRepository) {
    super();
  }

  async execute(
    options?: ProductsGetAllQueryOptions
  ): Promise<GetAllItemsResult<Product>> {
    if (options?.take && options.take < 0) {
      throw CustomError.badRequest("El valor de take debe ser mayor a 0");
    }

    if (options?.skip && options.skip < 0) {
      throw CustomError.badRequest("El valor de skip debe ser mayor a 0");
    }

    const products = await this.productRepository.getAll({
      category: options?.category,
      search: options?.search,
      featured: options?.featured,
      promotion: options?.promotion,
      new: options?.new,
      priceMax: options?.priceMax,
      priceMin: options?.priceMin,
      inStock: options?.inStock,
      freeShipping: options?.freeShipping,
      size: options?.size,
      take: options?.take,
      skip: options?.skip,
      sortBy: options?.sortBy,
      sortDir: options?.sortDir,
    });

    return products;
  }
}
