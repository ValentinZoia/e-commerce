import { CreateProductDto } from "../../../../../src/Products/domain/dtos";
export const mockCreateProductDto: jest.Mocked<CreateProductDto> = {
  create: jest.fn(),
} as unknown as jest.Mocked<CreateProductDto>;
