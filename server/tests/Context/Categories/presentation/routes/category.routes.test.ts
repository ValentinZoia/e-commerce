import { createServer } from "../../../../../src/server";
import { Express } from "express";
import { AuthenticatedRequestHelper } from "../../../../helpers/auth/authenticatedRequestHelper";
import { PrismaClient } from "../../../../../src/generated/prisma";
import {
  mockValidCategoryDataRequest,
  mockValidCategoryDataResponse,
  mockValidCategoryDataResponseV2,
} from "../../../../helpers/factories/category-mocks";
import { mockAdminRepository } from "../../../Auth/__mocks__/repositories/MockAdminRepository";

import { mockCategoryController } from "../../__mocks__/controllers/MockCategoryController";
import {
  mockCreateCategoryService,
  mockUpdateCategoryService,
  mockDeleteCategoryService,
  mockGetAllCategoriesService,
  mockGetCategoryByIdService,
  mockGetCategoryByNameService,
} from "../../__mocks__/services/MockCategoryServices";
import { CustomError } from "../../../../../src/shared/domain/errors";

jest.mock(
  "../../../../../src/shared/infrastructure/adapters/jwt.adapter",
  () => ({
    JwtAdapter: {
      validateToken: jest.fn(),
    },
  })
);

jest.mock("../../../../../src/Categories/application/services", () => ({
  CreateCategoryService: jest.fn(() => mockCreateCategoryService),
  UpdateCategoryService: jest.fn(() => mockUpdateCategoryService),
  DeleteCategoryService: jest.fn(() => mockDeleteCategoryService),
  GetAllCategoriesService: jest.fn(() => mockGetAllCategoriesService),
  GetCategoryByIdService: jest.fn(() => mockGetCategoryByIdService),
  GetCategoryByNameService: jest.fn(() => mockGetCategoryByNameService),
}));
jest.mock(
  "../../../../../src/Auth/infrastructure/repositories/PrismaAdmin.repository.impl",
  () => ({
    PrismaAdminRepositoryImpl: jest.fn(() => mockAdminRepository),
  })
);

describe("Category Routes", () => {
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
    describe("Success", () => {
      test("should crate a Category successfully", async () => {
        mockCreateCategoryService.execute.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        const response = await AuthenticatedRequestHelper.authenticatedPost(
          app,
          "/api/categories"
        ).send(mockValidCategoryDataRequest);

        expect(mockCreateCategoryService.execute).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(mockValidCategoryDataRequest.name);
        expect(response.body).toEqual({
          ...mockValidCategoryDataResponse,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .post("/api/categories")
            .send(mockValidCategoryDataRequest);

        expect(response.status).toBe(401);
      });
      test("should return 400 if it validation fails", async () => {
        const response = await AuthenticatedRequestHelper.authenticatedPost(
          app,
          "/api/categories"
        ).send({});

        expect(response.status).toBe(400);
      });
      test("should return a 500 if create Category service fails", async () => {
        mockCreateCategoryService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedPost(
          app,
          "/api/categories"
        ).send(mockValidCategoryDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
    });
  });
  describe("PUT", () => {
    describe("Success", () => {
      test("should update a Category successfully", async () => {
        mockUpdateCategoryService.execute.mockResolvedValue(
          mockValidCategoryDataResponse
        );

        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/categories/:id"
        ).send(mockValidCategoryDataRequest);

        expect(mockUpdateCategoryService.execute).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(mockValidCategoryDataRequest.name);
        expect(response.body).toEqual({
          ...mockValidCategoryDataResponse,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .put("/api/categories/:id")
            .send(mockValidCategoryDataRequest);

        expect(response.status).toBe(401);
      });
      test("should return 400 if it validation fails", async () => {
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/categories/:id"
        ).send({});

        expect(response.status).toBe(400);
      });
      test("should return a 500 if update Category service fails", async () => {
        mockUpdateCategoryService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/categories/:id"
        ).send(mockValidCategoryDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return a 404 if Category by id does not exist", async () => {
        mockUpdateCategoryService.execute.mockRejectedValue(
          CustomError.notFound("Category not found")
        );
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/categories/:id"
        ).send(mockValidCategoryDataRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Category not found");
      });
    });
  });
  describe("DELETE", () => {
    describe("Success", () => {
      test("should delete a Category successfully", async () => {
        mockDeleteCategoryService.execute.mockResolvedValue(Promise.resolve());

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/categories/:id"
        );

        expect(mockDeleteCategoryService.execute).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Category deleted" });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app).delete(
            "/api/categories/:id"
          );

        expect(response.status).toBe(401);
      });
      test("should return a 500 if delete Category service fails", async () => {
        mockDeleteCategoryService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/categories/:id"
        ).send(mockValidCategoryDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return a 404 if Category not found", async () => {
        mockDeleteCategoryService.execute.mockRejectedValue(
          CustomError.notFound("Category not found")
        );
        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/categories/:id"
        ).send(mockValidCategoryDataRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Category not found");
      });
    });
  });
  describe("GET", () => {
    describe("GET ALL", () => {
      describe("Success", () => {
        test("should get all Categorys successfully", async () => {
          mockGetAllCategoriesService.execute.mockResolvedValue([
            mockValidCategoryDataResponse,
            mockValidCategoryDataResponseV2,
          ]);

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/categories"
            );

          expect(mockGetAllCategoriesService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0].name).toBe(mockValidCategoryDataRequest.name);
        });
      });
      describe("Failure", () => {
        test("should return a 500 if get all Categorys service fails", async () => {
          mockGetAllCategoriesService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/categories"
            );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
      });
    });
    describe("GET BY ID", () => {
      describe("Success", () => {
        test("should get Category by id successfully", async () => {
          mockGetCategoryByIdService.execute.mockResolvedValue(
            mockValidCategoryDataResponse
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              `/api/categories/${mockValidCategoryDataResponse.id}`
            );

          expect(mockGetCategoryByIdService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id");
          expect(response.body.id).toBe(mockValidCategoryDataResponse.id);
        });
      });
      describe("Failure", () => {
        test("should return a 500 if get Category by id service fails", async () => {
          mockGetCategoryByIdService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/categories/:id"
            );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return a 404 if Category by id does not exist", async () => {
          mockGetCategoryByIdService.execute.mockRejectedValue(
            CustomError.notFound("Category not found")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/categories/:id"
            );
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Category not found");
        });
      });
    });
    describe("GET BY NAME", () => {
      describe("Success", () => {
        test("should get Category by name successfully", async () => {
          mockGetCategoryByNameService.execute.mockResolvedValue(
            mockValidCategoryDataResponse
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              `/api/categories/name/${mockValidCategoryDataResponse.name}`
            );

          expect(mockGetCategoryByNameService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id");
          expect(response.body.name).toBe(mockValidCategoryDataResponse.name);
        });
      });
      describe("Failure", () => {
        test("should return a 500 if get Category by name service fails", async () => {
          mockGetCategoryByNameService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/categories/name/:name"
            );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if Category not found by name", async () => {
          mockGetCategoryByNameService.execute.mockRejectedValue(
            CustomError.notFound("Category not found")
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              `/api/categories/name/non-existent-name`
            );

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Category not found");
        });
      });
    });
  });
});
