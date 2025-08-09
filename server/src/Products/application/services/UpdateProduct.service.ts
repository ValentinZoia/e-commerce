import { CustomError, ValidationError } from "../../../shared/domain/errors";
import { ICategoryRepository } from "../../../Categories/domain/interfaces";
import { ProductBuilder, Product } from "../../domain/entities";
import { IProductRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { CreateProductDto } from "../../domain/dtos";

export class UpdateProductService extends Service<
  [string, CreateProductDto],
  Product
> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository
  ) {
    super();
  }

  async execute(id: string, data: CreateProductDto): Promise<Product> {
    // 2. Verificar que exista el producto a actualizar
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct)
      throw CustomError.notFound("Producto a actualizar no encontrado");

    // 2. Verificar que exista la categoria del producto a crear
    const existingCategory = await this.categoryRepository.getByName(
      data.categoryId
    );
    if (!existingCategory)
      throw new ValidationError({
        categoryId: ["La categoría especificada no existe"],
      });

    //3. Verificar si el nombre ya existe en otro producto
    const productWithSameName = await this.productRepository.getByName(
      data.name
    );
    if (productWithSameName && existingProduct.id !== productWithSameName.id)
      throw new ValidationError({
        name: ["Ya existe un producto con ese nombre"],
      });

    //4. Actualizar producto
    const newUpdatedProduct = new ProductBuilder()
      .setId(null) //esto es intencional. En la db no se actualiza a null, sino que mantiene el id.
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
      .setUpdatedAt(new Date())
      .build();

    return await this.productRepository.update(id, newUpdatedProduct);
  }
}
