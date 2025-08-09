import { LogInAdminService } from "../../../../../src/Auth/application/services";
import { mockAdminRepository } from "../../__mocks__/repositories/MockAdminRepository";
import { mockBcryptAdapter } from "../../../Shared/__mocks__/adapters/MockBcryptAdapter";
import {
  ValidationError,
  CustomError,
} from "../../../../../src/shared/domain/errors";
import { JwtAdapter } from "../../../../../src/shared/infrastructure/adapters";
import {
  mockValidLoginRequest,
  mockCreateUserDbResponse,
} from "../../../../helpers/factories/admin-mocks";

// Mock del JwtAdapter
jest.mock("../../../../../src/shared/infrastructure/adapters", () => ({
  ...jest.requireActual("../../../../../src/shared/infrastructure/adapters"),
  JwtAdapter: {
    generateToken: jest.fn(),
  },
}));

const mockJwtAdapter = JwtAdapter as jest.Mocked<typeof JwtAdapter>;

describe("LogInAdminService - Unit Test", () => {
  let logInAdminService: LogInAdminService;

  beforeEach(() => {
    jest.clearAllMocks();
    logInAdminService = new LogInAdminService(
      mockAdminRepository,
      mockBcryptAdapter.compare
    );
  });

  describe("execute", () => {
    describe("Success", () => {
      test("should login admin and return JWT token", async () => {
        const mockToken = "mock.jwt.token";

        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );
        mockBcryptAdapter.compare.mockReturnValue(true);
        mockJwtAdapter.generateToken.mockResolvedValue(mockToken);

        //Act
        const token = await logInAdminService.execute(mockValidLoginRequest);

        //Assert
        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).toHaveBeenCalledWith(
          mockValidLoginRequest.password,
          mockCreateUserDbResponse.password
        );
        expect(mockJwtAdapter.generateToken).toHaveBeenCalledWith({
          id: mockCreateUserDbResponse.id,
          username: mockCreateUserDbResponse.username,
        });
        expect(token).toBe(mockToken);
      });
    });

    describe("Failure", () => {
      test("should throw ValidationError if username does not exist", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(null);

        //Act & Assert
        await expect(
          logInAdminService.execute(mockValidLoginRequest)
        ).rejects.toThrow(
          new ValidationError({ credentials: ["Credenciales incorrectas"] })
        );

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).not.toHaveBeenCalled();
        expect(mockJwtAdapter.generateToken).not.toHaveBeenCalled();
      });

      test("should throw ValidationError if password does not match", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );
        mockBcryptAdapter.compare.mockReturnValue(false);

        //Act & Assert
        await expect(
          logInAdminService.execute(mockValidLoginRequest)
        ).rejects.toThrow(
          new ValidationError({ credentials: ["Credenciales incorrectas"] })
        );

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).toHaveBeenCalledWith(
          mockValidLoginRequest.password,
          mockCreateUserDbResponse.password
        );
        expect(mockJwtAdapter.generateToken).not.toHaveBeenCalled();
      });

      test("should throw CustomError if JWT generation fails", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );
        mockBcryptAdapter.compare.mockReturnValue(true);
        mockJwtAdapter.generateToken.mockResolvedValue(null);

        //Act & Assert
        await expect(
          logInAdminService.execute(mockValidLoginRequest)
        ).rejects.toThrow("Error al generar JWT");

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).toHaveBeenCalledWith(
          mockValidLoginRequest.password,
          mockCreateUserDbResponse.password
        );
        expect(mockJwtAdapter.generateToken).toHaveBeenCalledWith({
          id: mockCreateUserDbResponse.id,
          username: mockCreateUserDbResponse.username,
        });
      });

      test("should throw Error if Admin Repository findByUsername fails", async () => {
        const errorMessage = "Database connection error";

        //Arrange
        mockAdminRepository.findAdminByUsername.mockRejectedValue(
          new Error(errorMessage)
        );

        //Act & Assert
        await expect(
          logInAdminService.execute(mockValidLoginRequest)
        ).rejects.toThrow(errorMessage);

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).not.toHaveBeenCalled();
        expect(mockJwtAdapter.generateToken).not.toHaveBeenCalled();
      });

      test("should throw Error if Bcrypt compare fails", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );
        mockBcryptAdapter.compare.mockImplementation(() => {
          throw new Error("Bcrypt comparison failed");
        });

        //Act & Assert
        await expect(
          logInAdminService.execute(mockValidLoginRequest)
        ).rejects.toThrow("Bcrypt comparison failed");

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).toHaveBeenCalledWith(
          mockValidLoginRequest.password,
          mockCreateUserDbResponse.password
        );
        expect(mockJwtAdapter.generateToken).not.toHaveBeenCalled();
      });

      test("should throw Error if JWT generation throws error", async () => {
        //Arrange
        mockAdminRepository.findAdminByUsername.mockResolvedValue(
          mockCreateUserDbResponse
        );
        mockBcryptAdapter.compare.mockReturnValue(true);
        mockJwtAdapter.generateToken.mockRejectedValue(
          new Error("JWT service unavailable")
        );

        //Act & Assert
        await expect(
          logInAdminService.execute(mockValidLoginRequest)
        ).rejects.toThrow("JWT service unavailable");

        expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
          mockValidLoginRequest.username
        );
        expect(mockBcryptAdapter.compare).toHaveBeenCalledWith(
          mockValidLoginRequest.password,
          mockCreateUserDbResponse.password
        );
        expect(mockJwtAdapter.generateToken).toHaveBeenCalledWith({
          id: mockCreateUserDbResponse.id,
          username: mockCreateUserDbResponse.username,
        });
      });
    });
  });
});
