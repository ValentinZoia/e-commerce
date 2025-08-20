import prisma from "../../../shared/infrastructure/database/prismaClient";
import { Product as ProductPrisma } from "../../../generated/prisma";
import { Product } from "../../domain/entities";
import {
  GetAllItemsResult,
  ProductsGetAllQueryOptions,
  IProductRepository,
} from "../../domain/interfaces";

export class PrismaProductRepositoryImpl implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const createdProduct: ProductPrisma = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        cashPrice: product.cashPrice,
        cashDiscountPercentage: product.cashDiscountPercentage,
        stock: product.stock,
        sizes: product.sizes,
        currentSize: product.currentSize,
        freeShippingThreshold: product.freeShippingThreshold,
        isFreeShipping: product.isFreeShipping,
        isFeatured: product.isFeatured,
        isPromotion: product.isPromotion,
        isNew: product.isNew,
        categoryId: product.categoryId,
        installments: product.installments,
        images: product.images,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });

    return this.mapPrismaToProduct(createdProduct);
  }

  async update(id: string, product: Product): Promise<Product> {
    const updatedProduct: ProductPrisma = await prisma.product.update({
      where: { id },
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        cashPrice: product.cashPrice,
        cashDiscountPercentage: product.cashDiscountPercentage,
        stock: product.stock,
        sizes: product.sizes,
        currentSize: product.currentSize,
        freeShippingThreshold: product.freeShippingThreshold,
        isFreeShipping: product.isFreeShipping,
        isFeatured: product.isFeatured,
        isPromotion: product.isPromotion,
        isNew: product.isNew,
        categoryId: product.categoryId,
        installments: product.installments,
        images: product.images,
      },
    });

    //VER QUE HACE ESTO
    return this.mapPrismaToProduct(updatedProduct);
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  async getAll(
    options?: ProductsGetAllQueryOptions
  ): Promise<GetAllItemsResult<Product>> {
    const where: any = {};
    const orderBy = options?.sortBy
      ? { [options.sortBy]: options.sortDir || "desc" }
      : { ["createdAt"]: options?.sortDir || "desc" };

    if (options?.category) {
      where.categoryId = options.category;
    }

    if (options?.priceMax !== undefined) {
      where.price = { lte: options.priceMax };
    }

    if (options?.priceMin !== undefined) {
      where.price = { gte: options.priceMin };
    }

    if (options?.inStock !== undefined) {
      where.stock = { gte: options.inStock };
    }

    if (options?.freeShipping !== undefined) {
      where.isFreeShipping = options.freeShipping;
    }

    if (options?.size) {
      where.sizes = { some: { name: options.size } };
    }

    if (options?.featured !== undefined) {
      where.isFeatured = options.featured;
    }

    if (options?.promotion !== undefined) {
      where.isPromotion = options.promotion;
    }

    if (options?.new !== undefined) {
      where.isNew = options.new;
    }

    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: "insensitive" } },
        { description: { contains: options.search, mode: "insensitive" } },
        {
          category: { name: { contains: options.search, mode: "insensitive" } },
        },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: options?.take,
        skip: options?.skip,
        orderBy: orderBy,
        include: { category: true },
      }),
      prisma.product.count({
        where,
      }),
    ]);

    return {
      items: products.map((product) => this.mapPrismaToProduct(product)),
      total,
    };
  }

  async getById(id: string): Promise<Product | null> {
    const product: ProductPrisma | null = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) return null;

    return this.mapPrismaToProduct(product);
  }
  async getByName(name: string): Promise<Product | null> {
    const product: ProductPrisma | null = await prisma.product.findFirst({
      where: { name },
    });
    if (!product) return null;

    return this.mapPrismaToProduct(product);
  }

  // Mappers para convertir entre modelos de Prisma y dominio
  private mapPrismaToProduct(prismaProduct: ProductPrisma): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.description,
      prismaProduct.price,
      prismaProduct.discountPercentage,
      prismaProduct.cashPrice,
      prismaProduct.cashDiscountPercentage,
      prismaProduct.stock,
      prismaProduct.sizes,
      prismaProduct.currentSize,
      prismaProduct.freeShippingThreshold,
      prismaProduct.isFreeShipping,
      prismaProduct.isFeatured,
      prismaProduct.isPromotion,
      prismaProduct.isNew,
      prismaProduct.categoryId,
      prismaProduct.installments,
      prismaProduct.images,
      prismaProduct.createdAt,
      prismaProduct.updatedAt
    );
  }
}
