import { CreateAdminService } from "../../../../../src/Auth/application/services";
import { mockAdminRepository } from "../../__mocks__/repositories/MockAdminRepository";
import { mockBcryptAdapter } from "../../../Shared/__mocks__/adapters/MockBcryptAdapter";
import { ValidationError } from "../../../../../src/shared/domain/errors";
import {
  mockValidCreateUserRequest,
  mockCreateUserPublicReponse,
  mockCreateUserDbResponse,
} from "../../../../helpers/factories/admin-mocks";

describe("CreateAdminService - Unit Test", () => {
  let createAdminService: CreateAdminService;

  beforeEach(() => {
    jest.clearAllMocks();
    createAdminService = new CreateAdminService(
      mockAdminRepository,
      mockBcryptAdapter.hash
    );
  });
  describe("execute", () => {
    describe("Success", () => {
      test("should create a Admin", async () => {
        const hashedPassword = "hashedPassword";
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(null);
        mockBcryptAdapter.hash.mockReturnValue(hashedPassword); //se usa mockReturnValue cuando el metodo es sincrono, no asincrono como los otros.
        mockAdminRepository.create.mockResolvedValue({
          ...mockCreateUserDbResponse,
          password: hashedPassword,
        });

        //Act
        const admin = await createAdminService.execute(
          mockValidCreateUserRequest
        );
        //Assert
        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidCreateUserRequest.username
        );
        expect(mockBcryptAdapter.hash).toHaveBeenCalledWith(
          mockValidCreateUserRequest.password
        );
        expect(mockAdminRepository.create).toHaveBeenCalledWith({
          id: null,
          username: mockValidCreateUserRequest.username,
          password: hashedPassword,
        });
        expect(admin).toEqual(mockCreateUserPublicReponse);
        expect(admin).toHaveProperty("id");
        expect(admin).not.toHaveProperty("password");
        expect(admin?.username).toEqual(mockValidCreateUserRequest.username);
      });
    });
    describe("Failure", () => {
      test("should throw a ValidationError if username is already in use", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );

        //Act

        await expect(
          createAdminService.execute(mockValidCreateUserRequest)
        ).rejects.toThrow(
          new ValidationError({ username: ["El username ya esta en uso"] })
        );
        //Assert
        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidCreateUserRequest.username
        );
        expect(mockBcryptAdapter.hash).not.toHaveBeenCalled();
        expect(mockAdminRepository.create).not.toHaveBeenCalled();
      });
      test("should throw a Error if Bcrypt Adapter fails", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(null);
        mockBcryptAdapter.hash.mockReturnValue("");

        //Act

        await expect(
          createAdminService.execute(mockValidCreateUserRequest)
        ).rejects.toThrow(
          new ValidationError({ password: ["Error al hashear contraseña"] })
        );
        //Assert
        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidCreateUserRequest.username
        );
        expect(mockBcryptAdapter.hash).toHaveBeenCalledWith(
          mockValidCreateUserRequest.password
        );
        expect(mockAdminRepository.create).not.toHaveBeenCalled();
      });
      test("should throw a Error if Admin Repository findByUsername fails", async () => {
        const errorMessage = "Database connection error";
        mockAdminRepository.findAdminByUsername.mockRejectedValue(
          new Error(errorMessage)
        );

        await expect(
          createAdminService.execute(mockValidCreateUserRequest)
        ).rejects.toThrow(errorMessage);

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidCreateUserRequest.username
        );
        expect(mockBcryptAdapter.hash).not.toHaveBeenCalled();
        expect(mockAdminRepository.create).not.toHaveBeenCalled();
      });
      test("should throw a Error if Admin Repository create fails", async () => {
        const errorMessage = "Database connection error";
        const hashedPassword = "hashedPassword";
        mockAdminRepository.findAdminByUsername.mockResolvedValue(null);
        mockBcryptAdapter.hash.mockReturnValue(hashedPassword);
        mockAdminRepository.create.mockRejectedValue(new Error(errorMessage));

        await expect(
          createAdminService.execute(mockValidCreateUserRequest)
        ).rejects.toThrow(errorMessage);

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidCreateUserRequest.username
        );
        expect(mockBcryptAdapter.hash).toHaveBeenCalledWith(
          mockValidCreateUserRequest.password
        );
        expect(mockAdminRepository.create).toHaveBeenCalledWith({
          id: null,
          username: mockValidCreateUserRequest.username,
          password: hashedPassword,
        });
      });
    });
  });
});
