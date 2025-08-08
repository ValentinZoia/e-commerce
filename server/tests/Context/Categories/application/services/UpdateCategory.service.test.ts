import { UpdateCategoryService } from "../../../../../src/Categories/application/services";
import { mockCategoryRepository } from "../../__mocks__/repositories/MockCategoryRepository";
import {
  CustomError,
  ValidationError,
} from "../../../../../src/shared/domain/errors";
import {
  mockValidCategoryDataRequest,
  mockValidCategoryDataRequestToCategory,
  mockValidCategoryDataResponse,
  mockValidCategoryDataResponseV2,
} from "../../../../helpers/factories/category-mocks";

describe("UpdateCategoryService - Unit Test", () => {
  let updateCategoryService: UpdateCategoryService;

  beforeEach(() => {
    jest.clearAllMocks();
    updateCategoryService = new UpdateCategoryService(mockCategoryRepository);
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should update a category successfully when all validations pass", async () => {
        //Arrange
        //verifica que exista una categoria a actualizar con el id
        mockCategoryRepository.getById.mockResolvedValue(
          mockValidCategoryDataResponse
        );
        //verifica que no exista una categoria con diferente id, con ese nombre.
        mockCategoryRepository.getByName.mockResolvedValue(null);

        //actualiza la categoria
        mockCategoryRepository.update.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        //Act
        const result = await updateCategoryService.execute(
          mockValidCategoryDataResponse.id as string,
          mockValidCategoryDataRequest
        );

        //Assert
        expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.id as string
        );

        expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
          mockValidCategoryDataRequest.name
        );
        expect(mockCategoryRepository.update).toHaveBeenCalledWith(
          mockValidCategoryDataResponse.id as string,
          expect.objectContaining({
            ...mockValidCategoryDataRequestToCategory,
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          })
        );
        expect(result).toEqual(mockValidCategoryDataResponse);
        expect(result).toHaveProperty("id", mockValidCategoryDataResponse.id);
      });
    });
    describe("Failure", () => {
      describe("ValidationError", () => {
        test("should throw a ValidationError if category name already exists", async () => {
          //Arrange
          //verifica que exista una categoria a actualizar con el id
          mockCategoryRepository.getById.mockResolvedValue(
            mockValidCategoryDataResponse
          );
          //verifica que no exista una categoria con diferente id, con ese nombre.
          //en este caso debe fallar. osea existe una
          mockCategoryRepository.getByName.mockResolvedValue(
            mockValidCategoryDataResponseV2
          );

          //Act
          const result = await expect(
            updateCategoryService.execute(
              mockValidCategoryDataResponse.id as string,
              mockValidCategoryDataRequest
            )
          ).rejects.toThrow(ValidationError);

          //Assert
          expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
            mockValidCategoryDataResponse.id as string
          );

          expect(mockCategoryRepository.getByName).toHaveBeenCalledWith(
            mockValidCategoryDataRequest.name
          );
          expect(mockCategoryRepository.update).not.toHaveBeenCalled();
        });
      });
      describe("CustomError", () => {
        test("should throw a CustomError if id is empty", async () => {
          //Arrange
          mockCategoryRepository.getById.mockResolvedValue(null);
          //Act & Assert
          await expect(
            updateCategoryService.execute("", mockValidCategoryDataRequest)
          ).rejects.toThrow(CustomError);

          expect(mockCategoryRepository.getById).toHaveBeenCalledWith("");

          expect(mockCategoryRepository.getByName).not.toHaveBeenCalled();
          expect(mockCategoryRepository.update).not.toHaveBeenCalled();
        });
        test("should throw a CustomError if category to update does not exist", async () => {
          //Arrange
          mockCategoryRepository.getById.mockResolvedValue(null);
          //Act & Assert
          await expect(
            updateCategoryService.execute(
              mockValidCategoryDataResponse.id as string,
              mockValidCategoryDataRequest
            )
          ).rejects.toThrow(
            CustomError.notFound("Categoria a actualizar no encontrada")
          );

          expect(mockCategoryRepository.getById).toHaveBeenCalledWith(
            mockValidCategoryDataResponse.id as string
          );

          expect(mockCategoryRepository.getByName).not.toHaveBeenCalled();
          expect(mockCategoryRepository.update).not.toHaveBeenCalled();
        });
      });
    });
  });
});
