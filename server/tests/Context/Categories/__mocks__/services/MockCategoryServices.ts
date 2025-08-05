import {
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
  GetAllCategoriesService,
  GetCategoryByIdService,
  GetCategoryByNameService,
} from "../../../../../src/Categories/application/services";

export const mockCreateCategoryService: jest.Mocked<CreateCategoryService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<CreateCategoryService>;

export const mockUpdateCategoryService: jest.Mocked<UpdateCategoryService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<UpdateCategoryService>;

export const mockDeleteCategoryService: jest.Mocked<DeleteCategoryService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<DeleteCategoryService>;

export const mockGetAllCategoriesService: jest.Mocked<GetAllCategoriesService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetAllCategoriesService>;

export const mockGetCategoryByIdService: jest.Mocked<GetCategoryByIdService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<GetCategoryByIdService>;

export const mockGetCategoryByNameService: jest.Mocked<GetCategoryByNameService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetCategoryByNameService>;
