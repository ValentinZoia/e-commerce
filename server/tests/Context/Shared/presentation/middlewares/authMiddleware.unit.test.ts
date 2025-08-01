import { Request, Response, NextFunction } from "express";
import { AuthMiddleware } from "../../../../../src/shared/presentation/middlewares";
import { CustomError } from "../../../../../src/shared/domain/errors";
import {
  configureJwtMock,
  mockJwtValidation,
} from "../../../../helpers/auth/authTestHelper";
import { mockAdminRepository } from "../../../Auth/__mocks__/repositories/MockAdminRepository";
import {
  defaultValidUser,
  defaultValidJwtPayload,
  mockValidToken,
  mockInvalidToken,
} from "../../../../helpers/factories/defaultValues";

// Mock JWT adapter
jest.mock(
  "../../../../../src/shared/infrastructure/adapters/jwt.adapter",
  () => ({
    JwtAdapter: {
      validateToken: jest.fn(),
    },
  })
);

describe("AuthMiddleware Unit test", () => {
  let authMiddleware: AuthMiddleware;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    // Create middleware instance with mocked repository
    authMiddleware = new AuthMiddleware(mockAdminRepository);

    // Setup default JWT mock
    mockJwtValidation(
      {
        id: defaultValidJwtPayload.id,
        username: defaultValidUser.username,
      },
      mockValidToken
    );

    // Initialize Express mock objects
    mockRequest = { cookies: {} };
    mockResponse = {};
    mockNext = jest.fn();

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("Successful Authentication", () => {
    it("should authenticate successfully with valid token and existing user", async () => {
      // Arrange
      mockRequest.cookies = { access_token: mockValidToken };
      mockAdminRepository.findAdminByUsername.mockResolvedValue(
        defaultValidUser
      );

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(configureJwtMock().validateToken).toHaveBeenCalledWith(
        mockValidToken
      );
      expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
        defaultValidJwtPayload.username
      );
      expect(mockRequest.admin).toEqual({
        id: defaultValidJwtPayload.id,
        username: defaultValidJwtPayload.username,
      });
      expect(mockNext).toHaveBeenCalledWith();
    });

    it("should work correctly when cookies have multiple values", async () => {
      // Arrange
      mockRequest.cookies = {
        access_token: mockValidToken,
        other_cookie: "other_value",
        session_id: "session123",
      };
      mockAdminRepository.findAdminByUsername.mockResolvedValue(
        defaultValidUser
      );

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(configureJwtMock().validateToken).toHaveBeenCalledWith(
        mockValidToken
      );
      expect(mockRequest.admin).toBeDefined();
      expect(mockNext).toHaveBeenCalledWith();
    });
  });

  describe("Token Validation Failures", () => {
    it("should throw error when no token is provided", async () => {
      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(CustomError);
      expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));

      expect(configureJwtMock().validateToken).not.toHaveBeenCalled();
    });

    it("should throw error when token is empty string", async () => {
      // Arrange
      mockRequest.cookies = { access_token: "" };

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(CustomError);
    });

    it("should throw error when token is null", async () => {
      // Arrange
      mockRequest.cookies = { access_token: null };

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(CustomError);
    });

    it("should throw error when token validation fails", async () => {
      // Arrange
      mockRequest.cookies = { access_token: mockInvalidToken };
      configureJwtMock({ payload: null, token: mockInvalidToken });

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(CustomError);
      expect(configureJwtMock().validateToken).toHaveBeenCalledWith(
        mockInvalidToken
      );
    });
  });

  describe("User Validation Failures", () => {
    it("should throw error when user doesn't exist", async () => {
      // Arrange
      mockRequest.cookies = { access_token: mockValidToken };
      mockAdminRepository.findAdminByUsername.mockResolvedValue(null);

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      const error = mockNext.mock.calls[0][0];
      expect(error).toBeInstanceOf(CustomError);
      expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("should handle JWT adapter errors correctly", async () => {
      // Arrange
      const jwtError = new Error("JWT validation failed");
      mockRequest.cookies = { access_token: mockInvalidToken };
      configureJwtMock({ shouldFail: true, token: mockInvalidToken });

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(jwtError);
    });

    it("should handle repository errors correctly", async () => {
      // Arrange
      const repositoryError = new Error("Database connection failed");
      mockRequest.cookies = { access_token: mockValidToken };
      mockAdminRepository.findAdminByUsername.mockRejectedValue(
        repositoryError
      );

      // Act
      await authMiddleware.authenticate(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(repositoryError);
    });
  });
});

//     it("debería lanzar error cuando la validación del token falla", async () => {
//       // Arrange
//       const mockInvalidToken = "invalid-token";
//       const mockError = {
//         statusCode: 401,
//         message: "Token de autenticación inválido o expirado.",
//         name: "CustomError",
//       } as CustomError;

//       mockRequest.cookies = { access_token: mockInvalidToken };
//       configureJwtMock({ payload: null, token: mockInvalidToken });
//       mockCustomError.unauthorized.mockReturnValue(mockError);

//       // Act
//       await authMiddleware.authenticate(
//         mockRequest as Request,
//         mockResponse as Response,
//         mockNext
//       );

//       // Assert
//       //toHavBeenCalledWidth significa que se llamo a la función, y se le paso como parametro mockToken
//       // expect(mockJwtAdapter.validateToken).toHaveBeenCalledWith(mockToken);
//       expect(configureJwtMock().validateToken).toHaveBeenCalledWith(
//         mockInvalidToken
//       );
//       expect(mockCustomError.unauthorized).toHaveBeenCalledWith(
//         mockError.message
//       );

//       expect(mockNext).toHaveBeenCalledTimes(1);
//       expect(mockNext).toHaveBeenCalledWith(mockError);
//       expect(mockAdminRepository.findAdminByUsername).not.toHaveBeenCalled();
//     });

//     it("debería lanzar error cuando el token es valido pero el usuario no existe en la base de datos", async () => {
//       // Arrange

//       const mockError = {
//         statusCode: 401,
//         message: "Token invalido - Usuario no encontrado.",
//         name: "CustomError",
//       } as CustomError;

//       mockRequest.cookies = { access_token: mockValidToken };
//       mockAdminRepository.findAdminByUsername.mockResolvedValue(null);
//       mockCustomError.unauthorized.mockReturnValue(mockError);

//       // Act
//       await authMiddleware.authenticate(
//         mockRequest as Request,
//         mockResponse as Response,
//         mockNext
//       );

//       // Assert
//       expect(configureJwtMock().validateToken).toHaveBeenCalledWith(
//         mockValidToken
//       );
//       expect(mockAdminRepository.findAdminByUsername).toHaveBeenCalledWith(
//         defualtValidJwtPayload.username
//       );
//       expect(mockCustomError.unauthorized).toHaveBeenCalledWith(
//         mockError.message
//       );
//       expect(mockNext).toHaveBeenCalledWith(mockError);
//       expect(mockRequest.admin).toBeUndefined();
//     });
