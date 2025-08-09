import { mockOrderRepository } from "../../__mocks__/repositories/MockOrderRepository";
import {
  mockValidOrderDataRequestToOrderType,
  mockValidOrderDataResponse,
} from "../../../../helpers/factories/order-mocks";
import {
  Order,
  WhatsAppStatusNames,
} from "../../../../../src/Orders/domain/entities/Order.entity";

describe("PrismaOrderRepository - Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("save", () => {
    describe("Success", () => {
      test("should create an Order", async () => {
        //el metodo save deberia devolver un mockValidOrderDataResponse
        mockOrderRepository.save.mockResolvedValue(mockValidOrderDataResponse);

        //ejecutamos el metodo save pasandole como parametro  mockValidOrderDataRequestToOrderType
        const order = await mockOrderRepository.save(
          mockValidOrderDataRequestToOrderType
        );
        //esperamos que el resultado sea igual al mockValidOrderDataResponse
        expect(order).toEqual(mockValidOrderDataResponse);
      });
    });
    describe("Failure", () => {
      test("should throw error when order creation fails", async () => {
        const errorMessage = "Database connection error";
        mockOrderRepository.save.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockOrderRepository.save(mockValidOrderDataRequestToOrderType)
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when required fields are missing", async () => {
        const invalidOrder = {
          ...mockValidOrderDataRequestToOrderType,
          customerName: "",
        };
        mockOrderRepository.save.mockRejectedValue(
          new Error("CustomerName is required")
        );

        await expect(
          mockOrderRepository.save(invalidOrder as any)
        ).rejects.toThrow("CustomerName is required");
      });
    });
  });
  describe("update", () => {
    describe("Success", () => {
      test("should update an order", async () => {
        mockOrderRepository.update.mockResolvedValue(
          mockValidOrderDataResponse
        );

        const order = await mockOrderRepository.update(
          mockValidOrderDataResponse.id as string,
          mockValidOrderDataRequestToOrderType
        );
        expect(order).toEqual(mockValidOrderDataResponse);
      });
    });
    describe("Failure", () => {
      test("should throw error when order update fails", async () => {
        const errorMessage = "Update failed: Order not found";
        mockOrderRepository.update.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockOrderRepository.update(
            "invalid-id",
            mockValidOrderDataRequestToOrderType
          )
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when trying to update non-existent order", async () => {
        mockOrderRepository.update.mockRejectedValue(
          new Error("Record to update not found")
        );

        await expect(
          mockOrderRepository.update(
            "non-existent-id",
            mockValidOrderDataRequestToOrderType
          )
        ).rejects.toThrow("Record to update not found");
      });
    });
  });
  describe("delete", () => {
    describe("Success", () => {
      test("should delete a order", async () => {
        mockOrderRepository.delete.mockResolvedValue(Promise.resolve());

        const order = await mockOrderRepository.delete(
          mockValidOrderDataResponse.id as string
        );
        expect(mockOrderRepository.delete).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
        expect(order).toBeUndefined();
      });
    });
    describe("Failure", () => {
      test("should throw error when order deletion fails", async () => {
        const errorMessage = "Deletion failed: Database error";
        mockOrderRepository.delete.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockOrderRepository.delete(mockValidOrderDataResponse.id as string)
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when trying to delete non-existent order", async () => {
        mockOrderRepository.delete.mockRejectedValue(
          new Error("Record to delete does not exist")
        );

        await expect(
          mockOrderRepository.delete("non-existent-id")
        ).rejects.toThrow("Record to delete does not exist");
      });
    });
  });
  describe("findAll", () => {
    describe("Success", () => {
      test("should get all orders", async () => {
        mockOrderRepository.findAll.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        const orders = await mockOrderRepository.findAll();
        expect(orders).toEqual([mockValidOrderDataResponse]);
        expect(mockOrderRepository.findAll).toHaveBeenCalled();
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database query failed";
        mockOrderRepository.findAll.mockRejectedValue(new Error(errorMessage));

        await expect(mockOrderRepository.findAll()).rejects.toThrow(
          errorMessage
        );
      });
    });
  });
  describe("findById", () => {
    describe("Success", () => {
      test("should get a order by id", async () => {
        mockOrderRepository.findById.mockResolvedValue(
          mockValidOrderDataResponse
        );
        const order = await mockOrderRepository.findById(
          mockValidOrderDataResponse.id as string
        );
        expect(order).toEqual(mockValidOrderDataResponse);
        expect(order).toHaveProperty("id", mockValidOrderDataResponse.id);
      });
      test("should get a null if order by id does not exist", async () => {
        mockOrderRepository.findById.mockResolvedValue(null);
        const order = await mockOrderRepository.findById(
          mockValidOrderDataResponse.id as string
        );
        expect(order).toBeNull();
        expect(mockOrderRepository.findById).toHaveBeenCalledWith(
          mockValidOrderDataResponse.id as string
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database connection error";
        mockOrderRepository.findById.mockRejectedValue(new Error(errorMessage));

        await expect(mockOrderRepository.findById("some-id")).rejects.toThrow(
          errorMessage
        );
      });

      test("should throw error when invalid ID format is provided", async () => {
        mockOrderRepository.findById.mockRejectedValue(
          new Error("Invalid ID format")
        );

        await expect(
          mockOrderRepository.findById("invalid-id-format")
        ).rejects.toThrow("Invalid ID format");
      });
    });
  });
  describe("findByCustomerPhone", () => {
    describe("Success", () => {
      test("should get  orders by customerPhone", async () => {
        mockOrderRepository.findByCustomerPhone.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        const orders = await mockOrderRepository.findByCustomerPhone(
          mockValidOrderDataRequestToOrderType.customerPhone
        );
        expect(orders).toEqual([mockValidOrderDataResponse]);
        expect(orders).not.toBeNull();
        expect(
          orders?.every(
            (o: any) =>
              o.customerPhone ===
              mockValidOrderDataRequestToOrderType.customerPhone
          )
        ).toBe(true);
        orders &&
          expect(orders[0]).toHaveProperty(
            "customerPhone",
            mockValidOrderDataRequestToOrderType.customerPhone
          );
      });
      test("should get a null if orders by customerPhone does not exists", async () => {
        mockOrderRepository.findByCustomerPhone.mockResolvedValue(null);
        const orders = await mockOrderRepository.findByCustomerPhone(
          "non-existent-phone"
        );
        expect(orders).toBeNull();
        expect(mockOrderRepository.findByCustomerPhone).toHaveBeenCalledWith(
          "non-existent-phone"
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database connection error";
        mockOrderRepository.findByCustomerPhone.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockOrderRepository.findByCustomerPhone("1234567890")
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when invalid customerPhone format is provided", async () => {
        mockOrderRepository.findByCustomerPhone.mockRejectedValue(
          new Error("Invalid phone number format")
        );

        await expect(
          mockOrderRepository.findByCustomerPhone("invalid-phone")
        ).rejects.toThrow("Invalid phone number format");
      });
    });
  });
  describe("findByCustomerEmail", () => {
    describe("Success", () => {
      test("should get  orders by customerEmail", async () => {
        mockOrderRepository.findByCustomerEmail.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        const orders = await mockOrderRepository.findByCustomerEmail(
          mockValidOrderDataRequestToOrderType.customerEmail as string
        );
        expect(orders).toEqual([mockValidOrderDataResponse]);
        expect(orders).not.toBeNull();
        expect(
          orders?.every(
            (o: any) =>
              o.customerEmail ===
              (mockValidOrderDataRequestToOrderType.customerEmail as string)
          )
        ).toBe(true);
        orders &&
          expect(orders[0]).toHaveProperty(
            "customerEmail",
            mockValidOrderDataRequestToOrderType.customerEmail as string
          );
      });
      test("should get a null if orders by customerEmail does not exists", async () => {
        mockOrderRepository.findByCustomerEmail.mockResolvedValue(null);
        const orders = await mockOrderRepository.findByCustomerEmail(
          "non-existent@example.com"
        );
        expect(orders).toBeNull();
        expect(mockOrderRepository.findByCustomerEmail).toHaveBeenCalledWith(
          "non-existent@example.com"
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database query failed";
        mockOrderRepository.findByCustomerEmail.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockOrderRepository.findByCustomerEmail("test@example.com")
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when invalid customerEmail format is provided", async () => {
        mockOrderRepository.findByCustomerEmail.mockRejectedValue(
          new Error("Invalid email format")
        );

        await expect(
          mockOrderRepository.findByCustomerEmail("invalid-email")
        ).rejects.toThrow("Invalid email format");
      });
    });
  });
  describe("findByCustomerName", () => {
    describe("Success", () => {
      test("should get  orders by customerName", async () => {
        mockOrderRepository.findByCustomerName.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        const orders = await mockOrderRepository.findByCustomerName(
          mockValidOrderDataRequestToOrderType.customerName
        );
        expect(orders).toEqual([mockValidOrderDataResponse]);
        expect(orders).not.toBeNull();
        expect(
          orders?.every(
            (o: any) =>
              o.customerName ===
              mockValidOrderDataRequestToOrderType.customerName
          )
        ).toBe(true);
        orders &&
          expect(orders[0]).toHaveProperty(
            "customerName",
            mockValidOrderDataRequestToOrderType.customerName
          );
      });
      test("should get a null if orders by customerName does not exists", async () => {
        mockOrderRepository.findByCustomerName.mockResolvedValue(null);
        const orders = await mockOrderRepository.findByCustomerName(
          "Non Existent Name"
        );
        expect(orders).toBeNull();
        expect(mockOrderRepository.findByCustomerName).toHaveBeenCalledWith(
          "Non Existent Name"
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database operation failed";
        mockOrderRepository.findByCustomerName.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockOrderRepository.findByCustomerName("Test User")
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when empty customerName is provided", async () => {
        mockOrderRepository.findByCustomerName.mockRejectedValue(
          new Error("Customer name cannot be empty")
        );

        await expect(
          mockOrderRepository.findByCustomerName("")
        ).rejects.toThrow("Customer name cannot be empty");
      });
    });
  });
  describe("findByProductId", () => {
    describe("Success", () => {
      test("should get  orders by  productId", async () => {
        const productId =
          mockValidOrderDataRequestToOrderType.products[0].productId;

        mockOrderRepository.findByProductId.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        const orders = await mockOrderRepository.findByProductId(productId);
        expect(orders).toEqual([mockValidOrderDataResponse]);
        expect(orders).not.toBeNull();
        expect(orders?.length).toBe(1);
        if (orders) {
          //verificar que la orden tenga el producto que estamos buscando
          expect(
            orders[0].products.some((p) => p.productId === productId)
          ).toBe(true);

          // Verificar propiedad especifica

          expect(orders[0].products[0]).toHaveProperty("productId", productId);
        }
        expect(mockOrderRepository.findByProductId).toHaveBeenCalledWith(
          productId
        );
      });
      test("should get a null if orders by ProductId does not exists", async () => {
        mockOrderRepository.findByProductId.mockResolvedValue(null);
        const orders = await mockOrderRepository.findByProductId(
          "non-existent-product-id"
        );
        expect(orders).toBeNull();
        expect(mockOrderRepository.findByProductId).toHaveBeenCalledWith(
          "non-existent-product-id"
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database error occurred";
        mockOrderRepository.findByProductId.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockOrderRepository.findByProductId("product-123")
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when invalid ProductId format is provided", async () => {
        mockOrderRepository.findByProductId.mockRejectedValue(
          new Error("Invalid product ID format")
        );

        await expect(
          mockOrderRepository.findByProductId("invalid-id")
        ).rejects.toThrow("Invalid product ID format");
      });
    });
  });
  describe("findByStatus", () => {
    describe("Success", () => {
      test("should get  orders by  whatsAppStatus", async () => {
        const whatsAppStatusName: WhatsAppStatusNames =
          mockValidOrderDataRequestToOrderType.whatsappStatus;

        mockOrderRepository.findByStatus.mockResolvedValue([
          mockValidOrderDataResponse,
        ]);
        const orders = await mockOrderRepository.findByStatus(
          whatsAppStatusName
        );
        expect(orders).toEqual([mockValidOrderDataResponse]);
        expect(orders).not.toBeNull();
        expect(orders?.length).toBe(1);
        if (orders) {
          //verificar que la orden tenga el producto que estamos buscando
          expect(
            orders.some((o) => o.whatsappStatus === whatsAppStatusName)
          ).toBe(true);

          //Verificar propiedad especifica
          expect(orders[0]).toHaveProperty(
            "whatsappStatus",
            whatsAppStatusName
          );
        }
        expect(mockOrderRepository.findByStatus).toHaveBeenCalledWith(
          whatsAppStatusName
        );
      });
      test("should get a null if orders by whatsAppStatus does not exists", async () => {
        mockOrderRepository.findByStatus.mockResolvedValue(null);
        const orders = await mockOrderRepository.findByStatus(
          WhatsAppStatusNames.COMPLETED
        );
        expect(orders).toBeNull();
        expect(mockOrderRepository.findByStatus).toHaveBeenCalledWith(
          WhatsAppStatusNames.COMPLETED
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Status query failed";
        mockOrderRepository.findByStatus.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockOrderRepository.findByStatus(WhatsAppStatusNames.PENDING)
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when invalid whatsAppStatus format is provided", async () => {
        mockOrderRepository.findByStatus.mockRejectedValue(
          new Error("Invalid status provided")
        );

        await expect(
          mockOrderRepository.findByStatus("INVALID_STATUS" as any)
        ).rejects.toThrow("Invalid status provided");
      });
    });
  });
});
