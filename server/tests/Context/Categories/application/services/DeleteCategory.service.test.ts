import { DeleteCategoryService } from "../../../../../src/Categories/application/services";
import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockValidCategoryDataResponse } from "../../../../helpers/factories/category-mocks";
import { mock } from "node:test";

describe("DeleteCategoryService - Unit Test", () => {
  let deleteCategoryService: DeleteCategoryService;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteCategoryService = new DeleteCategoryService(mockCategoryRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should delete a category successfully", async () => {
        mockCategoryRepository.getById.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        mockCategoryRepository.delete.mockResolvedValue(Promise.resolve());

        const result = await deleteCategoryService.execute(
          mockValidCategoryDataResponse.id as string
        );

        expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.id as string
        );

        expect(mockCategoryRepository.delete).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.id as string
        );
      });
    });
    describe("Failure", () => {
      describe("CustomError", () => {
        test("should throw a CustomError if id is empty", async () => {
          //Arrange
          mockCategoryRepository.getById.mockResolvedValue(null);
          //Act & Assert
          await expect(deleteCategoryService.execute("")).rejects.toThrow(
            CustomError
          );

          expect(mockCategoryRepository.getById).toHaveBeenCalledWith("");

          expect(mockCategoryRepository.delete).not.toHaveBeenCalled();
        });
        test("should throw a CustomError if category to delete does not exist", async () => {
          //Arrange
          mockCategoryRepository.getById.mockResolvedValue(null);
          //Act & Assert
          await expect(
            deleteCategoryService.execute(
              mockValidCategoryDataResponse.id as string
            )
          ).rejects.toThrow(CustomError);

          expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
            mockValidCategoryDataResponse.id as string
          );

          expect(mockCategoryRepository.delete).not.toHaveBeenCalled();
        });
      });
    });
  });
});
