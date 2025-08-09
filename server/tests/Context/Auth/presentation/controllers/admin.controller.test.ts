import { NextFunction, Response, Request } from "express";
import { AdminController } from "../../../../../src/Auth/presentation/controllers";
import {
  mockValidCreateUserRequest,
  mockCreateUserPublicReponse,
  mockCreateUserDbResponse,
  mockValidLoginRequest,
} from "../../../../helpers/factories/admin-mocks";
import {
  mockCreateAdminService,
  mockDeleteAdminService,
  mockLogInAdminService,
} from "../../__mocks__/services/MockAdminService";
import { CustomError } from "../../../../../src/shared/domain/errors";

const MockRequest = (body: any = {}, params: any = {}, query: any = {}) => ({
  body,
  params,
  query,
});

const MockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("AdminController - Unit Test", () => {
  let adminController: AdminController;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks();
    adminController = new AdminController(
      mockCreateAdminService,
      mockLogInAdminService,
      mockDeleteAdminService
    );

    // Initialize Express mock objects
    mockRequest = MockRequest();
    mockResponse = MockResponse();
    mockNext = jest.fn();
  });

  describe("createAdmin ", () => {
    describe("Success", () => {
      test("should create a Admin", async () => {
        mockRequest.body = mockValidCreateUserRequest;

        mockCreateAdminService.execute.mockResolvedValue(
          mockCreateUserPublicReponse
        );

        await adminController.createAdmin(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockCreateAdminService.execute).toHaveBeenCalledWith(
          mockValidCreateUserRequest
        );

        expect(mockResponse.json).toHaveBeenCalledWith(
          mockCreateUserPublicReponse
        );
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest.body = mockValidCreateUserRequest;

        mockCreateAdminService.execute.mockRejectedValue(new Error("Error"));

        await adminController.createAdmin(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("login ", () => {
    describe("Success", () => {
      test("should login a Admin", async () => {
        mockRequest.body = mockValidLoginRequest;
        const token = "mock.jwt.token";
        mockLogInAdminService.execute.mockResolvedValue(token);

        await adminController.login(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockLogInAdminService.execute).toHaveBeenCalledWith(
          mockValidLoginRequest
        );

        expect(mockResponse.cookie).toHaveBeenCalledWith(
          "access_token",
          token,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
            maxAge: 5 * 60 * 60 * 1000, // 5 horas
            sameSite: "strict",
          }
        );

        expect(mockResponse.json).toHaveBeenCalledWith({
          success: true,
          message: "Login exitoso",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockRequest.body = mockValidLoginRequest;

        mockLogInAdminService.execute.mockRejectedValue(new Error("Error"));

        await adminController.login(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
    });
  });
  describe("logout", () => {
    describe("Success", () => {
      test("should logout successfully", async () => {
        await adminController.logout(
          mockRequest as Request,
          mockResponse as Response
        );

        expect(mockResponse.clearCookie).toHaveBeenCalledWith("access_token");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
          success: true,
          message: "Logout exitoso",
        });
      });
    });
    describe("Failure", () => {});
  });
  describe("deleteAdmin", () => {
    describe("Success", () => {
      test("should delete a Admin", async () => {
        mockRequest.params = { username: mockValidCreateUserRequest.username };

        await adminController.deleteAdmin(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockDeleteAdminService.execute).toHaveBeenCalledWith(
          mockRequest.params?.username as string
        );

        expect(mockResponse.json).toHaveBeenCalledWith({
          success: true,
          message: "Admin deleted successfully",
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });
    describe("Failure", () => {
      test("should call next with error", async () => {
        mockDeleteAdminService.execute.mockRejectedValue(new Error("Error"));

        await adminController.deleteAdmin(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      });
      test("should throw CustomError if username is empty", async () => {
        mockRequest = MockRequest({}, {}, {});
        await adminController.deleteAdmin(
          mockRequest as Request,
          mockResponse as Response,
          mockNext
        );
        expect(mockNext).toHaveBeenCalledWith(expect.any(CustomError));
      });
    });
  });
});
