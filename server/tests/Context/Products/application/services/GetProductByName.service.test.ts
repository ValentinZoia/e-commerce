import { GetProductByNameService } from "../../../../../src/Products/application/services";
import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import { mockValidProductDataResponse } from "../../../../helpers/factories/product-mocks";
import { CustomError } from "../../../../../src/shared/domain/errors";
// import { Product } from "../../../../../src/Products/domain/entities";

describe("GetProductByNameService - Unit Test", () => {
  let getProductByNameService: GetProductByNameService;

  beforeEach(() => {
    jest.clearAllMocks();
    getProductByNameService = new GetProductByNameService(
      mockProductRepository
    );
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get product successfully", async () => {
        //Arrange
        mockProductRepository.getByName.mockResolvedValue(
          mockValidProductDataResponse
        );

        //Act
        const result = await getProductByNameService.execute(
          mockValidProductDataResponse.name as string
        );

        //Assert
        expect(mockProductRepository.getByName).toHaveBeenCalledWith(
          mockValidProductDataResponse.name as string
        );
        expect(result).toEqual(mockValidProductDataResponse);
        expect(result).toHaveProperty(
          "name",
          mockValidProductDataResponse.name
        );
        // expect(result).toBeInstanceOf(Product);
      });
    });

    describe("Failure", () => {
      test("should throw CustomError when name is empty", async () => {
        //Arrange
        mockProductRepository.getByName.mockResolvedValue(null);

        //Act & Assert
        await expect(getProductByNameService.execute("")).rejects.toThrow(
          CustomError
        );
        expect(mockProductRepository.getByName).toHaveBeenCalledWith("");
      });

      test("should throw CustomError when product does not exist", async () => {
        //Arrange
        mockProductRepository.getByName.mockResolvedValue(null);

        //Act & Assert
        await expect(
          getProductByNameService.execute(
            mockValidProductDataResponse.name as string
          )
        ).rejects.toThrow(CustomError);
        expect(mockProductRepository.getByName).toHaveBeenCalledWith(
          mockValidProductDataResponse.name as string
        );
      });
    });
  });
});
