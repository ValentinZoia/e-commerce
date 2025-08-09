import { GetOrdersByCustomerPhoneService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockValidOrderDataResponse } from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("GetOrdersByCustomerPhoneService", () => {
  let getOrdersByCustomerPhoneService: GetOrdersByCustomerPhoneService;

  beforeEach(() => {
    jest.clearAllMocks();
    getOrdersByCustomerPhoneService = new GetOrdersByCustomerPhoneService(
      mockOrderRepository
    );
  });

  describe("execute", () => {
    test("should return orders array when customer has orders", async () => {
      // Arrange
      const customerPhone = mockValidOrderDataResponse.customerPhone;
      const ordersArray = [
        mockValidOrderDataResponse,
        { ...mockValidOrderDataResponse, id: "order-2" },
      ] as Order[];
      mockOrderRepository.findByCustomerPhone.mockResolvedValue(ordersArray);

      // Act
      const result = await getOrdersByCustomerPhoneService.execute(
        customerPhone
      );

      // Assert
      expect(mockOrderRepository.findByCustomerPhone).toHaveBeenCalledWith(
        customerPhone
      );
      expect(result).toEqual(ordersArray);
    });

    test("should return single order in array when customer has one order", async () => {
      // Arrange
      const customerPhone = mockValidOrderDataResponse.customerPhone;
      const singleOrderArray = [mockValidOrderDataResponse];
      mockOrderRepository.findByCustomerPhone.mockResolvedValue(
        singleOrderArray
      );

      // Act
      const result = await getOrdersByCustomerPhoneService.execute(
        customerPhone
      );

      // Assert
      expect(result).toEqual(singleOrderArray);
      expect(result).toHaveLength(1);
    });

    test("should throw CustomError.notFound when customer has no orders", async () => {
      // Arrange
      const customerPhone = "5555555555";
      mockOrderRepository.findByCustomerPhone.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByCustomerPhoneService.execute(customerPhone)
      ).rejects.toThrow(
        CustomError.notFound(
          `No se encontraron ningunas ordenes para el ciente con numero celular: ${customerPhone}   `
        )
      );

      expect(mockOrderRepository.findByCustomerPhone).toHaveBeenCalledWith(
        customerPhone
      );
    });

    test("should throw repository error when findByCustomerPhone fails", async () => {
      // Arrange
      const customerPhone = "1111111111";
      const repositoryError = new Error("Database connection timeout");
      mockOrderRepository.findByCustomerPhone.mockRejectedValue(
        repositoryError
      );

      // Act & Assert
      await expect(
        getOrdersByCustomerPhoneService.execute(customerPhone)
      ).rejects.toThrow("Database connection timeout");

      expect(mockOrderRepository.findByCustomerPhone).toHaveBeenCalledWith(
        customerPhone
      );
    });

    test("should include the phone number in the error message when no orders found", async () => {
      // Arrange
      const specificPhone = "+54-9-11-1234-5678";
      mockOrderRepository.findByCustomerPhone.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getOrdersByCustomerPhoneService.execute(specificPhone)
      ).rejects.toThrow(
        `No se encontraron ningunas ordenes para el ciente con numero celular: ${specificPhone}   `
      );
    });
  });
});
