import { ICategoryRepository } from "../../domain/interfaces";
import prisma from "../../../shared/infrastructure/database/prismaClient";

import { Category } from "../../domain/entities";
import { Category as CategoryPrisma } from "../../../generated/prisma";

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

  async getAll(): Promise<Category[]> {
    const categories: CategoryPrisma[] = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories.map((category) => this.mapPrismaToCategory(category));
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
