import { GetOrdersByProductIdService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("getOrdersByProductIdService", () => {
  let getOrdersByProductIdService: GetOrdersByProductIdService;

  beforeEach(() => {
    jest.clearAllMocks();
    getOrdersByProductIdService = new GetOrdersByProductIdService(
      mockOrderRepository
    );
  });

  describe("execute", () => {
    test("should return orders array when product has orders", async () => {
      // Arrange
      const productId = mockValidOrderDataResponse.products[0]
        .productId as string;
      const ordersArray = [
        mockValidOrderDataResponse,
        { ...mockValidOrderDataResponse, id: "order-2" },
      ] as Order[];
      mockOrderRepository.findByProductId.mockResolvedValue(ordersArray);

      // Act
      const result = await getOrdersByProductIdService.execute(productId);

      // Assert
      expect(mockOrderRepository.findByProductId).toHaveBeenCalledWith(
        productId
      );
      expect(result).toEqual(ordersArray);
    });

    test("should return single order in array when product has one order", async () => {
      // Arrange
      const productId = mockValidOrderDataResponse.products[0]
        .productId as string;
      const singleOrderArray = [mockValidOrderDataResponse];
      mockOrderRepository.findByProductId.mockResolvedValue(singleOrderArray);

      // Act
      const result = await getOrdersByProductIdService.execute(productId);

      // Assert
      expect(result).toEqual(singleOrderArray);
      expect(result).toHaveLength(1);
    });

    test("should throw CustomError.notFound when product has no orders", async () => {
      // Arrange
      const productId = "1edfr4564gerg";
      mockOrderRepository.findByProductId.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByProductIdService.execute(productId)
      ).rejects.toThrow(
        CustomError.notFound(
          `No se encontraron ningunas ordenes para el producto con id: ${productId}   `
        )
      );

      expect(mockOrderRepository.findByProductId).toHaveBeenCalledWith(
        productId
      );
    });

    test("should throw repository error when findByProductId fails", async () => {
      // Arrange
      const productId = "1edfr4564gerg";
      const repositoryError = new Error("Database connection timeout");
      mockOrderRepository.findByProductId.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(
        getOrdersByProductIdService.execute(productId)
      ).rejects.toThrow("Database connection timeout");

      expect(mockOrderRepository.findByProductId).toHaveBeenCalledWith(
        productId
      );
    });

    test("should include the ProductId  in the error message when no orders found", async () => {
      // Arrange
      const specificProductId = "1edfr4564gerg";
      mockOrderRepository.findByProductId.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByProductIdService.execute(specificProductId)
      ).rejects.toThrow(
        `No se encontraron ningunas ordenes para el producto con id: ${specificProductId}   `
      );
    });
  });
});
