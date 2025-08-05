import { CategoryDataDto } from "../../../../../src/Categories/domain/dtos";

export const mockCategoryDataDto: jest.Mocked<CategoryDataDto> = {
  create: jest.fn(),
} as unknown as jest.Mocked<CategoryDataDto>;
