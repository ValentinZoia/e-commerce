import { PrismaProductRepositoryImpl } from "../../../../../src/Products/infrastructure/repositories";

export const mockProductRepository: jest.Mocked<PrismaProductRepositoryImpl> = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  getByName: jest.fn(),
  mapPrismaToProduct: jest.fn(),
} as unknown as jest.Mocked<PrismaProductRepositoryImpl>;
