import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";
import {
  mockValidCategoryDataRequest,
  mockValidCategoryDataRequestToCategory,
  mockValidCategoryDataResponse,
  mockValidCategoryDataResponseV2,
} from "../../../../helpers/factories/category-mocks";
import { Category as CategoryPrisma } from "../../../../../src/generated/prisma";

describe("PrismaCategoryRepository - Unit Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    describe("Success", () => {
      test("should create a category", async () => {
        mockCategoryRepository.create.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        const category = await mockCategoryRepository.create(
          mockValidCategoryDataRequestToCategory
        );
        expect(category).toEqual(mockValidCategoryDataResponse);
        expect(mockCategoryRepository.create).toHaveBeenCalledWith({
          ...mockValidCategoryDataRequestToCategory,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        });
      });
    });
    describe("Failure", () => {
      test("should throw error when category creation fails", async () => {
        const errorMessage = "Database connection error";
        mockCategoryRepository.create.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockCategoryRepository.create(mockValidCategoryDataRequestToCategory)
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when required fields are missing", async () => {
        mockCategoryRepository.create.mockRejectedValue(
          new Error("Name cannot be empty")
        );

        await expect(
          mockCategoryRepository.create({} as CategoryPrisma)
        ).rejects.toThrow("Name cannot be empty");
      });
    });
  });
  describe("update", () => {
    describe("Success", () => {
      test("should update a category", async () => {
        mockCategoryRepository.update.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        const category = await mockCategoryRepository.update(
          mockValidCategoryDataResponse.id as string,
          mockValidCategoryDataRequestToCategory
        );
        expect(category).toEqual(mockValidCategoryDataResponse);
        expect(mockCategoryRepository.update).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.id as string,
          mockValidCategoryDataRequestToCategory
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when category update fails", async () => {
        const errorMessage = "Update failed: Category not found";
        mockCategoryRepository.update.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockCategoryRepository.update(
            "invalid-id",
            mockValidCategoryDataRequestToCategory
          )
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when required fields are missing", async () => {
        mockCategoryRepository.update.mockRejectedValue(
          new Error("Name cannot be empty")
        );

        await expect(
          mockCategoryRepository.update(
            mockValidCategoryDataResponse.id as string,
            {} as CategoryPrisma
          )
        ).rejects.toThrow("Name cannot be empty");
      });
    });
  });
  describe("delete", () => {
    describe("Success", () => {
      test("should delete a category", async () => {
        mockCategoryRepository.delete.mockResolvedValue(Promise.resolve());

        const category = await mockCategoryRepository.delete(
          mockValidCategoryDataResponse.id as string
        );
        expect(category).toBeUndefined();
      });
    });
    describe("Failure", () => {
      test("should throw error when category deletion fails", async () => {
        const errorMessage = "Deletion failed: Database error";
        mockCategoryRepository.delete.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockCategoryRepository.delete(
            mockValidCategoryDataResponse.id as string
          )
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when trying to delete non-existent category", async () => {
        mockCategoryRepository.delete.mockRejectedValue(
          new Error("Record to delete does not exist")
        );

        await expect(
          mockCategoryRepository.delete("non-existent-id")
        ).rejects.toThrow("Record to delete does not exist");
      });
    });
  });
  describe("get all", () => {
    describe("Success", () => {
      test("should get all categories", async () => {
        mockCategoryRepository.getAll.mockResolvedValue([
          mockValidCategoryDataResponseV2,
        ]);
        const categories = await mockCategoryRepository.getAll();
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toEqual([mockValidCategoryDataResponseV2]);
        expect(categories[0]).toHaveProperty(
          "id",
          mockValidCategoryDataResponseV2.id
        );
      });
    });
    describe("Failure", () => {
      test("should throw error when category deletion fails", async () => {
        const errorMessage = "Deletion failed: Database error";
        mockCategoryRepository.getAll.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(mockCategoryRepository.getAll()).rejects.toThrow(
          errorMessage
        );
      });
    });
  });
  describe("get by id", () => {
    describe("Success", () => {
      test("should get a category by id", async () => {
        mockCategoryRepository.getById.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        const category = await mockCategoryRepository.getById(
          mockValidCategoryDataResponse.id as string
        );
        expect(category).toEqual(mockValidCategoryDataResponse);
        expect(category).toHaveProperty("id", mockValidCategoryDataResponse.id);
      });
      test("should get a null if category by id does not exist", async () => {
        mockCategoryRepository.getById.mockResolvedValue(null);
        const category = await mockCategoryRepository.getById(
          mockValidCategoryDataResponse.id as string
        );
        expect(category).toBeNull();
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database connection error";
        mockCategoryRepository.getById.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(mockCategoryRepository.getById("some-id")).rejects.toThrow(
          errorMessage
        );
      });

      test("should throw error when invalid ID format is provided", async () => {
        mockCategoryRepository.getById.mockRejectedValue(
          new Error("Invalid ID format")
        );

        await expect(
          mockCategoryRepository.getById("invalid-id-format")
        ).rejects.toThrow("Invalid ID format");
      });
    });
  });
  describe("get by name", () => {
    describe("Success", () => {
      test("should get a category by name", async () => {
        mockCategoryRepository.getByName.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        const category = await mockCategoryRepository.getByName(
          mockValidCategoryDataResponse.name
        );
        expect(category).toEqual(mockValidCategoryDataResponse);
        expect(category).toHaveProperty(
          "name",
          mockValidCategoryDataResponse.name
        );
      });
      test("should get a null if category by name does not exist", async () => {
        mockCategoryRepository.getByName.mockResolvedValue(null);
        const category = await mockCategoryRepository.getByName(
          mockValidCategoryDataResponse.name
        );
        expect(category).toBeNull();
      });
    });
    describe("Failure", () => {
      test("should throw error when database query fails", async () => {
        const errorMessage = "Database connection error";
        mockCategoryRepository.getByName.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          mockCategoryRepository.getByName("some-name")
        ).rejects.toThrow(errorMessage);
      });

      test("should throw error when invalid ID format is provided", async () => {
        mockCategoryRepository.getByName.mockRejectedValue(
          new Error("Invalid Name format")
        );

        await expect(
          mockCategoryRepository.getByName("invalid-name-format")
        ).rejects.toThrow("Invalid Name format");
      });
    });
  });
});
