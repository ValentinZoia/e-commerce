import { PrismaCategoryRepositoryImpl } from "../../../../../src/Categories/infrastructure/repositories";

export const mockCategoryRepository: jest.Mocked<PrismaCategoryRepositoryImpl> =
  {
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    getByName: jest.fn(),
  } as unknown as jest.Mocked<PrismaCategoryRepositoryImpl>;
