import { Product } from "../../domain/entities/Product";
import prisma from "../database/prismaClient";
import { IProductRepository } from "../../domain/Interfaces/IProductRepository";

export class PrismaProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const createdProduct = await prisma.product.create({
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
    return this.mapPrismaToProduct(createdProduct);
  }

  async update(id: string, product: Product): Promise<Product> {
    const updatedProduct = await prisma.product.update({
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
        where:{id}
      })
  }

  async getAll(options?: {
    category?: string;
    featured?: boolean;
    promotion?: boolean;
    new?: boolean;
    skip?: number;
    take?: number;
  }): Promise<Product[]> {
    const where: any = {};

    if (options?.category) {
      where.categoryId = options.category;
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

    const products = await prisma.product.findMany({
        where,
        take:options?.take,
        skip:options?.skip,
        orderBy: {createdAt: 'desc'},

    });

    return products.map(product => this.mapPrismaToProduct(product));

  }

  async getById(id: string): Promise<Product | null> {
      const product = await prisma.product.findUnique({
        where:{id},
      });
      if(!product) return null;

      return this.mapPrismaToProduct(product);
  }
  async getByName(name: string): Promise<Product | null> {
      const product = await prisma.product.findFirst({
        where:{name},
      });
      if(!product) return null;

      return this.mapPrismaToProduct(product);
  }

  // Mappers para convertir entre modelos de Prisma y dominio
  private mapPrismaToProduct(prismaProduct: any): Product {
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
