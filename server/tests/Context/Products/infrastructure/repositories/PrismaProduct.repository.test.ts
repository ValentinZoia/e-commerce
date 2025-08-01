import { mockProductRepository } from "../../__mocks__/repositories/MockProductRepository";
import {
  mockValidProductDataRequestConvertedToProductType,
  mockValidProductDataResponse,
} from "../../../../helpers/factories/product-mocks";
import { Product as ProductPrisma } from "../../../../../src/generated/prisma";

describe("PrismaProductRepository - Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    describe("Success", () => {
      test("should create a product", async () => {
        mockProductRepository.create.mockResolvedValue(
          mockValidProductDataResponse as ProductPrisma
        );

        const product = await mockProductRepository.create(
          mockValidProductDataRequestConvertedToProductType
        );
        expect(product).toEqual(mockValidProductDataResponse);
      });
    });
    describe("Failure", () => {
      test("should throw error when product creation fails", async () => {
        const errorMessage = "Database connection error";
        mockProductRepository.create.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockProductRepository.create(
            mockValidProductDataRequestConvertedToProductType
          )
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when required fields are missing", async () => {
        const invalidProduct = {
          ...mockValidProductDataRequestConvertedToProductType,
          name: undefined,
        };
        mockProductRepository.create.mockRejectedValue(
          new Error("Name is required")
        );

        await expect(
          mockProductRepository.create(invalidProduct as any)
        ).rejects.toThrow("Name is required");
      });
    });
  });
  describe("update", () => {
    describe("Success", () => {
      test("should update a product", async () => {
        mockProductRepository.update.mockResolvedValue(
          mockValidProductDataResponse as ProductPrisma
        );

        const product = await mockProductRepository.update(
          mockValidProductDataResponse.id as string,
          mockValidProductDataRequestConvertedToProductType
        );
        expect(product).toEqual(mockValidProductDataResponse);
      });
    });
    describe("Failure", () => {
      test("should throw error when product update fails", async () => {
        const errorMessage = "Update failed: Product not found";
        mockProductRepository.update.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockProductRepository.update(
            "invalid-id",
            mockValidProductDataRequestConvertedToProductType
          )
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when trying to update non-existent product", async () => {
        mockProductRepository.update.mockRejectedValue(
          new Error("Record to update not found")
        );

        await expect(
          mockProductRepository.update(
            "non-existent-id",
            mockValidProductDataRequestConvertedToProductType
          )
        ).rejects.toThrow("Record to update not found");
      });
    });
  });
  describe("delete", () => {
    describe("Success", () => {
      test("should delete a product", async () => {
        mockProductRepository.delete.mockResolvedValue(Promise.resolve());

        const product = await mockProductRepository.delete(
          mockValidProductDataResponse.id as string
        );
        expect(product).toBeUndefined();
      });
    });
    describe("Failure", () => {
      test("should throw error when product deletion fails", async () => {
        const errorMessage = "Deletion failed: Database error";
        mockProductRepository.delete.mockRejectedValue(new Error(errorMessage));

        await expect(
          mockProductRepository.delete(
            mockValidProductDataResponse.id as string
          )
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when trying to delete non-existent product", async () => {
        mockProductRepository.delete.mockRejectedValue(
          new Error("Record to delete does not exist")
        );

        await expect(
          mockProductRepository.delete("non-existent-id")
        ).rejects.toThrow("Record to delete does not exist");
      });
    });
  });
  describe("getAll", () => {
    describe("Success", () => {
      test("should get all products", async () => {
        mockProductRepository.getAll.mockResolvedValue([
          mockValidProductDataResponse as ProductPrisma,
        ]);
        const products = await mockProductRepository.getAll();
        expect(products).toEqual([mockValidProductDataResponse]);
      });
      test("should get all product with options - fratured true", async () => {
        mockProductRepository.getAll.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
            isNew: false,
            isFeatured: true,
            isPromotion: false,
          },
        ]);
        const products = await mockProductRepository.getAll({ featured: true });
        expect(products).toEqual([
          {
            ...mockValidProductDataResponse,
            isNew: false,
            isFeatured: true,
            isPromotion: false,
          },
        ]);
        expect(products[0].isFeatured).toEqual(true);
      });
      test("should get all product with options - promotion true", async () => {
        mockProductRepository.getAll.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
            isNew: false,
            isFeatured: false,
            isPromotion: true,
          },
        ]);
        const products = await mockProductRepository.getAll({
          promotion: true,
        });
        expect(products).toEqual([
          {
            ...mockValidProductDataResponse,
            isNew: false,
            isFeatured: false,
            isPromotion: true,
          },
        ]);
        expect(products[0].isPromotion).toEqual(true);
      });
      test("should get all product with options - new true", async () => {
        mockProductRepository.getAll.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
            isNew: true,
            isFeatured: false,
            isPromotion: false,
          },
        ]);
        const products = await mockProductRepository.getAll({ new: true });
        expect(products).toEqual([
          {
            ...mockValidProductDataResponse,
            isNew: true,
            isFeatured: false,
            isPromotion: false,
          },
        ]);
        expect(products[0].isNew).toEqual(true);
      });
      test("should get all product with options - by category", async () => {
        mockProductRepository.getAll.mockResolvedValue([
          {
            ...mockValidProductDataResponse,
          },
        ]);
        const products = await mockProductRepository.getAll({
          category: "category-test-id",
        });
        expect(products).toEqual([
          {
            ...mockValidProductDataResponse,
          },
        ]);
        expect(products[0].categoryId).toEqual("category-test-id");
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database query failed";
        mockProductRepository.getAll.mockRejectedValue(new Error(errorMessage));

        await expect(mockProductRepository.getAll()).rejects.toThrow(
          errorMessage
        );
      });

      test("should throw error when invalid filter options are provided", async () => {
        mockProductRepository.getAll.mockRejectedValue(
          new Error("Invalid filter options")
        );

        await expect(
          mockProductRepository.getAll({ invalidOption: true } as any)
        ).rejects.toThrow("Invalid filter options");
      });
    });
  });
  describe("getById", () => {
    describe("Success", () => {
      test("should get a product by id", async () => {
        mockProductRepository.getById.mockResolvedValue(
          mockValidProductDataResponse as ProductPrisma
        );
        const product = await mockProductRepository.getById(
          mockValidProductDataResponse.id as string
        );
        expect(product).toEqual(mockValidProductDataResponse);
        expect(product).toHaveProperty("id", mockValidProductDataResponse.id);
      });
      test("should get a null if product by id does not exist", async () => {
        mockProductRepository.getById.mockResolvedValue(null);
        const product = await mockProductRepository.getById(
          mockValidProductDataResponse.id as string
        );
        expect(product).toBeNull();
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database connection error";
        mockProductRepository.getById.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(mockProductRepository.getById("some-id")).rejects.toThrow(
          errorMessage
        );
      });

      test("should throw error when invalid ID format is provided", async () => {
        mockProductRepository.getById.mockRejectedValue(
          new Error("Invalid ID format")
        );

        await expect(
          mockProductRepository.getById("invalid-id-format")
        ).rejects.toThrow("Invalid ID format");
      });
    });
  });
  describe("getByName", () => {
    describe("Success", () => {
      test("should get a product by name", async () => {
        mockProductRepository.getByName.mockResolvedValue(
          mockValidProductDataResponse as ProductPrisma
        );
        const product = await mockProductRepository.getByName(
          mockValidProductDataResponse.name as string
        );
        expect(product).toEqual(mockValidProductDataResponse);
        expect(product).toHaveProperty(
          "name",
          mockValidProductDataResponse.name
        );
      });
      test("should get a null if product by name does not exist", async () => {
        mockProductRepository.getByName.mockResolvedValue(null);
        const product = await mockProductRepository.getByName(
          mockValidProductDataResponse.name as string
        );
        expect(product).toBeNull();
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database connection error";
        mockProductRepository.getByName.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockProductRepository.getByName("some-name")
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when empty name is provided", async () => {
        mockProductRepository.getByName.mockRejectedValue(
          new Error("Name cannot be empty")
        );

        await expect(mockProductRepository.getByName("")).rejects.toThrow(
          "Name cannot be empty"
        );
      });
    });
  });
});
