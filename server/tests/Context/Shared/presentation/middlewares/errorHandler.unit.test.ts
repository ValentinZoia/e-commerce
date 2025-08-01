import { Request, Response, NextFunction } from "express";
import { createZodError } from "../../../../helpers/validation/errorHelpers";
import { errorHandler } from "../../../../../src/shared/presentation/middlewares/errorHandler";
import {
  CustomError,
  ValidationError,
} from "../../../../../src/shared/domain/errors";
import { PrismaClientKnownRequestError } from "../../../../../src/generated/prisma/runtime/library";

describe("ErrorHandler Middleware Unit test", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Initialize Express mock objects
    mockRequest = {};
    (mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }),
      (mockNext = jest.fn());
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Zod Validation Errors", () => {
    test("should handle Zod errors with proper formatting", () => {
      const zodError = createZodError();
      errorHandler(
        zodError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "ValidationError",
        statusCode: 400,
        message: "Validation failed",
        errors: {
          name: ["String must contain at least 3 character(s)"],
        },
      });
    });
  });

  describe("Custom Errors", () => {
    test("should handle custom CustomError", () => {
      const customError = new CustomError(402, "402 error", "CustomError");
      errorHandler(
        customError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(402);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "CustomError",
        statusCode: 402,
        message: "402 error",
      });
    });

    test("should handle CustomError - Bad Request", () => {
      const customError = CustomError.badRequest("Bad Request - error");
      errorHandler(
        customError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "BadRequestError",
        statusCode: 400,
        message: "Bad Request - error",
      });
    });

    test("should handle CustomError - Unauthorized", () => {
      const customError = CustomError.unauthorized("Unauthorized - error");
      errorHandler(
        customError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "UnauthorizedError",
        statusCode: 401,
        message: "Unauthorized - error",
      });
    });

    test("should handle CustomError - Forbidden", () => {
      const customError = CustomError.forbidden("ForBidden - error");
      errorHandler(
        customError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "ForbiddenError",
        statusCode: 403,
        message: "ForBidden - error",
      });
    });

    test("should handle CustomError - Not Found", () => {
      const customError = CustomError.notFound("Not Found - error");
      errorHandler(
        customError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "NotFoundError",
        statusCode: 404,
        message: "Not Found - error",
      });
    });

    test("should handle CustomError - Internal Server Error", () => {
      const customError = CustomError.internalServerError();
      errorHandler(
        customError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "InternalServerError",
        statusCode: 500,
        message: "Internal Server Error",
      });
    });
  });

  describe("Validation Errors", () => {
    test("should handle custom ValidationError", () => {
      const validationError = new ValidationError({
        email: ["Invalid email format"],
      });

      errorHandler(
        validationError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "ValidationError",
        statusCode: 400,
        message: "Validation failed",
        errors: {
          email: ["Invalid email format"],
        },
      });
    });
  });

  describe("Prisma Errors", () => {
    test("should handle P2002 (unique constraint) errors", () => {
      const prismaError = new PrismaClientKnownRequestError(
        "Unique constraint failed",
        {
          code: "P2002",
          clientVersion: "1.0",
          meta: { target: ["email"] },
        }
      );

      errorHandler(
        prismaError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "UniqueConstraintError",
        message: "Ya existe un registro con este valor",
      });
    });

    test("should handle P2003 (foreign key) errors", () => {
      const prismaError = new PrismaClientKnownRequestError(
        "Foreign key constraint failed",
        {
          code: "P2003",
          clientVersion: "1.0",
          meta: { field_name: "userId" },
        }
      );

      errorHandler(
        prismaError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "ForeignKeyConstraintError",
        message: "El valor de referencia no existe",
      });
    });

    test("should handle P2023 Inconsistent ColumnData errors", () => {
      const prismaError = new PrismaClientKnownRequestError(
        "Inconsistent ColumnData",
        {
          code: "P2023",
          clientVersion: "1.0",
          meta: { field_name: "userId" },
        }
      );

      errorHandler(
        prismaError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "InconsistentColumnData",
        message: "Valor inválido de identificador",
      });
    });

    test("should handle P2025 NotFound errors", () => {
      const prismaError = new PrismaClientKnownRequestError("Not Found", {
        code: "P2025",
        clientVersion: "1.0",
        meta: { field_name: "userId" },
      });

      errorHandler(
        prismaError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "NotFoundError",
        message: "Recurso no encontrado",
      });
    });
  });

  describe("Server Errors", () => {
    test("should handle server errors", () => {
      const serverError = new Error("Server error");
      errorHandler(
        serverError,
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        type: "InternalServerError",
        message: `Error del Servidor`,
      });
    });
  });
});
