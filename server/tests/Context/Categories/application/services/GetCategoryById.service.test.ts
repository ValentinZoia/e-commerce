import { GetCategoryByIdService } from "../../../../../src/Categories/application/services";
import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";
import { mockValidCategoryDataResponse } from "../../../../helpers/factories/category-mocks";
import { CustomError } from "../../../../../src/shared/domain/errors";

describe("GetCategoryByIdService - Unit Test", () => {
  let getCategoryByIdService: GetCategoryByIdService;

  beforeEach(() => {
    jest.clearAllMocks();
    getCategoryByIdService = new GetCategoryByIdService(mockCategoryRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should get a category successfully", async () => {
        mockCategoryRepository.getById.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        const result = await getCategoryByIdService.execute(
          mockValidCategoryDataResponse.id as string
        );
        expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.id as string
        );
        expect(result).toEqual(mockValidCategoryDataResponse);
        expect(result).toHaveProperty("id", mockValidCategoryDataResponse.id);
      });
    });
    describe("Failure", () => {
      describe("CustomError", () => {
        test("should throw a CustomError if id is empty", async () => {
          //Arrange
          mockCategoryRepository.getById.mockResolvedValue(null);
          //Act & Assert
          await expect(getCategoryByIdService.execute("")).rejects.toThrow(
            CustomError
          );
          expect(mockCategoryRepository.getById).toHaveBeenCalledWith("");
        });
        test("should throw a CustomError if category does not exist", async () => {
          //Arrange
          mockCategoryRepository.getById.mockResolvedValue(null);
          //Act & Assert
          await expect(
            getCategoryByIdService.execute(
              mockValidCategoryDataResponse.id as string
            )
          ).rejects.toThrow(CustomError);
          expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
            mockValidCategoryDataResponse.id as string
          );
        });
      });
    });
  });
});
