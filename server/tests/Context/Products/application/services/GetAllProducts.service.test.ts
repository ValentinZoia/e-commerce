import { GetAllProductsService } from "../../../../../src/Products/application/services";
import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import {
  mockValidProductDataResponse,
  mockValidProductDataResponseV2,
} from "../../../../helpers/factories/product-mocks";

// import { Product } from "../../../../../src/Products/domain/entities";
import { CustomError } from "../../../../../src/shared/domain/errors";

describe("GeyAllProductsService - Unit Test", () => {
  let getAllProductsService: GetAllProductsService;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllProductsService = new GetAllProductsService(mockProductRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get all products successfully", async () => {
        //Arrange
        mockProductRepository.getAll.mockResolvedValue([
          mockValidProductDataResponse,
          mockValidProductDataResponseV2,
        ]);

        //Act
        const result = await getAllProductsService.execute();

        //Assert
        expect(mockProductRepository.getAll).toHaveBeenCalled();

        expect(result).toEqual([
          mockValidProductDataResponse,
          mockValidProductDataResponseV2,
        ]);

        expect(result).toBeInstanceOf(Array);
        // expect(result[0]).toBeInstanceOf(Product);
      });

      test("should get all products successfully with options", async () => {
        //Arrange
        mockProductRepository.getAll.mockResolvedValue([
          mockValidProductDataResponseV2,
        ]);

        //Act
        const result = await getAllProductsService.execute({
          take: 1,
          skip: 0,
          category: "category-test-id",
          featured: false,
          promotion: false,
          new: true,
        });

        //Assert
        expect(mockProductRepository.getAll).toHaveBeenCalledWith({
          take: 1,
          skip: 0,
          category: "category-test-id",
          featured: false,
          promotion: false,
          new: true,
        });

        expect(result).toEqual([mockValidProductDataResponseV2]);
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty("isNew", true);
        expect(result[0]).toHaveProperty("isFeatured", false);
        expect(result[0]).toHaveProperty("isPromotion", false);
        expect(result[0]).toHaveProperty("categoryId", "category-test-id");
        // expect(result[0]).toBeInstanceOf(Product);
      });

      test("should get all products successfully with partial options", async () => {
        //Arrange
        mockProductRepository.getAll.mockResolvedValue([
          mockValidProductDataResponse,
        ]);

        //Act
        const result = await getAllProductsService.execute({
          featured: true,
        });

        //Assert
        expect(mockProductRepository.getAll).toHaveBeenCalledWith({
          featured: true,
        });

        expect(result).toEqual([mockValidProductDataResponse]);
        expect(result[0]).toHaveProperty("isFeatured", true);
        expect(result).toBeInstanceOf(Array);
        // expect(result[0]).toBeInstanceOf(Product);
      });
    });

    describe("Failure", () => {
      test("should throw CustomError when options take is negative", async () => {
        //Act & Assert
        await expect(
          getAllProductsService.execute({ take: -1 })
        ).rejects.toThrow(CustomError);

        expect(mockProductRepository.getAll).not.toHaveBeenCalled();
      });

      test("should throw CustomError when options skip is negative", async () => {
        //Act & Assert
        await expect(
          getAllProductsService.execute({ skip: -1 })
        ).rejects.toThrow(CustomError);

        expect(mockProductRepository.getAll).not.toHaveBeenCalled();
      });
    });
  });
});
