import { CreateOrderService } from "../../../../../src/Orders/application/services";
import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import { mockOrderSendMessageToCustomerAdapter } from "../../__mocks__/adapters/MockOrderSendMessageToCustomerAdapter";

import {
  mockValidOrderDataRequest, //CreateOrderDto
  mockValidOrderDataResponse, //Order que devuelve la db
  mockValidOrderDataRequestToOrderType, //Order - mediante builder
} from "../../../../helpers/factories/order-mocks";
import { Order } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("CreateOrderService", () => {
  let createOrderService: CreateOrderService;

  beforeEach(() => {
    jest.clearAllMocks();
    createOrderService = new CreateOrderService(
      mockOrderRepository,
      mockOrderSendMessageToCustomerAdapter
    );
  });

  describe("execute", () => {
    describe("Happy Path", () => {
      test("should create an order successfully when all validations pass", async () => {
        // Arrange
        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        const result = await createOrderService.execute(
          mockValidOrderDataRequest
        );

        // Assert
        expect(mockOrderRepository.save).toHaveBeenCalledTimes(1);
        expect(mockOrderRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            ...mockValidOrderDataRequestToOrderType,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        );

        expect(
          mockOrderSendMessageToCustomerAdapter.sendMessage
        ).toHaveBeenCalledTimes(1);
        expect(
          mockOrderSendMessageToCustomerAdapter.sendMessage
        ).toHaveBeenCalledWith(mockValidOrderDataResponse);

        expect(result).toEqual(mockValidOrderDataResponse);
      });

      test("should create order with correct OrderItem mapping", async () => {
        // Arrange
        const orderDataWithMultipleProducts = {
          ...mockValidOrderDataRequest,
          products: [
            {
              productId: "prod1",
              productName: "Product 1",
              quantity: 2,
              unitPrice: 100,
              discount: 0.1,
              size: "M",
              imageUrl: "https://example.com/image1.jpg",
            },
            {
              productId: "prod2",
              productName: "Product 2",
              quantity: 1,
              unitPrice: 50,
              discount: 0,
              size: null,
              imageUrl: null,
            },
          ],
        };

        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(orderDataWithMultipleProducts);

        // Assert
        expect(mockOrderRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            products: expect.arrayContaining([
              expect.objectContaining({
                productId: "prod1",
                productName: "Product 1",
                quantity: 2,
                unitPrice: 100,
                discount: 0.1,
                size: "M",
                imageUrl: "https://example.com/image1.jpg",
              }),
              expect.objectContaining({
                productId: "prod2",
                productName: "Product 2",
                quantity: 1,
                unitPrice: 50,
                discount: 0,
                size: null,
                imageUrl: null,
              }),
            ]),
          })
        );
      });

      test("should create order with calculated totals", async () => {
        // Arrange
        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(mockValidOrderDataRequest);

        // Assert - Verificar que se llamó save con una orden que tiene totales calculados
        const savedOrderCall = mockOrderRepository.save.mock.calls[0][0];
        expect(savedOrderCall).toHaveProperty("subtotal");
        expect(savedOrderCall).toHaveProperty("total");
        expect(savedOrderCall).toHaveProperty("shippingCost");

        // Verificar que los totales son números válidos
        expect(typeof savedOrderCall.subtotal).toBe("number");
        expect(typeof savedOrderCall.total).toBe("number");
        expect(savedOrderCall.subtotal).toBeGreaterThanOrEqual(0);
        expect(savedOrderCall.total).toBeGreaterThanOrEqual(0);
      });
    });

    describe("Repository Failures", () => {
      test("should throw error if order creation fails in repository", async () => {
        // Arrange
        const errorMessage = "Database connection error";
        mockOrderRepository.save.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(
          createOrderService.execute(mockValidOrderDataRequest)
        ).rejects.toThrow(errorMessage);

        // Verificar que no se intenta enviar mensaje si falla la creación
        expect(
          mockOrderSendMessageToCustomerAdapter.sendMessage
        ).not.toHaveBeenCalled();
      });

      test("should throw custom error when repository fails", async () => {
        // Arrange
        const customError = new Error("Order validation failed");
        customError.name = "ValidationError";
        mockOrderRepository.save.mockRejectedValue(customError);

        // Act & Assert
        await expect(
          createOrderService.execute(mockValidOrderDataRequest)
        ).rejects.toMatchObject({
          message: "Order validation failed",
          name: "ValidationError",
        });
      });

      test("should handle repository timeout error", async () => {
        // Arrange
        const timeoutError = new Error("Connection timeout");
        timeoutError.name = "TimeoutError";
        mockOrderRepository.save.mockRejectedValue(timeoutError);

        // Act & Assert
        await expect(
          createOrderService.execute(mockValidOrderDataRequest)
        ).rejects.toThrow("Connection timeout");
      });
    });

    describe("Message Sending Failures", () => {
      test("should complete order creation even if message sending fails", async () => {
        // Arrange
        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockRejectedValue(
          new Error("WhatsApp API error")
        );

        // Act & Assert
        await expect(
          createOrderService.execute(mockValidOrderDataRequest)
        ).rejects.toThrow("WhatsApp API error");

        // Verificar que la orden se guardó correctamente antes de fallar el mensaje
        expect(mockOrderRepository.save).toHaveBeenCalledTimes(1);
        expect(
          mockOrderSendMessageToCustomerAdapter.sendMessage
        ).toHaveBeenCalledWith(mockValidOrderDataResponse);
      });

      test("should handle message adapter returning false", async () => {
        // Arrange
        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          false
        );

        // Act
        const result = await createOrderService.execute(
          mockValidOrderDataRequest
        );

        // Assert - El servicio debería completarse exitosamente
        expect(result).toEqual(mockValidOrderDataResponse);
        expect(
          mockOrderSendMessageToCustomerAdapter.sendMessage
        ).toHaveBeenCalledWith(mockValidOrderDataResponse);
      });
    });

    describe("Order Building and Mapping", () => {
      test("should map all DTO fields to Order entity correctly", async () => {
        // Arrange
        const completeOrderData = {
          ...mockValidOrderDataRequest,
          customerNotes: "Special delivery instructions",
          paymentMethod: "credit_card",
          whatsappMessage: "Order confirmation message",
          isFreeShipping: true,
          shippingCost: 0,
        };

        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(completeOrderData);

        // Assert
        expect(mockOrderRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            customerPhone: completeOrderData.customerPhone,
            customerEmail: completeOrderData.customerEmail,
            customerName: completeOrderData.customerName,
            customerNotes: completeOrderData.customerNotes,
            whatsappMessage: completeOrderData.whatsappMessage,
            whatsappStatus: completeOrderData.whatsappStatus,
            paymentMethod: completeOrderData.paymentMethod,
            subtotal: completeOrderData.subtotal,
            shippingCost: completeOrderData.shippingCost,
            total: completeOrderData.total,
            isFreeShipping: completeOrderData.isFreeShipping,
          })
        );
      });

      test("should handle null/undefined optional fields correctly", async () => {
        // Arrange
        const orderDataWithNulls = {
          ...mockValidOrderDataRequest,
          customerEmail: null,
          customerNotes: null,
          whatsappMessage: null,
          paymentMethod: null,
          shippingCost: null,
        };

        mockOrderRepository.save.mockResolvedValue({
          ...mockValidOrderDataResponse,
          customerEmail: null,
          customerNotes: null,
          whatsappMessage: null,
          paymentMethod: null,
          shippingCost: null,
        } as Order);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(orderDataWithNulls);

        // Assert
        expect(mockOrderRepository.save).toHaveBeenCalledWith(
          expect.objectContaining({
            ...mockValidOrderDataRequestToOrderType,
            customerEmail: null,
            customerNotes: null,
            whatsappMessage: null,
            paymentMethod: null,
            shippingCost: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        );
      });

      test("should set initial Order fields correctly", async () => {
        // Arrange
        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(mockValidOrderDataRequest);

        // Assert
        const savedOrder = mockOrderRepository.save.mock.calls[0][0];
        expect(savedOrder.id).toBeNull(); // Should be null before saving
        expect(savedOrder.createdAt).toBeInstanceOf(Date);
        expect(savedOrder.updatedAt).toBeInstanceOf(Date);
      });

      test("should set OrderItem fields correctly including nulls", async () => {
        // Arrange
        const orderWithNullFields = {
          ...mockValidOrderDataRequest,
          products: [
            {
              productId: "123",
              productName: "Test Product",
              quantity: 1,
              unitPrice: 100,
              discount: 0.1,
              size: null, // null size
              imageUrl: null, // null imageUrl
            },
          ],
        };

        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(orderWithNullFields);

        // Assert
        const savedOrder = mockOrderRepository.save.mock.calls[0][0];
        expect(savedOrder.products[0]).toMatchObject({
          id: null,
          orderId: null,
          productId: "123",
          productName: "Test Product",
          quantity: 1,
          unitPrice: 100,
          discount: 0.1,
          size: null,
          imageUrl: null,
        });
      });
    });

    describe("Integration Flow", () => {
      test("should pass saved order (not input data) to message adapter", async () => {
        // Arrange
        const savedOrder = {
          ...mockValidOrderDataResponse,
          id: "saved-order-123",
        } as Order;
        mockOrderRepository.save.mockResolvedValue(savedOrder);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(mockValidOrderDataRequest);

        // Assert
        expect(
          mockOrderSendMessageToCustomerAdapter.sendMessage
        ).toHaveBeenCalledWith(
          savedOrder // Debe ser la orden guardada, no los datos de entrada
        );
      });
    });

    describe("Edge Cases", () => {
      test("should handle order with single product", async () => {
        // Arrange
        const singleProductOrder = {
          ...mockValidOrderDataRequest,
          products: [
            {
              productId: "single-prod",
              productName: "Single Product",
              quantity: 1,
              unitPrice: 99.99,
              discount: 0,
              size: "L",
              imageUrl: "https://example.com/single.jpg",
            },
          ],
        };

        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        const result = await createOrderService.execute(singleProductOrder);

        // Assert
        expect(result).toEqual(mockValidOrderDataResponse);
        expect(mockOrderRepository.save.mock.calls[0][0].products).toHaveLength(
          1
        );
      });

      test("should handle order with many products", async () => {
        // Arrange
        const manyProducts = Array.from({ length: 10 }, (_, i) => ({
          productId: `prod-${i}`,
          productName: `Product ${i}`,
          quantity: i + 1,
          unitPrice: (i + 1) * 10,
          discount: i * 0.05,
          size: i % 2 === 0 ? "M" : "L",
          imageUrl: `https://example.com/prod-${i}.jpg`,
        }));

        const manyProductsOrder = {
          ...mockValidOrderDataRequest,
          products: manyProducts,
        };

        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);
        mockOrderSendMessageToCustomerAdapter.sendMessage.mockResolvedValue(
          true
        );

        // Act
        await createOrderService.execute(manyProductsOrder);

        // Assert
        expect(mockOrderRepository.save.mock.calls[0][0].products).toHaveLength(
          10
        );
      });
    });
  });
});
