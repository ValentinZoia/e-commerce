import {
  Order,
  WhatsAppStatusNames,
} from "../../../../../src/Orders/domain/entities/Order.entity";
import { OrderBuilder } from "../../../../../src/Orders/domain/entities/Order.builder";
import { OrderItem } from "../../../../../src/Orders/domain/entities/OrderItem.entity";

describe("Order and OrderBuilder", () => {
  const mockOrderItem = new OrderItem(
    "item-1",
    "order-1",
    "product-1",
    "Test Product",
    2,
    "M",
    100,
    0.1,
    "test.jpg"
  );

  const mockDate = new Date("2023-01-01T00:00:00Z");

  describe("OrderBuilder", () => {
    it("should build an empty order by default", () => {
      const builder = new OrderBuilder();
      const order = builder.build();

      expect(order).toBeInstanceOf(Order);
      expect(order.id).toBeNull();
      expect(order.customerPhone).toBe("");
      expect(order.products).toEqual([]);
    });

    it("should set all properties correctly", () => {
      const order = new OrderBuilder()
        .setId("order-1")
        .setCustomerPhone("1234567890")
        .setCustomerEmail("test@example.com")
        .setCustomerName("Test User")
        .setCustomerNotes("Test notes")
        .setProducts([mockOrderItem])
        .setWhatsappMessage("Test message")
        .setWhatsappStatus(WhatsAppStatusNames.SENT)
        .setPaymentMethod("CASH")
        .setSubtotal(180)
        .setShippingCost(20)
        .setTotal(200)
        .setIsFreeShipping(false)
        .setCreatedAt(mockDate)
        .setUpdatedAt(mockDate)
        .setWhatsappSentAt(mockDate)
        .setCompletedAt(mockDate)
        .setExpiredAt(null)
        .build();

      expect(order.id).toBe("order-1");
      expect(order.customerPhone).toBe("1234567890");
      expect(order.customerEmail).toBe("test@example.com");
      expect(order.customerName).toBe("Test User");
      expect(order.customerNotes).toBe("Test notes");
      expect(order.products).toEqual([mockOrderItem]);
      expect(order.whatsappMessage).toBe("Test message");
      expect(order.whatsappStatus).toBe(WhatsAppStatusNames.SENT);
      expect(order.paymentMethod).toBe("CASH");
      expect(order.subtotal).toBe(180);
      expect(order.shippingCost).toBe(20);
      expect(order.total).toBe(200);
      expect(order.isFreeShipping).toBe(false);
      expect(order.createdAt).toBe(mockDate);
      expect(order.updatedAt).toBe(mockDate);
      expect(order.whatsappSentAt).toBe(mockDate);
      expect(order.completedAt).toBe(mockDate);
      expect(order.expiredAt).toBeNull();
    });

    it("should allow chaining of methods", () => {
      const builder = new OrderBuilder()
        .setId("order-1")
        .setCustomerPhone("1234567890")
        .setCustomerName("Test User");

      expect(builder).toBeInstanceOf(OrderBuilder);
      const order = builder.build();
      expect(order.id).toBe("order-1");
      expect(order.customerPhone).toBe("1234567890");
      expect(order.customerName).toBe("Test User");
    });
  });

  describe("Order Entity", () => {
    let order: Order;

    beforeEach(() => {
      order = new Order(
        "order-1",
        "1234567890",
        "test@example.com",
        "Test User",
        "Test notes",
        [mockOrderItem],
        null,
        WhatsAppStatusNames.PENDING,
        "CASH",
        180,
        20,
        200,
        false,
        mockDate,
        mockDate,
        null,
        null,
        null
      );
    });

    it("should initialize with correct values", () => {
      expect(order.id).toBe("order-1");
      expect(order.customerPhone).toBe("1234567890");
      expect(order.whatsappStatus).toBe(WhatsAppStatusNames.PENDING);
      expect(order.products.length).toBe(1);
    });

    describe("calculateTotals()", () => {
      it("should calculate subtotal correctly", () => {
        // 2 items at 100 each with 10% discount: 2 * 100 * 0.9 = 180
        order.products = [
          new OrderItem("1", "order-1", "p1", "Product 1", 2, "M", 100, 0.1),
          new OrderItem("2", "order-1", "p2", "Product 2", 1, "L", 50, 0),
        ];

        order.calculateTotals();

        // (2 * 100 * 0.9) + (1 * 50 * 1) = 180 + 50 = 230
        expect(order.subtotal).toBe(230);
      });

      it("should handle free shipping", () => {
        order.isFreeShipping = true;
        order.shippingCost = 50;

        order.calculateTotals();

        expect(order.shippingCost).toBe(0);
        expect(order.total).toBe(order.subtotal);
      });

      it("should update the updatedAt timestamp", () => {
        const oldUpdatedAt = order.updatedAt;
        order.calculateTotals();

        expect(order.updatedAt.getTime()).toBeGreaterThan(
          oldUpdatedAt.getTime()
        );
      });
    });

    describe("generateWhatsAppMessage()", () => {
      it("should generate a proper message format", () => {
        const message = order.generateWhatsAppMessage();

        expect(message).toContain(`¡Hola ${order.customerName}! 👋`);
        expect(message).toContain("Resumen de tu pedido:");
        expect(message).toContain(
          `- ${mockOrderItem.productName} (Talle ${mockOrderItem.size}): ${
            mockOrderItem.quantity
          } x $${mockOrderItem.unitPrice.toFixed(2)}`
        );
        expect(message).toContain(`Subtotal: $${order.subtotal.toFixed(2)}`);
        expect(message).toContain(
          `Envío: $${(order.shippingCost || 0).toFixed(2)}`
        );
        expect(message).toContain(`TOTAL: $${order.total.toFixed(2)}`);
        expect(message).toContain("Por favor confirmame:");
      });

      it("should handle products without size", () => {
        const itemWithoutSize = new OrderItem(
          "item-2",
          "order-1",
          "product-2",
          "Product 2",
          1,
          null,
          50,
          0
        );
        order.products = [itemWithoutSize];

        const message = order.generateWhatsAppMessage();

        expect(message).toContain(
          `- ${itemWithoutSize.productName}: ${
            itemWithoutSize.quantity
          } x $${itemWithoutSize.unitPrice.toFixed(2)}`
        );
        expect(message).not.toContain("(Talle");
      });

      it("should handle empty products list", () => {
        order.products = [];
        order.calculateTotals();
        const message = order.generateWhatsAppMessage();

        expect(message).toContain("Resumen de tu pedido:");
        expect(message).toContain("Subtotal: $0.00");
      });
    });

    describe("WhatsAppStatus", () => {
      it("should accept all valid status values", () => {
        const testStatus = (status: typeof order.whatsappStatus) => {
          order.whatsappStatus = status;
          expect(Object.values(WhatsAppStatusNames)).toContain(
            order.whatsappStatus
          );
        };

        testStatus(WhatsAppStatusNames.PENDING);
        testStatus(WhatsAppStatusNames.SENT);
        testStatus(WhatsAppStatusNames.RESPONDED);
        testStatus(WhatsAppStatusNames.COMPLETED);
      });
    });
  });
});
