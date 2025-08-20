import prisma from "../../../shared/infrastructure/database/prismaClient";
import { Category as CategoryPrisma } from "../../../generated/prisma";
import { ICategoryRepository } from "../../domain/interfaces";
import { Category } from "../../domain/entities";
import {
  GetAllItemsResult,
  GetAllQueryOptionsBase,
} from "../../../Products/domain/interfaces";

export class PrismaCategoryRepositoryImpl implements ICategoryRepository {
  async create(category: Category): Promise<Category> {
    const createdCategory: CategoryPrisma = await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
    });
    return this.mapPrismaToCategory(createdCategory);
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }

  async update(id: string, category: Category): Promise<Category> {
    const updatedCategory: CategoryPrisma = await prisma.category.update({
      where: { id },
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
    });
    return this.mapPrismaToCategory(updatedCategory);
  }

  async getAll(
    options?: GetAllQueryOptionsBase
  ): Promise<GetAllItemsResult<Category>> {
    const where: any = {};
    const orderBy = options?.sortBy
      ? { [options.sortBy]: options.sortDir || "desc" }
      : { ["createdAt"]: options?.sortDir || "desc" };

    if (options?.search) {
      where.name = { contains: options.search, mode: "insensitive" };
    }

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        take: options?.take,
        skip: options?.skip,
        orderBy: orderBy,
        include: { products: true },
      }),
      prisma.category.count(),
    ]);

    return {
      items: categories.map((category) => this.mapPrismaToCategory(category)),
      total,
    };
  }

  async getById(categoryId: string): Promise<Category | null> {
    const category: CategoryPrisma | null = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) return null;

    return this.mapPrismaToCategory(category);
  }

  async getByName(name: string): Promise<Category | null> {
    const category: CategoryPrisma | null = await prisma.category.findUnique({
      where: { name },
    });
    if (!category) return null;

    return this.mapPrismaToCategory(category);
  }

  // Mappers para convertir entre modelos de Prisma y dominio
  private mapPrismaToCategory(prismaCategory: CategoryPrisma): Category {
    return new Category(
      prismaCategory.id,
      prismaCategory.name,
      prismaCategory.slug,
      prismaCategory.description,
      prismaCategory.createdAt,
      prismaCategory.updatedAt
    );
  }
}
