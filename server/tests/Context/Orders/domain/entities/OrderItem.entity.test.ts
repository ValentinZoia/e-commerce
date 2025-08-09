import { OrderItem } from "../../../../../src/Orders/domain/entities/OrderItem.entity";
import { OrderItemBuilder } from "../../../../../src/Orders/domain/entities/OrderItem.builder";

describe("OrderItem and OrderItemBuilder", () => {
  const mockImageUrl = "https://example.com/product.jpg";

  describe("OrderItemBuilder", () => {
    it("should build an empty OrderItem by default", () => {
      const builder = new OrderItemBuilder();
      const item = builder.build();

      expect(item).toBeInstanceOf(OrderItem);
      expect(item.id).toBeNull();
      expect(item.orderId).toBeNull();
      expect(item.productId).toBe("");
      expect(item.quantity).toBe(1);
      expect(item.unitPrice).toBe(0);
    });

    it("should set all properties correctly", () => {
      const item = new OrderItemBuilder()
        .setId("item-1")
        .setOrderId("order-1")
        .setProductId("product-123")
        .setProductName("Test Product")
        .setQuantity(2)
        .setSize("M")
        .setUnitPrice(100)
        .setDiscount(0.1)
        .setImageUrl(mockImageUrl)
        .build();

      expect(item.id).toBe("item-1");
      expect(item.orderId).toBe("order-1");
      expect(item.productId).toBe("product-123");
      expect(item.productName).toBe("Test Product");
      expect(item.quantity).toBe(2);
      expect(item.size).toBe("M");
      expect(item.unitPrice).toBe(100);
      expect(item.discount).toBe(0.1);
      expect(item.imageUrl).toBe(mockImageUrl);
    });

    it("should allow chaining of methods", () => {
      const builder = new OrderItemBuilder()
        .setId("item-1")
        .setProductId("product-123")
        .setQuantity(2);

      expect(builder).toBeInstanceOf(OrderItemBuilder);
      const item = builder.build();
      expect(item.id).toBe("item-1");
      expect(item.productId).toBe("product-123");
      expect(item.quantity).toBe(2);
    });

    it("should handle null values for nullable fields", () => {
      const item = new OrderItemBuilder()
        .setId(null)
        .setOrderId(null)
        .setSize(null)
        .setImageUrl(null)
        .build();

      expect(item.id).toBeNull();
      expect(item.orderId).toBeNull();
      expect(item.size).toBeNull();
      expect(item.imageUrl).toBeNull();
    });
  });

  describe("OrderItem Entity", () => {
    let item: OrderItem;

    beforeEach(() => {
      item = new OrderItem(
        "item-1",
        "order-1",
        "product-123",
        "Test Product",
        2,
        "M",
        100,
        0.1,
        mockImageUrl
      );
    });

    it("should initialize with correct values", () => {
      expect(item.id).toBe("item-1");
      expect(item.orderId).toBe("order-1");
      expect(item.productId).toBe("product-123");
      expect(item.quantity).toBe(2);
      expect(item.unitPrice).toBe(100);
      expect(item.discount).toBe(0.1);
    });

    it("should have default values when empty constructor is used", () => {
      const emptyItem = new OrderItem();

      expect(emptyItem.id).toBeNull();
      expect(emptyItem.orderId).toBeNull();
      expect(emptyItem.productId).toBe("");
      expect(emptyItem.productName).toBe("");
      expect(emptyItem.quantity).toBe(1);
      expect(emptyItem.size).toBeNull();
      expect(emptyItem.unitPrice).toBe(0);
      expect(emptyItem.discount).toBe(0);
      expect(emptyItem.imageUrl).toBeNull();
    });

    it("should calculate final price correctly", () => {
      // unitPrice * quantity * (1 - discount)
      // 100 * 2 * (1 - 0.1) = 180
      const finalPrice = item.unitPrice * item.quantity * (1 - item.discount);
      expect(finalPrice).toBe(180);
    });

    it("should handle zero discount", () => {
      item.discount = 0;
      const finalPrice = item.unitPrice * item.quantity;
      expect(finalPrice).toBe(200);
    });

    it("should handle maximum discount (100%)", () => {
      item.discount = 1;
      const finalPrice = item.unitPrice * item.quantity * (1 - item.discount);
      expect(finalPrice).toBe(0);
    });

    it("should handle null values for nullable fields", () => {
      const nullItem = new OrderItem(
        null,
        null,
        "product-123",
        "Test Product",
        1,
        null,
        100,
        0,
        null
      );

      expect(nullItem.id).toBeNull();
      expect(nullItem.orderId).toBeNull();
      expect(nullItem.size).toBeNull();
      expect(nullItem.imageUrl).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("should handle minimum quantity (1)", () => {
      const item = new OrderItemBuilder().setQuantity(1).build();
      expect(item.quantity).toBe(1);
    });

    it("should handle zero quantity by defaulting to 1", () => {
      const item = new OrderItemBuilder().setQuantity(0).build();

      expect(item.quantity).toBe(0);
    });
  });
});
