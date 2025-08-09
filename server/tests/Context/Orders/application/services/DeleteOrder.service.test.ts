import { DeleteOrderService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";

import { CustomError } from "../../../../../src/shared/domain/errors";

describe("DeleteOrderService  - Unit Test", () => {
  let deleteOrderService: DeleteOrderService;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteOrderService = new DeleteOrderService(mockOrderRepository);
  });

  describe("execute", () => {
    test("should delete a order successfully", async () => {
      //Arrange
      mockOrderRepository.findById.mockResolvedValue(
        mockValidOrderDataResponse
      );
      mockOrderRepository.delete.mockResolvedValue(Promise.resolve()); //devuelve void

      //act
      const result = await deleteOrderService.execute(
        mockValidOrderDataResponse.id as string
      );

      expect(mockOrderRepository.findById).toHaveBeenCalledWith(
        mockValidOrderDataResponse.id as string
      );
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(
        mockValidOrderDataResponse.id as string
      );
    });

    test("should throw a CustomError if id is empty", async () => {
      //Arrange
      mockOrderRepository.findById.mockResolvedValue(null);

      //Act & Assert
      await expect(deleteOrderService.execute("")).rejects.toThrow(CustomError);

      expect(mockOrderRepository.findById).toHaveBeenCalledWith("");
      expect(mockOrderRepository.delete).not.toHaveBeenCalled();
    });

    test("should throw a CustomError if order to delete does not exist", async () => {
      //Arrange
      mockOrderRepository.findById.mockResolvedValue(null);

      //Act & Assert
      await expect(
        deleteOrderService.execute(mockValidOrderDataResponse.id as string)
      ).rejects.toThrow(CustomError);

      expect(mockOrderRepository.findById).toHaveBeenCalledWith(
        mockValidOrderDataResponse.id as string
      );

      expect(mockOrderRepository.delete).not.toHaveBeenCalled();
    });
    test("should not call delete if findById repository throws error", async () => {
      // Arrange
      const orderId = "error-order";
      mockOrderRepository.findById.mockRejectedValue(
        new Error("Database error")
      );

      // Act & Assert
      await expect(deleteOrderService.execute(orderId)).rejects.toThrow(
        "Database error"
      );

      expect(mockOrderRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockOrderRepository.findById).toHaveBeenCalledWith(orderId);
      expect(mockOrderRepository.delete).not.toHaveBeenCalled();
    });
    test("should not delete the order if delete repository throws error", async () => {
      // Arrange
      mockOrderRepository.findById.mockResolvedValue(
        mockValidOrderDataResponse
      );
      mockOrderRepository.delete.mockRejectedValue(new Error("Database error"));

      // Act & Assert
      await expect(
        deleteOrderService.execute(mockValidOrderDataResponse.id as string)
      ).rejects.toThrow("Database error");

      expect(mockOrderRepository.findById).toHaveBeenCalledWith(
        mockValidOrderDataResponse.id as string
      );
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(
        mockValidOrderDataResponse.id as string
      );
    });
  });
});
