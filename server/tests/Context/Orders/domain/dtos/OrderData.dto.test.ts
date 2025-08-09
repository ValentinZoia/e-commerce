import {
  CreateOrderDTO,
  CreateOrderDto,
} from "../../../../../src/Orders/domain/dtos/OrderDataDto.dto";
import { ValidationError } from "../../../../../src/shared/domain/errors";
import { z } from "zod";
import { mockValidOrderDataRequest } from "../../../../helpers/factories/order-mocks";
import { WhatsAppStatusNames } from "../../../../../src/Orders/domain/entities/Order.entity";

describe("CreateOrderDto - Unit Test", () => {
  //simula la request.body:
  const validOrderDataWithMinimumRequairedFields = {
    customerName: "mario",
    customerEmail: "mario@gmail.com",
    customerPhone: "1112345678",
    customerNotes: "la quiero ya!",
    whatsappMessage: "hola querido",
    paymentMethod: "efectivo",
    products: mockValidOrderDataRequest.products,
    shippingCost: 0,
  };

  describe("Basic Validation", () => {
    test("should create DTO with valid data", () => {
      const dto: CreateOrderDto = CreateOrderDTO.create(
        mockValidOrderDataRequest
      );
      expect(dto.customerName).toBe(mockValidOrderDataRequest.customerName);
      expect(dto.customerEmail).toBe(mockValidOrderDataRequest.customerEmail);
      expect(dto.customerNotes).toBe(mockValidOrderDataRequest.customerNotes);
      expect(dto.isFreeShipping).toBe(mockValidOrderDataRequest.isFreeShipping);
      //...
    });
    test("should create DTO with minimum required valid data", () => {
      const dto: CreateOrderDto = CreateOrderDTO.create(
        validOrderDataWithMinimumRequairedFields
      );
      expect(dto.customerName).toBe(
        validOrderDataWithMinimumRequairedFields.customerName
      );
      expect(dto.customerEmail).toBe(
        validOrderDataWithMinimumRequairedFields.customerEmail
      );
      expect(dto.customerNotes).toBe(
        validOrderDataWithMinimumRequairedFields.customerNotes
      );
      expect(dto.customerPhone).toBe(
        validOrderDataWithMinimumRequairedFields.customerPhone
      );
      expect(dto.whatsappMessage).toBe(
        validOrderDataWithMinimumRequairedFields.whatsappMessage
      );
      expect(dto.products).toStrictEqual(
        validOrderDataWithMinimumRequairedFields.products
      );

      //...
    });
    test("should throw z.ZodError with invalid data", () => {
      expect(() => CreateOrderDTO.create({})).toThrow(z.ZodError);
    });
    test("should throw z.ZodError with invalid data", () => {
      expect(() => CreateOrderDTO.create({})).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when required fields are missing", () => {
      const invalidData = {
        customerEmail: "mario@gmail.com",
        // missing customerName, customerPhone, and products
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when customerName is empty", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        customerName: "",
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when customerPhone is empty", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        customerPhone: "",
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when products array is empty", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });
  });

  describe("Basic Logic Validation", () => {
    test("should throw z.ZodError if validation fails - negative numeric values", async () => {
      expect(() =>
        CreateOrderDTO.create({
          ...mockValidOrderDataRequest,
          shippingCost: -1,
          total: -1,
          subtotal: -1,
        })
      ).toThrow(z.ZodError);
    });
    test("should throw z.ZodError with invalid email format", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        customerEmail: "invalid-email",
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError with invalid whatsappStatus", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        whatsappStatus: "INVALID_STATUS",
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });
  });
  describe("Products Validation", () => {
    test("should throw z.ZodError when product has invalid data", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "", // empty productId
            productName: "Test Product",
            quantity: 1,
            unitPrice: 100,
          },
        ],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when product has negative quantity", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: -1,
            unitPrice: 100,
          },
        ],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when product has zero or negative unitPrice", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 1,
            unitPrice: 0,
          },
        ],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when product has discount > 1", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 1,
            unitPrice: 100,
            discount: 1.5, // invalid discount
          },
        ],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when product has negative discount", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 1,
            unitPrice: 100,
            discount: -0.1,
          },
        ],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });

    test("should throw z.ZodError when product has invalid imageUrl", () => {
      const invalidData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 1,
            unitPrice: 100,
            imageUrl: "not-a-valid-url",
          },
        ],
      };
      expect(() => CreateOrderDTO.create(invalidData)).toThrow(z.ZodError);
    });
  });

  describe("Optional Fields Handling", () => {
    test("should handle null customerEmail", () => {
      const dataWithNullEmail = {
        ...validOrderDataWithMinimumRequairedFields,
        customerEmail: null,
      };
      const dto = CreateOrderDTO.create(dataWithNullEmail);
      expect(dto.customerEmail).toBeNull();
    });

    test("should set default values for optional fields when not provided", () => {
      const minimalData = {
        customerName: "mario",
        customerPhone: "1112345678",
        products: mockValidOrderDataRequest.products, // unitPrice = 100; quantity = 1
      };
      const dto = CreateOrderDTO.create(minimalData);

      expect(dto.customerNotes).toBeNull();
      expect(dto.whatsappMessage).toBeNull();
      expect(dto.paymentMethod).toBeNull();
      expect(dto.subtotal).toBe(100);
      expect(dto.total).toBe(100);
      expect(dto.isFreeShipping).toBe(false);
      expect(dto.shippingCost).toBeNull();
      expect(dto.whatsappStatus).toBe(WhatsAppStatusNames.PENDING);
    });

    test("should handle null size in products", () => {
      const dataWithNullSize = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 1,
            unitPrice: 100,
            size: null,
          },
        ],
      };
      const dto = CreateOrderDTO.create(dataWithNullSize);
      expect(dto.products[0].size).toBeNull();
    });

    test("should handle null imageUrl in products", () => {
      const dataWithNullImage = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 1,
            unitPrice: 100,
            imageUrl: null,
          },
        ],
      };
      const dto = CreateOrderDTO.create(dataWithNullImage);
      expect(dto.products[0].imageUrl).toBeNull();
    });

    test("should set default quantity to 1 when not provided", () => {
      const dataWithoutQuantity = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            unitPrice: 100,
            // quantity not provided
          },
        ],
      };
      const dto = CreateOrderDTO.create(dataWithoutQuantity);
      expect(dto.products[0].quantity).toBe(1);
    });

    test("should set default discount to 0 when not provided", () => {
      const dataWithoutDiscount = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Test Product",
            quantity: 2,
            unitPrice: 100,
            // discount not provided
          },
        ],
      };
      const dto = CreateOrderDTO.create(dataWithoutDiscount);
      expect(dto.products[0].discount).toBe(0);
    });
  });

  describe("Business Logic Calculations", () => {
    test("should calculate subtotal correctly without discount", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Product 1",
            quantity: 2,
            unitPrice: 50,
            discount: 0,
          },
          {
            productId: "456",
            productName: "Product 2",
            quantity: 1,
            unitPrice: 30,
            discount: 0,
          },
        ],
      };
      const dto = CreateOrderDTO.create(testData);
      expect(dto.subtotal).toBe(130); // (2 * 50) + (1 * 30)
    });

    test("should calculate subtotal correctly with discount", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Product 1",
            quantity: 2,
            unitPrice: 100,
            discount: 0.1, // 10% discount
          },
        ],
      };
      const dto = CreateOrderDTO.create(testData);
      expect(dto.subtotal).toBe(180); // 2 * 100 * (1 - 0.1) = 2 * 100 * 0.9 = 180
    });

    test("should set shippingCost to 0 when isFreeShipping is true", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        isFreeShipping: true,
        shippingCost: 25,
      };
      const dto = CreateOrderDTO.create(testData);
      expect(dto.shippingCost).toBe(0);
    });

    test("should calculate total correctly with shipping cost", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Product 1",
            quantity: 1,
            unitPrice: 100,
            discount: 0,
          },
        ],
        shippingCost: 15,
      };
      const dto = CreateOrderDTO.create(testData);
      expect(dto.subtotal).toBe(100);
      expect(dto.shippingCost).toBe(15);
      expect(dto.total).toBe(115);
    });

    test("should calculate total correctly with free shipping", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Product 1",
            quantity: 1,
            unitPrice: 100,
            discount: 0,
          },
        ],
        isFreeShipping: true,
        shippingCost: 15, // should be ignored
      };
      const dto = CreateOrderDTO.create(testData);
      expect(dto.subtotal).toBe(100);
      expect(dto.shippingCost).toBe(0);
      expect(dto.total).toBe(100);
    });

    test("should set shippingCost to null when not provided and not free shipping", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Product 1",
            quantity: 1,
            unitPrice: 100,
            discount: 0,
          },
        ],
        isFreeShipping: false,
        // shippingCost not provided
      };

      const dto = CreateOrderDTO.create(testData);
      expect(dto.shippingCost).toBe(null);
      expect(dto.total).toBe(100);
    });
  });

  describe("WhatsApp Status Validation", () => {
    test("should accept valid whatsappStatus values", () => {
      const validStatuses = [
        WhatsAppStatusNames.PENDING,
        WhatsAppStatusNames.COMPLETED,
        WhatsAppStatusNames.RESPONDED,
        WhatsAppStatusNames.SENT,
      ];

      validStatuses.forEach((status) => {
        const testData = {
          ...validOrderDataWithMinimumRequairedFields,
          whatsappStatus: status,
        };
        const dto = CreateOrderDTO.create(testData);
        expect(dto.whatsappStatus).toBe(status);
      });
    });

    test("should set default whatsappStatus to PENDING when not provided", () => {
      const testData = { ...validOrderDataWithMinimumRequairedFields };

      const dto = CreateOrderDTO.create(testData);
      expect(dto.whatsappStatus).toBe(WhatsAppStatusNames.PENDING);
    });
  });

  describe("Edge Cases", () => {
    test("should handle very large numbers correctly", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "123",
            productName: "Expensive Product",
            quantity: 999999,
            unitPrice: 999999.99,
            discount: 0,
          },
        ],
        shippingCost: 999999.99,
      };
      const dto = CreateOrderDTO.create(testData);
      expect(dto.subtotal).toBe(999999 * 999999.99);
      expect(dto.total).toBe(999999 * 999999.99 + 999999.99);
    });

    test("should handle multiple products with different discounts", () => {
      const testData = {
        ...validOrderDataWithMinimumRequairedFields,
        products: [
          {
            productId: "1",
            productName: "Product 1",
            quantity: 2,
            unitPrice: 100,
            discount: 0.2, // 20% off
          },
          {
            productId: "2",
            productName: "Product 2",
            quantity: 3,
            unitPrice: 50,
            discount: 0.1, // 10% off
          },
          {
            productId: "3",
            productName: "Product 3",
            quantity: 1,
            unitPrice: 200,
            discount: 0, // no discount
          },
        ],
      };
      const dto = CreateOrderDTO.create(testData);

      // Product 1: 2 * 100 * 0.8 = 160
      // Product 2: 3 * 50 * 0.9 = 135
      // Product 3: 1 * 200 * 1 = 200
      // Total subtotal: 160 + 135 + 200 = 495
      expect(dto.subtotal).toBe(495);
    });

    test("should handle complex calculation with all optional fields", () => {
      const testData = {
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: "1234567890",
        customerNotes: "Special instructions",
        whatsappMessage: "Hello there",
        whatsappStatus: WhatsAppStatusNames.SENT,
        paymentMethod: "credit_card",
        isFreeShipping: false,
        shippingCost: 10.5,
        products: [
          {
            productId: "prod1",
            productName: "Premium Product",
            quantity: 2,
            unitPrice: 99.99,
            discount: 0.15,
            size: "Large",
            imageUrl: "https://example.com/image.jpg",
          },
        ],
      };

      const dto = CreateOrderDTO.create(testData);

      expect(dto.subtotal).toBe(2 * 99.99 * 0.85); // 169.9830
      expect(dto.total).toBe(2 * 99.99 * 0.85 + 10.5);
      expect(dto.customerName).toBe("John Doe");
      expect(dto.whatsappStatus).toBe(WhatsAppStatusNames.SENT);
      expect(dto.products[0].size).toBe("Large");
      expect(dto.products[0].imageUrl).toBe("https://example.com/image.jpg");
    });
  });
});
