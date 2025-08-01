import { PrismaAdminRepositoryImpl } from "../../../../../src/Auth/infrastructure/repositories";

export const mockAdminRepository: jest.Mocked<PrismaAdminRepositoryImpl> = {
  create: jest.fn(),
  findAdminByUsername: jest.fn(),
} as unknown as jest.Mocked<PrismaAdminRepositoryImpl>;
