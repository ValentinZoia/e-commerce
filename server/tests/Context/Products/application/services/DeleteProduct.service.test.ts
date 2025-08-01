import { DeleteProductService } from "../../../../../src/Products/application/services";
import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockValidProductDataResponse } from "../../../../helpers/factories/product-mocks";

describe("DeleteProductService - Unit Test", () => {
  let deleteProductService: DeleteProductService;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteProductService = new DeleteProductService(mockProductRepository);
  });

  describe("execute", () => {
    test("should delete a product successfully", async () => {
      //Arrange
      mockProductRepository.getById.mockResolvedValue(
        mockValidProductDataResponse
      );
      mockProductRepository.delete.mockResolvedValue(Promise.resolve()); //devuelve void

      //act
      const result = await deleteProductService.execute(
        mockValidProductDataResponse.id as string
      );

      expect(mockProductRepository.getById).toHaveBeenCalledWith(
        mockValidProductDataResponse.id as string
      );
      expect(mockProductRepository.delete).toHaveBeenCalled();
    });

    test("should throw a CustomError if id is empty", async () => {
      //Arrange
      mockProductRepository.getById.mockResolvedValue(null);

      //Act & Assert
      await expect(deleteProductService.execute("")).rejects.toThrow(
        CustomError
      );

      expect(mockProductRepository.getById).toHaveBeenCalledWith("");
      expect(mockProductRepository.delete).not.toHaveBeenCalled();
    });

    test("should throw a CustomError if product to delete does not exist", async () => {
      //Arrange
      mockProductRepository.getById.mockResolvedValue(null);

      //Act & Assert
      await expect(
        deleteProductService.execute(mockValidProductDataResponse.id as string)
      ).rejects.toThrow(CustomError);

      expect(mockProductRepository.getById).toHaveBeenCalledWith(
        mockValidProductDataResponse.id as string
      );

      expect(mockProductRepository.delete).not.toHaveBeenCalled();
    });
  });
});
