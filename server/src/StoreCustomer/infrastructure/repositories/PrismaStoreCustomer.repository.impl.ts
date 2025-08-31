import { StoreCustomer } from "../../domain/entities";
import { IStoreCustomerRepository } from "../../domain/interfaces";
import { Store as StoreCustomerPrisma } from "../../../generated/prisma";
import prisma from "../../../shared/infrastructure/database/prismaClient";

export class PrismaStoreCustomerRepositoryImpl
  implements IStoreCustomerRepository
{
  async create(storeCustomer: StoreCustomer): Promise<StoreCustomer> {
    const create = await prisma.store.create({
      data: {
        nameStore: storeCustomer.nameStore,
        logo: storeCustomer.logo,
        banners: storeCustomer.banners,
      },
    });
    return this.mapPrismaToStoreCustomer(create);
  }

  async update(
    id: string,
    storeCustomer: StoreCustomer
  ): Promise<StoreCustomer> {
    const update = await prisma.store.update({
      where: { id },
      data: {
        nameStore: storeCustomer.nameStore,
        logo: storeCustomer.logo,
        banners: storeCustomer.banners,
      },
    });
    return this.mapPrismaToStoreCustomer(update);
  }
  async delete(id: string): Promise<void> {
    await prisma.store.delete({
      where: { id },
    });
  }
  async getById(id: string): Promise<StoreCustomer | null> {
    const storeCustomer = await prisma.store.findUnique({
      where: { id },
    });
    if (!storeCustomer) return null;
    return this.mapPrismaToStoreCustomer(storeCustomer);
  }
  async getAll(): Promise<StoreCustomer[]> {
    const storeCustomers = await prisma.store.findMany();
    return storeCustomers.map((storeCustomer) =>
      this.mapPrismaToStoreCustomer(storeCustomer)
    );
  }
  private mapPrismaToStoreCustomer(
    storeCustomer: StoreCustomerPrisma
  ): StoreCustomer {
    return new StoreCustomer(
      storeCustomer.id,
      storeCustomer.nameStore,
      storeCustomer.logo,
      storeCustomer.banners
    );
  }
}
