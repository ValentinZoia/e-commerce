import { GetOrdersByCustomerNameService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("GetOrdersByCustomerNameService", () => {
  let getOrdersByCustomerNameService: GetOrdersByCustomerNameService;

  beforeEach(() => {
    jest.clearAllMocks();
    getOrdersByCustomerNameService = new GetOrdersByCustomerNameService(
      mockOrderRepository
    );
  });

  describe("execute", () => {
    test("should return orders array when customer has orders", async () => {
      // Arrange
      const customerName = mockValidOrderDataResponse.customerName as string;
      const ordersArray = [
        mockValidOrderDataResponse,
        { ...mockValidOrderDataResponse, id: "order-2" },
      ] as Order[];
      mockOrderRepository.findByCustomerName.mockResolvedValue(ordersArray);

      // Act
      const result = await getOrdersByCustomerNameService.execute(customerName);

      // Assert
      expect(mockOrderRepository.findByCustomerName).toHaveBeenCalledWith(
        customerName
      );
      expect(result).toEqual(ordersArray);
    });

    test("should return single order in array when customer has one order", async () => {
      // Arrange
      const customerName = mockValidOrderDataResponse.customerName as string;
      const singleOrderArray = [mockValidOrderDataResponse];
      mockOrderRepository.findByCustomerName.mockResolvedValue(
        singleOrderArray
      );

      // Act
      const result = await getOrdersByCustomerNameService.execute(customerName);

      // Assert
      expect(result).toEqual(singleOrderArray);
      expect(result).toHaveLength(1);
    });

    test("should throw CustomError.notFound when customer has no orders", async () => {
      // Arrange
      const customerName = "marito";
      mockOrderRepository.findByCustomerName.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByCustomerNameService.execute(customerName)
      ).rejects.toThrow(
        CustomError.notFound(
          `No se encontraron ningunas ordenes para el cliente ${customerName}   `
        )
      );

      expect(mockOrderRepository.findByCustomerName).toHaveBeenCalledWith(
        customerName
      );
    });

    test("should throw repository error when findByCustomerName fails", async () => {
      // Arrange
      const customerName = "marito";
      const repositoryError = new Error("Database connection timeout");
      mockOrderRepository.findByCustomerName.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(
        getOrdersByCustomerNameService.execute(customerName)
      ).rejects.toThrow("Database connection timeout");

      expect(mockOrderRepository.findByCustomerName).toHaveBeenCalledWith(
        customerName
      );
    });

    test("should include the Name  in the error message when no orders found", async () => {
      // Arrange
      const specificName = "marito";
      mockOrderRepository.findByCustomerName.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByCustomerNameService.execute(specificName)
      ).rejects.toThrow(
        `No se encontraron ningunas ordenes para el cliente ${specificName}   `
      );
    });
  });
});
