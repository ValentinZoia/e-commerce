import { Response, Request } from "express";
import { ProductController } from "../../../../../src/Products/presentation/controllers";

export const mockProductController: jest.Mocked<ProductController> = {
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  getProductByName: jest.fn(),
} as unknown as jest.Mocked<ProductController>;
