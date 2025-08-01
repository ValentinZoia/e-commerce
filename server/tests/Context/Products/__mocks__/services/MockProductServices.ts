import {
  CreateProductService,
  UpdateProductService,
  DeleteProductService,
  GetAllProductsService,
  GetProductByIdService,
  GetProductByNameService,
} from "../../../../../src/Products/application/services";

export const mockCreateProductService: jest.Mocked<CreateProductService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<CreateProductService>;

export const mockUpdateProductService: jest.Mocked<UpdateProductService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<UpdateProductService>;

export const mockDeleteProductService: jest.Mocked<DeleteProductService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<DeleteProductService>;

export const mockGetAllProductsService: jest.Mocked<GetAllProductsService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<GetAllProductsService>;

export const mockGetProductByIdService: jest.Mocked<GetProductByIdService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<GetProductByIdService>;

export const mockGetProductByNameService: jest.Mocked<GetProductByNameService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetProductByNameService>;
