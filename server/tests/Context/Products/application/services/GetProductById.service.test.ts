import { GetProductByIdService } from "../../../../../src/Products/application/services";
import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import { mockValidProductDataResponse } from "../../../../helpers/factories/product-mocks";
import { CustomError } from "../../../../../src/shared/domain/errors";
// import { Product } from "../../../../../src/Products/domain/entities";

describe("GetProductByIdService - Unit Test", () => {
  let getProductByIdService: GetProductByIdService;

  beforeEach(() => {
    jest.clearAllMocks();
    getProductByIdService = new GetProductByIdService(mockProductRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get product successfully", async () => {
        //Arrange
        mockProductRepository.getById.mockResolvedValue(
          mockValidProductDataResponse
        );

        //Act
        const result = await getProductByIdService.execute(
          mockValidProductDataResponse.id as string
        );

        //Assert
        expect(mockProductRepository.getById).toHaveBeenCalledWith(
          mockValidProductDataResponse.id as string
        );
        expect(result).toEqual(mockValidProductDataResponse);
        expect(result).toHaveProperty("id", mockValidProductDataResponse.id);
        // expect(result).toBeInstanceOf(Product);
      });
    });

    describe("Failure", () => {
      test("should throw CustomError when id is empty", async () => {
        //Arrange
        mockProductRepository.getById.mockResolvedValue(null);

        //Act & Assert
        await expect(getProductByIdService.execute("")).rejects.toThrow(
          CustomError
        );
        expect(mockProductRepository.getById).toHaveBeenCalledWith("");
      });

      test("should throw CustomError when product does not exist", async () => {
        //Arrange
        mockProductRepository.getById.mockResolvedValue(null);

        //Act & Assert
        await expect(
          getProductByIdService.execute(
            mockValidProductDataResponse.id as string
          )
        ).rejects.toThrow(CustomError);
        expect(mockProductRepository.getById).toHaveBeenCalledWith(
          mockValidProductDataResponse.id as string
        );
      });
    });
  });
});
