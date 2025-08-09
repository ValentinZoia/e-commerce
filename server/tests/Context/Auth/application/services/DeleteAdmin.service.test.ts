import { DeleteAdminService } from "../../../../../src/Auth/application/services";
import { mockAdminRepository } from "../../__mocks__/repositories/MockAdminRepository";
import { CustomError } from "../../../../../src/shared/domain/errors";
import { mockCreateUserDbResponse } from "../../../../helpers/factories/admin-mocks";

describe("DeleteAdminService", () => {
  let deleteAdminService: DeleteAdminService;

  beforeEach(() => {
    jest.clearAllMocks();
    deleteAdminService = new DeleteAdminService(mockAdminRepository);
  });
  describe("execute", () => {
    describe("Success", () => {
      test("should delete admin successfully", async () => {});
    });
    describe("Failure", () => {
      describe("CustomError", () => {
        test("should throw a CustomError if username is empty", async () => {
          //Arrange
          mockAdminRepository.findAdminByUsername.mockResolvedValue(null);
          //Act & Assert
          await expect(deleteAdminService.execute("")).rejects.toThrow(
            CustomError
          );

          expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
            ""
          );

          expect(mockAdminRepository.deleteByUsername).not.toHaveBeenCalled();
        });
        test("should throw a CustomError if admin to delete does not exist", async () => {
          //Arrange
          mockAdminRepository.findAdminByUsername.mockResolvedValue(null);
          //Act & Assert
          await expect(
            deleteAdminService.execute(
              mockCreateUserDbResponse.username as string
            )
          ).rejects.toThrow(CustomError);

          expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
            mockCreateUserDbResponse.username as string
          );

          expect(mockAdminRepository.deleteByUsername).not.toHaveBeenCalled();
        });
      });
      describe("Error", () => {
        test("should throw an Error if admin deletion fails", async () => {
          const errorMessage = "Database connection error";
          mockAdminRepository.findAdminByUsername.mockResolvedValue(
            mockCreateUserDbResponse
          );
          mockAdminRepository.deleteByUsername.mockRejectedValue(
            new Error(errorMessage)
          );

          await expect(
            deleteAdminService.execute(
              mockCreateUserDbResponse.username as string
            )
          ).rejects.toThrow(errorMessage);

          expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
            mockCreateUserDbResponse.username as string
          );
          expect(mockAdminRepository.deleteByUsername).toHaveBeenCalledWith(
            mockCreateUserDbResponse.username as string
          );
        });
        test("should throw an Error if finding admin fails", async () => {
          const errorMessage = "Database connection error";
          mockAdminRepository.findAdminByUsername.mockRejectedValue(
            new Error(errorMessage)
          );

          await expect(
            deleteAdminService.execute(
              mockCreateUserDbResponse.username as string
            )
          ).rejects.toThrow(errorMessage);

          expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
            mockCreateUserDbResponse.username as string
          );
          expect(mockAdminRepository.deleteByUsername).not.toHaveBeenCalled();
        });
      });
    });
  });
});
