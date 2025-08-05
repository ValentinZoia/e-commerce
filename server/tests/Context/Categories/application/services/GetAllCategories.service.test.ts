import { GetAllCategoriesService } from "../../../../../src/Categories/application/services";
import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";

import {
  mockValidCategoryDataResponse,
  mockValidCategoryDataResponseV2,
} from "../../../../helpers/factories/category-mocks";

describe("GetAllCategoriesService - Unit Test", () => {
  let getAllCategoriesService: GetAllCategoriesService;

  beforeEach(() => {
    jest.clearAllMocks();
    getAllCategoriesService = new GetAllCategoriesService(
      mockCategoryRepository
    );
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should delete a category successfully", async () => {
        mockCategoryRepository.getAll.mockResolvedValue([
          mockValidCategoryDataResponse,
          mockValidCategoryDataResponseV2,
        ]);

        const result = await getAllCategoriesService.execute();

        expect(mockCategoryRepository.getAll).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Array);
        expect(result).toEqual([
          mockValidCategoryDataResponse,
          mockValidCategoryDataResponseV2,
        ]);
      });
    });
    describe("Failure", () => {
      describe("Error", () => {
        test("should throw a Error when database query fails", async () => {
          const errorMessage = "Database connection error";
          mockCategoryRepository.getAll.mockRejectedValue(
            new Error(errorMessage)
          );

          await expect(getAllCategoriesService.execute()).rejects.toThrow(
            Error(errorMessage)
          );

          expect(mockCategoryRepository.getAll).toHaveBeenCalled();
        });
      });
    });
  });
});
