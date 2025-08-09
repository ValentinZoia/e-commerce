import { ICategoryRepository } from "../../../Categories/domain/interfaces";
import { ProductBuilder, Product } from "../../domain/entities";
import { ValidationError } from "../../../shared/domain/errors";
import { IProductRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { CreateProductDto } from "../../domain/dtos";

export class CreateProductService extends Service<[CreateProductDto], Product> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {
    super();
  }

  async execute(data: CreateProductDto): Promise<Product> {
    // 1. verificar que exista la categoria del producto a crear
    const existingCategory = await this.categoryRepository.getByName(
      data.categoryId
    );
    if (!existingCategory)
      throw new ValidationError({
        categoryId: ["La categoría especificada no existe"],
      });

    // 2. Verificar si el nombre del producto ya esta en uso
    const existingProduct = await this.productRepository.getByName(data.name);
    if (existingProduct)
      throw new ValidationError({
        name: ["Ya existe un producto con ese nombre"],
      });

    // 3. Crear el producto
    const newProduct = new ProductBuilder()
      .setId(null)
      .setName(data.name)
      .setDescription(data.description)
      .setPrice(data.price)
      .setDiscountPercentage(data.discountPercentage)
      .setCashPrice(data.cashPrice)
      .setCashDiscountPercentage(data.cashDiscountPercentage)
      .setStock(data.stock)
      .setSizes(data.sizes)
      .setCurrentSize(data.currentSize)
      .setFreeShippingThreshold(data.freeShippingThreshold)
      .setIsFreeShipping(data.isFreeShipping)
      .setIsFeatured(data.isFeatured)
      .setIsPromotion(data.isPromotion)
      .setIsNew(data.isNew)
      .setCategoryId(data.categoryId)
      .setInstallments(data.installments)
      .setImages(data.images)
      .setCreatedAt(new Date())
      .setUpdatedAt(new Date())
      .build();

    return await this.productRepository.create(newProduct);
  }
}
