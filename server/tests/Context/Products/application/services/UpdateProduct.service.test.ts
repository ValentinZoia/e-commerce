import { UpdateProductService } from "../../../../../src/Products/application/services";
import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import { mockCategoryRepository } from "../../../Categories/__mocks__/repositories/MockCategoryRepository";
import {
  CustomError,
  ValidationError,
} from "../../../../../src/shared/domain/errors";
import {
  mockValidProductDataRequest,
  mockValidProductDataResponse,
  mockValidProductDataResponseV2,
  mockValidProductDataRequestConvertedToProductType,
} from "../../../../helpers/factories/product-mocks";
import { Product } from "../../../../../src/Products/domain/entities";
import { mockValidCategoryDataResponse } from "../../../../helpers/factories/category-mocks";

describe("UpdateProductService - Unit Test", () => {
  let updateProductService: UpdateProductService;

  beforeEach(() => {
    jest.clearAllMocks();
    updateProductService = new UpdateProductService(
      mockProductRepository,
      mockCategoryRepository
    );
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should update a product successfully when all validations pass", async () => {
        //Arrange
        mockProductRepository.getById.mockResolvedValue(
          mockValidProductDataResponse
        );
        mockCategoryRepository.getByName.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        mockProductRepository.getByName.mockResolvedValue(null);
        mockProductRepository.update.mockResolvedValue(
          mockValidProductDataResponse
        );

        //Act
        const result = await updateProductService.execute(
          mockValidProductDataResponse.id as string,
          mockValidProductDataRequest
        );

        //Assert
        expect(mockProductRepository.getById).toHaveBeenCalledWith(
          mockValidProductDataResponse.id as string
        );

        expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
          mockValidProductDataRequest.categoryId
        );
        expect(mockProductRepository.getByName).toHaveBeenCalledWith(
          mockValidProductDataRequest.name
        );
        expect(mockProductRepository.update).toHaveBeenCalledWith(
          mockValidProductDataResponse.id as string,
          expect.objectContaining({
            ...mockValidProductDataRequestConvertedToProductType,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        );
        expect(result).toEqual(mockValidProductDataResponse);
        expect(result).toHaveProperty("id", mockValidProductDataResponse.id);

        // expect(result).toBeInstanceOf(Product);
      });
    });

    describe("Failure", () => {
      describe("ValidationError", () => {
        test("should throw a ValidationError if category does not exist", async () => {
          //Arrange
          mockProductRepository.getById.mockResolvedValue(
            mockValidProductDataResponse
          );
          mockCategoryRepository.getByName.mockResolvedValue(null);

          //Act & Assert
          await expect(
            updateProductService.execute(
              mockValidProductDataResponse.id as string,
              mockValidProductDataRequest
            )
          ).rejects.toThrow(ValidationError);

          expect(mockProductRepository.getById).toHaveBeenCalledWith(
            mockValidProductDataResponse.id as string
          );

          expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
            mockValidProductDataRequest.categoryId
          );
          expect(mockProductRepository.getByName).not.toHaveBeenCalled();
          expect(mockProductRepository.update).not.toHaveBeenCalled();
        });

        test("should throw a ValidationError if product name already exists", async () => {
          //Arrange
          mockProductRepository.getById.mockResolvedValue(
            mockValidProductDataResponse
          );
          mockCategoryRepository.getByName.mockResolvedValue(
            mockValidCategoryDataResponse
          );
          mockProductRepository.getByName.mockResolvedValue(
            mockValidProductDataResponseV2
          );
          //Act & Assert
          await expect(
            updateProductService.execute(
              mockValidProductDataResponse.id as string,
              mockValidProductDataRequest
            )
          ).rejects.toThrow(ValidationError);

          expect(mockProductRepository.getById).toHaveBeenCalledWith(
            mockValidProductDataResponse.id as string
          );
          expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
            mockValidProductDataRequest.categoryId
          );
          expect(mockProductRepository.getByName).toHaveBeenCalledWith(
            mockValidProductDataRequest.name
          );
          expect(mockProductRepository.update).not.toHaveBeenCalled();
        });
      });

      describe("CustomError", () => {
        test("should throw a CustomError if id is empty", async () => {
          //Arrange
          mockProductRepository.getById.mockResolvedValue(null);

          //Act & Assert
          await expect(
            updateProductService.execute("", mockValidProductDataRequest)
          ).rejects.toThrow(CustomError);

          expect(mockProductRepository.getById).toHaveBeenCalledWith("");

          expect(mockCategoryRepository.getByName).not.toHaveBeenCalled();
          expect(mockProductRepository.getByName).not.toHaveBeenCalled();
          expect(mockProductRepository.update).not.toHaveBeenCalled();
        });

        test("should throw a CustomError if product to update does not exist", async () => {
          //Arrange
          mockProductRepository.getById.mockResolvedValue(null);

          //Act & Assert
          await expect(
            updateProductService.execute(
              mockValidProductDataResponse.id as string,
              mockValidProductDataRequest
            )
          ).rejects.toThrow(CustomError);

          expect(mockProductRepository.getById).toHaveBeenCalledWith(
            mockValidProductDataResponse.id as string
          );

          expect(mockCategoryRepository.getByName).not.toHaveBeenCalled();
          expect(mockProductRepository.getByName).not.toHaveBeenCalled();
          expect(mockProductRepository.update).not.toHaveBeenCalled();
        });
      });
    });
  });
});
