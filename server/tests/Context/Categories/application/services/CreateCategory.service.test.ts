import { CreateCategoryService } from "../../../../../src/Categories/application/services";
import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";
import { ValidationError } from "../../../../../src/shared/domain/errors";
import {
  mockValidCategoryDataRequest,
  mockValidCategoryDataRequestToCategory,
  mockValidCategoryDataResponse,
  mockValidCategoryDataResponseV2,
} from "../../../../helpers/factories/category-mocks";

describe("CreateCategoryService - Unit Test", () => {
  let createCategoryService: CreateCategoryService;
  beforeEach(() => {
    jest.clearAllMocks();
    createCategoryService = new CreateCategoryService(mockCategoryRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should create a category successfuly when all validation pass", async () => {
        //Arrange
        mockCategoryRepository.getByName.mockResolvedValue(null);
        mockCategoryRepository.create.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        //Act
        const result = await createCategoryService.execute(
          mockValidCategoryDataRequest
        );

        //Assert
        expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
          mockValidCategoryDataRequest.name
        );
        expect(mockCategoryRepository.create).toHaveBeenCalledWith(
          expect.objectContaining({
            ...mockValidCategoryDataRequestToCategory,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        );
        expect(result).toEqual(mockValidCategoryDataResponse);
      });
    });
    describe("Failure", () => {
      test("should throw a ValidationError if category name already exists", async () => {
        mockCategoryRepository.getByName.mockResolvedValue(
          mockValidCategoryDataResponseV2
        );

        await expect(
          createCategoryService.execute(mockValidCategoryDataRequest)
        ).rejects.toThrow(ValidationError);

        expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
          mockValidCategoryDataRequest.name
        );
        expect(mockCategoryRepository.create).not.toHaveBeenCalled();
      });
      test("should throw a ValidationError if category repository fails", async () => {
        const errorMessage = "Database connection error";
        mockCategoryRepository.getByName.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          createCategoryService.execute(mockValidCategoryDataRequest)
        ).rejects.toThrow(Error(errorMessage));

        expect(mockCategoryRepository.getByName).toHaveBeenCalled();
        expect(mockCategoryRepository.create).not.toHaveBeenCalled();
      });
      test("should throw a ValidationError if category repository fails", async () => {
        const errorMessage = "Database connection error";
        mockCategoryRepository.getByName.mockResolvedValue(null);
        mockCategoryRepository.create.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          createCategoryService.execute(mockValidCategoryDataRequest)
        ).rejects.toThrow(Error(errorMessage));

        expect(mockCategoryRepository.getByName).toHaveBeenCalled();
        expect(mockCategoryRepository.create).toHaveBeenCalled();
      });
    });
  });
});
