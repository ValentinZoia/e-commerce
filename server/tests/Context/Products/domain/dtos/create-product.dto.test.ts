import { CreateProductDto } from "../../../../../src/Products/domain/dtos";
import { ValidationError } from "../../../../../src/shared/domain/errors";
import { z } from "zod";
import {
  mockInvalidProductDataCashPriceDontMatchWithPriceByCashDiscount,
  mockInvalidProductDataCashPriceGreaterThanPrice,
  mockInvalidProductDataDontMatchStockForSizesAndtotalStockRequest,
  mockInvalidProductDataNegativePriceAndPercentagesAndStockRequest,
} from "../../../../helpers/factories/product-mocks";
describe("CreateProductDto - Unit Test", () => {
  //simula lo que llegaria de la peticion como request.body
  const validRequestProductData = {
    name: "Camiseta Premium",
    description: "Algodón 100%",
    price: 100,
    discountPercentage: 0.1,
    cashPrice: 90,
    cashDiscountPercentage: 0.1,
    stock: 50,
    sizes: [{ name: "M", stock: 50 }],
    installments: [{ quantity: 3, amount: 33.33 }],
    currentSize: "M",
    categoryId: "cat-1",
    images: ["https://example.com/image.jpg"],
  };
  const validRequestProductDataWithMinimumRequairedFields = {
    name: "Camiseta Premium",
    description: "Algodón 100%",
    price: 100,
    categoryId: "cat-1",
  };

  describe("Basic Validation", () => {
    test("should create DTO with valid data", () => {
      const dto = CreateProductDto.create(validRequestProductData);
      expect(dto).toBeInstanceOf(CreateProductDto);
      expect(dto.name).toBe(validRequestProductData.name);
      expect(dto.description).toBe(validRequestProductData.description);
      expect(dto.price).toBe(validRequestProductData.price);
    });
    test("should create DTO with minimum required valid data", () => {
      const dto = CreateProductDto.create(
        validRequestProductDataWithMinimumRequairedFields
      );

      expect(dto).toBeInstanceOf(CreateProductDto);
      expect(dto.name).toBe(
        validRequestProductDataWithMinimumRequairedFields.name
      );
      expect(dto.description).toBe(
        validRequestProductDataWithMinimumRequairedFields.description
      );
      expect(dto.price).toBe(
        validRequestProductDataWithMinimumRequairedFields.price
      );
      expect(dto.categoryId).toBe(
        validRequestProductDataWithMinimumRequairedFields.categoryId
      );
      expect(dto.currentSize).toBe(null);
      expect(dto.stock).toBe(1);
      expect(dto.discountPercentage).toBe(0);
      expect(dto.cashDiscountPercentage).toBe(0);
    });
    test("should throw z.ZodError with invalid data", () => {
      expect(() => CreateProductDto.create({})).toThrow(z.ZodError);
    });
  });

  describe("Business Logic Validation", () => {
    test("should throw z.ZodError if validation fails - negative numeric values", async () => {
      expect(() =>
        CreateProductDto.create(
          mockInvalidProductDataNegativePriceAndPercentagesAndStockRequest
        )
      ).toThrow(z.ZodError);
    });

    test("should throw ValidationError if it validation fails - stock sizes dont match with total stock", async () => {
      expect(() =>
        CreateProductDto.create(
          mockInvalidProductDataDontMatchStockForSizesAndtotalStockRequest
        )
      ).toThrow(ValidationError);
    });
    test("should validate currentSize exists in sizes", () => {
      const invalidData = {
        ...validRequestProductData,
        currentSize: "XL", // No existe en sizes
        sizes: [{ name: "M", stock: 50 }],
      };

      expect(() => CreateProductDto.create(invalidData)).toThrow(
        ValidationError
      );
    });

    test("should throw ValidationError if it validation fails - exist a cashDiscountPercentage and the cashPrice is greater than price ", async () => {
      expect(() =>
        CreateProductDto.create(mockInvalidProductDataCashPriceGreaterThanPrice)
      ).toThrow(ValidationError);
    });
    test("should throw ValidationError if it validation fails - exist a cashDiscountPercentage and the cashPrice dont match with price * (1 - cashDiscountPercentage) ", async () => {
      expect(() =>
        CreateProductDto.create(
          mockInvalidProductDataCashPriceDontMatchWithPriceByCashDiscount
        )
      ).toThrow(ValidationError);
    });
  });

  describe("Optional Fileds Handling", () => {
    test("should handle empty sizes array", () => {
      const dto = CreateProductDto.create({
        ...validRequestProductData,
        sizes: [],
      });
      expect(dto.sizes).toEqual([]);
    });
    test("should handle empty installments array", () => {
      const dto = CreateProductDto.create({
        ...validRequestProductData,
        installments: [],
      });
      expect(dto.installments).toEqual([]);
    });
    test("should handle empty images array", () => {
      const dto = CreateProductDto.create({
        ...validRequestProductData,
        images: [],
      });
      expect(dto.images).toEqual([]);
    });
    test("should handle null cashPrice", () => {
      const dto = CreateProductDto.create({
        ...validRequestProductData,
        cashPrice: null,
      });

      expect(dto.cashPrice).toBe(null);
    });
    test("should handle null currentSize", () => {
      const dto = CreateProductDto.create({
        ...validRequestProductData,
        currentSize: null,
      });

      expect(dto.currentSize).toBe(null);
    });
    test("should handle null freeShippingThreshold", () => {
      const dto = CreateProductDto.create({
        ...validRequestProductData,
        freeShippingThreshold: null,
      });

      expect(dto.freeShippingThreshold).toBe(null);
    });
  });

  describe("Edge Cases", () => {
    test("should accept minimum valid name length (3)", () => {
      const data = {
        ...validRequestProductData,
        name: "ABC", // 3 caracteres
      };

      expect(() => CreateProductDto.create(data)).not.toThrow();
    });

    test("should reject discount > 1", () => {
      const invalidData = {
        ...validRequestProductData,
        discountPercentage: 1.1,
      };

      expect(() => CreateProductDto.create(invalidData)).toThrow(z.ZodError);
    });

    test("should accept zero stock", () => {
      const data = {
        ...validRequestProductData,
        stock: 0,
        sizes: [{ name: "M", stock: 0 }],
      };

      expect(() => CreateProductDto.create(data)).not.toThrow();
    });
  });
});
