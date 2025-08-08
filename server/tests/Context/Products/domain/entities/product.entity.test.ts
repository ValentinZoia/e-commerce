import {
  Installment,
  ProductBuilder,
  Size,
} from "../../../../../src/Products/domain/entities";
import {
  mockValidProductDataRequestConvertedToProductType,
  mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType,
} from "../../../../helpers/factories/product-mocks";
import { ValidationError } from "../../../../../src/shared/domain/errors";

describe("Product Entity / Product Builder - Unit Test", () => {
  let productBuilder: ProductBuilder;
  beforeEach(() => {
    jest.clearAllMocks();
    productBuilder = new ProductBuilder();
  });

  describe("Create Product Successfully", () => {
    test("should create a product", () => {
      const product = productBuilder
        .from(mockValidProductDataRequestConvertedToProductType)
        .build();

      expect(product).toEqual(
        mockValidProductDataRequestConvertedToProductType
      );
    });

    test("should create a product with minimum data", () => {
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .build();

      expect(product.name).toBe(
        mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType.name
      );
      expect(product.description).toBe(
        mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType.description
      );
      expect(product.price).toBe(
        mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType.price
      );
      expect(product.categoryId).toBe(
        mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType.categoryId
      );
    });
  });

  describe("Convenience Methods", () => {
    test("setAsFeatured() should set isFeatured to true", () => {
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .setAsFeatured()
        .build();
      expect(product.isFeatured).toBe(true);
    });

    test("setAsPromotion() should set flags and discount", () => {
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .setAsPromotion(0.15)
        .build();
      expect(product.isPromotion).toBe(true);
      expect(product.discountPercentage).toBe(0.15);
    });

    test("enableFreeShipping() should set threshold when provided", () => {
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .enableFreeShipping(150)
        .build();
      expect(product.isFreeShipping).toBe(true);
      expect(product.freeShippingThreshold).toBe(150);
    });
  });
  describe("Array Handling", () => {
    test("should handle empty arrays when not provided", () => {
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .build();

      expect(product.sizes).toEqual([]);
      expect(product.installments).toEqual([]);
      expect(product.images).toEqual([]);
    });
    test("should handle sizes with addSize()", () => {
      const size: Size = { name: "L", stock: 3 };
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .addSize(size)
        .build();
      expect(product.sizes).toContainEqual(size);
    });

    test("should handle installments with addInstallment()", () => {
      const installment: Installment = { quantity: 6, amount: 16.66 };
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .addInstallment(installment)
        .build();
      expect(product.installments).toContainEqual(installment);
    });

    test("should handle images with addImage()", () => {
      const product = productBuilder
        .from(
          mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
        )
        .addImage("photo.jpg")
        .build();
      expect(product.images).toContain("photo.jpg");
    });
  });
  describe("Validation", () => {
    test("should throw ValidationError when missing required fields", () => {
      expect(() => productBuilder.build()).toThrow(ValidationError);
    });

    test("should throw when name is empty", () => {
      expect(() =>
        productBuilder
          .from(
            mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
          )
          .setName("")
          .build()
      ).toThrow(ValidationError);
    });

    test("should throw when price is zero", () => {
      expect(() =>
        productBuilder
          .from(
            mockValidProductDataWithMinimumRequairedFieldsRequestConvertedToProductType
          )
          .setPrice(0)
          .build()
      ).toThrow(ValidationError);
    });
  });
  describe("from() method", () => {
    test("should copy properties from existing product", () => {
      const copy = productBuilder
        .from(mockValidProductDataRequestConvertedToProductType)
        .build();
      expect(copy.id).toBe(
        mockValidProductDataRequestConvertedToProductType.id
      );
      expect(copy.name).toBe(
        mockValidProductDataRequestConvertedToProductType.name
      );
    });

    test("should override properties after from()", () => {
      const modified = productBuilder
        .from(mockValidProductDataRequestConvertedToProductType)
        .setName("Modified")
        .setDescription("New Desc")
        .build();

      expect(modified.name).toBe("Modified");
      expect(modified.price).toBe(100); // Mantiene el valor original
    });
  });
});
