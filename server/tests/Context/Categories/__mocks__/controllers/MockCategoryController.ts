import { CategoryController } from "../../../../../src/Categories/presentation/controllers";

export const mockCategoryController: jest.Mocked<CategoryController> = {
  createCategory: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
  getAllCategories: jest.fn(),
  getCategoryById: jest.fn(),
  getCategoryByName: jest.fn(),
} as unknown as jest.Mocked<CategoryController>;
