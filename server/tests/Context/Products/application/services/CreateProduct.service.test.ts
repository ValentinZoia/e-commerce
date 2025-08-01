import { CreateProductService } from "../../../../../src/Products/application/services";
import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import { mockCategoryRepository } from "../../../Categories/__mocks__/repositories/MockCategoryRepository";
import { ValidationError } from "../../../../../src/shared/domain/errors";
import {
  mockValidProductDataRequest,
  mockValidProductDataResponse,
  mockValidProductDataRequestConvertedToProductType,
} from "../../../../helpers/factories/product-mocks";
import { mockCategoryData } from "../../../../helpers/factories/category-mocks";
import { Product } from "../../../../../src/Products/domain/entities";

describe("CreateProductService", () => {
  let createProductService: CreateProductService;
  beforeEach(() => {
    jest.clearAllMocks();
    createProductService = new CreateProductService(
      mockProductRepository,
      mockCategoryRepository
    );
  });

  describe("execute", () => {
    test("should create a product successfully when all validations pass", async () => {
      //Arrange
      mockCategoryRepository.getByName.mockResolvedValue(mockCategoryData);
      mockProductRepository.getByName.mockResolvedValue(null);
      mockProductRepository.create.mockResolvedValue(
        mockValidProductDataResponse
      );

      //Act
      const result = await createProductService.execute(
        mockValidProductDataRequest
      );

      //Assert
      expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
        mockValidProductDataRequest.categoryId
      );
      expect(mockProductRepository.getByName).toHaveBeenCalledWith(
        mockValidProductDataRequest.name
      );
      expect(mockProductRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockValidProductDataRequestConvertedToProductType,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
      expect(result).toEqual(mockValidProductDataResponse);
      // expect(result).toBeInstanceOf(Product);
    });

    test("should throw a ValidationError if category does not exist", async () => {
      //Arrange
      mockCategoryRepository.getByName.mockResolvedValue(null);

      //Act & Assert
      await expect(
        createProductService.execute(mockValidProductDataRequest)
      ).rejects.toThrow(ValidationError);

      expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
        mockValidProductDataRequest.categoryId
      );
      expect(mockProductRepository.getByName).not.toHaveBeenCalled();
      expect(mockProductRepository.create).not.toHaveBeenCalled();
    });

    test("should throw a ValidationError if product name already exists", async () => {
      //Arrange
      mockCategoryRepository.getByName.mockResolvedValue(mockCategoryData);
      mockProductRepository.getByName.mockResolvedValue(
        mockValidProductDataResponse
      );
      //Act & Assert
      await expect(
        createProductService.execute(mockValidProductDataRequest)
      ).rejects.toThrow(ValidationError);

      expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
        mockValidProductDataRequest.categoryId
      );
      expect(mockProductRepository.getByName).toHaveBeenCalledWith(
        mockValidProductDataRequest.name
      );
      expect(mockProductRepository.create).not.toHaveBeenCalled();
    });
  });
});
