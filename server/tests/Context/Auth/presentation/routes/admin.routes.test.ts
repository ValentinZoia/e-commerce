import { createServer } from "../../../../../src/server";
import { Express, response } from "express";
import { AuthenticatedRequestHelper } from "../../../../helpers/auth/authenticatedRequestHelper";
import { PrismaClient } from "../../../../../src/generated/prisma";
import {
  mockValidCreateUserRequest,
  mockCreateUserPublicReponse,
  mockCreateUserDbResponse,
  mockValidLoginRequest,
} from "../../../../helpers/factories/admin-mocks";
import { mockAdminRepository } from "../../__mocks__/repositories/MockAdminRepository";
import {
  mockCreateAdminService,
  mockDeleteAdminService,
  mockLogInAdminService,
} from "../../__mocks__/services/MockAdminService";
import { CustomError } from "../../../../../src/shared/domain/errors";

jest.mock(
  "../../../../../src/shared/infrastructure/adapters/jwt.adapter",
  () => ({
    JwtAdapter: {
      validateToken: jest.fn(),
    },
  })
);

jest.mock("../../../../../src/Auth/application/services", () => ({
  CreateAdminService: jest.fn(() => mockCreateAdminService),
  LogInAdminService: jest.fn(() => mockLogInAdminService),
  DeleteAdminService: jest.fn(() => mockDeleteAdminService),
}));

jest.mock(
  "../../../../../src/Auth/infrastructure/repositories/PrismaAdmin.repository.impl",
  () => ({
    PrismaAdminRepositoryImpl: jest.fn(() => mockAdminRepository),
  })
);

describe("Admin Routes", () => {
  let app: Express;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    app = createServer();
  });
  beforeEach(() => {
    //Configuracion mocks base antes de cada test
    AuthenticatedRequestHelper.cleanup();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST", () => {
    describe("login - public", () => {
      describe("Success", () => {
        test("should login successfully", async () => {
          const mockToken = "mock.jwt.token";
          mockLogInAdminService.execute.mockResolvedValue(mockToken);

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app)
              .post("/api/admin/login")
              .send(mockValidLoginRequest);

          expect(mockLogInAdminService.execute).toHaveBeenCalledWith(
            mockValidLoginRequest
          );
          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            success: true,
            message: "Login exitoso",
          });
          // Verificar que la cookie fue establecida (esto dependería de tu implementación de test)
        });
      });
      describe("Failure", () => {
        test("should return 400 if validation fails", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app)
              .post("/api/admin/login")
              .send({});

          expect(response.status).toBe(400);
        });
        test("should return 500 if login service fails", async () => {
          mockLogInAdminService.execute.mockRejectedValue(new Error("Error"));

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app)
              .post("/api/admin/login")
              .send(mockValidLoginRequest);

          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 401 if invalid credentials", async () => {
          mockLogInAdminService.execute.mockRejectedValue(
            CustomError.unauthorized("Invalid credentials")
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app)
              .post("/api/admin/login")
              .send(mockValidLoginRequest);

          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Invalid credentials");
        });
      });
    });
    describe("logout - private - need auth", () => {
      describe("Success", () => {
        test("should logout successfully", async () => {
          const response = await AuthenticatedRequestHelper.authenticatedPost(
            app,
            "/api/admin/logout"
          );

          expect(response.status).toBe(200);
          expect(response.body).toEqual({
            success: true,
            message: "Logout exitoso",
          });
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).post(
              "/api/admin/logout"
            );

          expect(response.status).toBe(401);
        });
      });
    });
    describe("create - public", () => {
      describe("Success", () => {
        test("should createAdmin successfully", async () => {
          mockCreateAdminService.execute.mockResolvedValue(
            mockCreateUserPublicReponse
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app)
              .post("/api/admin")
              .send(mockValidCreateUserRequest);

          expect(mockCreateAdminService.execute).toHaveBeenCalled();
          expect(response.status).toBe(201);
          expect(response.body).toEqual(mockCreateUserPublicReponse);
          expect(response.body.password).toBeUndefined();
        });
      });
      describe("Failure", () => {
        test("should return 400 if validation fails", async () => {
          const response = await AuthenticatedRequestHelper.authenticatedPost(
            app,
            "/api/admin"
          ).send({});

          expect(response.status).toBe(400);
        });
        test("should return 500 if createAdmin service fails", async () => {
          mockCreateAdminService.execute.mockRejectedValue(new Error("Error"));
          const response = await AuthenticatedRequestHelper.authenticatedPost(
            app,
            "/api/admin"
          ).send(mockValidCreateUserRequest);

          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 400 if admin already exists", async () => {
          mockCreateAdminService.execute.mockRejectedValue(
            CustomError.badRequest("Admin already exists")
          );
          const response = await AuthenticatedRequestHelper.authenticatedPost(
            app,
            "/api/admin"
          ).send(mockValidCreateUserRequest);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Admin already exists");
        });
      });
    });
  });

  describe("DELETE - private - need auth", () => {
    describe("Success", () => {
      test("should deleteAdmin successfully", async () => {
        mockDeleteAdminService.execute.mockResolvedValue(Promise.resolve());

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/admin/testuser"
        );

        expect(mockDeleteAdminService.execute).toHaveBeenCalledWith("testuser");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          success: true,
          message: "Admin deleted successfully",
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app).delete(
            "/api/admin/testuser"
          );

        expect(response.status).toBe(401);
      });
      test("should return 404 if admin to delete not found", async () => {
        mockDeleteAdminService.execute.mockRejectedValue(
          CustomError.notFound("Admin not found")
        );

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/admin/nonexistentuser"
        );

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Admin not found");
      });
      test("should return 500 if deleteAdmin service fails", async () => {
        mockDeleteAdminService.execute.mockRejectedValue(new Error("Error"));

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/admin/testuser"
        );

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return 403 if trying to delete self", async () => {
        mockDeleteAdminService.execute.mockRejectedValue(
          CustomError.forbidden("Cannot delete your own account")
        );

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/admin/currentuser"
        );

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Cannot delete your own account");
      });
    });
  });

  describe("GET", () => {
    describe("get session - validate token - private", () => {
      describe("Success", () => {
        test("should get session successfully", async () => {
          const response = await AuthenticatedRequestHelper.authenticatedGet(
            app,
            "/api/admin"
          );

          expect(response.body).toHaveProperty("user");
        });
      });
      describe("Failure", () => {
        test("should return 401 if not authenticated", async () => {
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/admin"
            );

          expect(response.status).toBe(401);
        });
      });
    });
  });
});
