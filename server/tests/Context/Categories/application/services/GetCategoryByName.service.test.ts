import { GetCategoryByNameService } from "../../../../../src/Categories/application/services";
import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";
import { mockValidCategoryDataResponse } from "../../../../helpers/factories/category-mocks";
import { CustomError } from "../../../../../src/shared/domain/errors";

describe("GetCategoryByNameService - Unit Test", () => {
  let getCategoryByNameService: GetCategoryByNameService;

  beforeEach(() => {
    jest.clearAllMocks();
    getCategoryByNameService = new GetCategoryByNameService(
      mockCategoryRepository
    );
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get a category successfully", async () => {
        mockCategoryRepository.getByName.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        const result = await getCategoryByNameService.execute(
          mockValidCategoryDataResponse.name as string
        );
        expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.name as string
        );
        expect(result).toEqual(mockValidCategoryDataResponse);
        expect(result).toHaveProperty(
          "name",
          mockValidCategoryDataResponse.name
        );
      });
    });
    describe("Failure", () => {
      describe("CustomError", () => {
        test("should throw a CustomError if name is empty", async () => {
          //Arrange
          mockCategoryRepository.getByName.mockResolvedValue(null);
          //Act & Assert
          await expect(getCategoryByNameService.execute("")).rejects.toThrow(
            CustomError
          );
          expect(mockCategoryRepository.getByName).toHaveBeenCalledWith("");
        });
        test("should throw a CustomError if category does not exist", async () => {
          //Arrange
          mockCategoryRepository.getByName.mockResolvedValue(null);
          //Act & Assert
          await expect(
            getCategoryByNameService.execute(
              mockValidCategoryDataResponse.name as string
            )
          ).rejects.toThrow(CustomError);
          expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
            mockValidCategoryDataResponse.name as string
          );
        });
      });
    });
  });
});
