import { Request, Response, NextFunction } from "express";
import { ValidationMiddleware } from "../../../../../src/shared/presentation/middlewares";
import { z } from "zod";

describe("ValidationMiddleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;
  let testSchema: z.ZodSchema;

  beforeEach(() => {
    jest.clearAllMocks();
    // Configuración básica para cada test
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    // Esquema de prueba básico
    testSchema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      age: z.number().int().positive().optional(),
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("validateBody", () => {
    it("should pass validation with correct data", () => {
      // Arrange
      mockRequest.body = {
        username: "testuser",
        email: "test@example.com",
        age: 25,
      };

      // Act
      ValidationMiddleware.validateBody(testSchema)(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockRequest.body).toEqual({
        username: "testuser",
        email: "test@example.com",
        age: 25,
      });
    });

    it("should throw ZodError for invalid data", () => {
      // Arrange
      mockRequest.body = {
        username: "ab", // Muy corto
        email: "not-an-email",
        age: -5, // Número negativo
      };

      // Act & Assert
      expect(() => {
        ValidationMiddleware.validateBody(testSchema)(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
      }).toThrow(z.ZodError);
    });

    it("should throw ZodError for missing required fields", () => {
      // Arrange
      mockRequest.body = {
        // Falta username y email
        age: 25,
      };

      // Act & Assert
      expect(() => {
        ValidationMiddleware.validateBody(testSchema)(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
      }).toThrow(z.ZodError);
    });

    it("should work with optional fields", () => {
      // Arrange
      mockRequest.body = {
        username: "validuser",
        email: "valid@example.com",
        // age es opcional
      };

      // Act
      ValidationMiddleware.validateBody(testSchema)(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockRequest.body).toEqual({
        username: "validuser",
        email: "valid@example.com",
      });
    });
  });
});
