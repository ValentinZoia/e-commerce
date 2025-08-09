import { GetOrdersByCustomerEmailService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("GetOrdersByCustomerEmailService", () => {
  let getOrdersByCustomerEmailService: GetOrdersByCustomerEmailService;

  beforeEach(() => {
    jest.clearAllMocks();
    getOrdersByCustomerEmailService = new GetOrdersByCustomerEmailService(
      mockOrderRepository
    );
  });

  describe("execute", () => {
    test("should return orders array when customer has orders", async () => {
      // Arrange
      const customerEmail = mockValidOrderDataResponse.customerEmail as string;
      const ordersArray = [
        mockValidOrderDataResponse,
        { ...mockValidOrderDataResponse, id: "order-2" },
      ] as Order[];
      mockOrderRepository.findByCustomerEmail.mockResolvedValue(ordersArray);

      // Act
      const result = await getOrdersByCustomerEmailService.execute(
        customerEmail
      );

      // Assert
      expect(mockOrderRepository.findByCustomerEmail).toHaveBeenCalledWith(
        customerEmail
      );
      expect(result).toEqual(ordersArray);
    });

    test("should return single order in array when customer has one order", async () => {
      // Arrange
      const customerEmail = mockValidOrderDataResponse.customerEmail as string;
      const singleOrderArray = [mockValidOrderDataResponse];
      mockOrderRepository.findByCustomerEmail.mockResolvedValue(
        singleOrderArray
      );

      // Act
      const result = await getOrdersByCustomerEmailService.execute(
        customerEmail
      );

      // Assert
      expect(result).toEqual(singleOrderArray);
      expect(result).toHaveLength(1);
    });

    test("should throw CustomError.notFound when customer has no orders", async () => {
      // Arrange
      const customerEmail = "marito@gmail.com";
      mockOrderRepository.findByCustomerEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByCustomerEmailService.execute(customerEmail)
      ).rejects.toThrow(
        CustomError.notFound(
          `No se encontraron ningunas ordenes para el email ${customerEmail}   `
        )
      );

      expect(mockOrderRepository.findByCustomerEmail).toHaveBeenCalledWith(
        customerEmail
      );
    });

    test("should throw repository error when findByCustomerEmail fails", async () => {
      // Arrange
      const customerEmail = "marito@gmail.com";
      const repositoryError = new Error("Database connection timeout");
      mockOrderRepository.findByCustomerEmail.mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(
        getOrdersByCustomerEmailService.execute(customerEmail)
      ).rejects.toThrow("Database connection timeout");

      expect(mockOrderRepository.findByCustomerEmail).toHaveBeenCalledWith(
        customerEmail
      );
    });

    test("should include the Email number in the error message when no orders found", async () => {
      // Arrange
      const specificEmail = "marito@gmail.com";
      mockOrderRepository.findByCustomerEmail.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByCustomerEmailService.execute(specificEmail)
      ).rejects.toThrow(
        `No se encontraron ningunas ordenes para el email ${specificEmail}   `
      );
    });
  });
});
