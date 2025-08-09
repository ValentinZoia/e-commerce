import { PrismaOrderRepositoryImpl } from "../../../../../src/Orders/infrastructure/repositories/PrismaOrder.repository.impl";

export const mockOrderRepository: jest.Mocked<PrismaOrderRepositoryImpl> = {
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  findByCustomerPhone: jest.fn(),
  findByCustomerEmail: jest.fn(),
  findByCustomerName: jest.fn(),
  findByProductId: jest.fn(),
  findByStatus: jest.fn(),
} as unknown as jest.Mocked<PrismaOrderRepositoryImpl>;
