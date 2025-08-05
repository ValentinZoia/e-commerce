import { createServer } from "../../../../../src/server";
import { Express } from "express";
import { AuthenticatedRequestHelper } from "../../../../helpers/auth/authenticatedRequestHelper";
import { PrismaClient } from "../../../../../src/generated/prisma";
import {
  mockValidProductDataRequest,
  mockValidProductDataResponse,
  mockValidProductDataResponseV2,
} from "../../../../helpers/factories/product-mocks";
import { mockAdminRepository } from "../../../Auth/__mocks__/repositories/MockAdminRepository";

import { mockProductController } from "../../__mocks__/controllers/MockProductController";
import {
  mockCreateProductService,
  mockUpdateProductService,
  mockDeleteProductService,
  mockGetAllProductsService,
  mockGetProductByIdService,
  mockGetProductByNameService,
} from "../../__mocks__/services/MockProductServices";
import { CustomError } from "../../../../../src/shared/domain/errors";

jest.mock(
  "../../../../../src/shared/infrastructure/adapters/jwt.adapter",
  () => ({
    JwtAdapter: {
      validateToken: jest.fn(),
    },
  })
);

jest.mock("../../../../../src/Products/application/services", () => ({
  CreateProductService: jest.fn(() => mockCreateProductService),
  UpdateProductService: jest.fn(() => mockUpdateProductService),
  DeleteProductService: jest.fn(() => mockDeleteProductService),
  GetAllProductsService: jest.fn(() => mockGetAllProductsService),
  GetProductByIdService: jest.fn(() => mockGetProductByIdService),
  GetProductByNameService: jest.fn(() => mockGetProductByNameService),
}));
jest.mock(
  "../../../../../src/Auth/infrastructure/repositories/PrismaAdmin.repository.impl",
  () => ({
    PrismaAdminRepositoryImpl: jest.fn(() => mockAdminRepository),
  })
);

describe("Product Routes", () => {
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
      test("should crate a product successfully", async () => {
        mockCreateProductService.execute.mockResolvedValue(
          mockValidProductDataResponse
        );

        const response = await AuthenticatedRequestHelper.authenticatedPost(
          app,
          "/api/products"
        ).send(mockValidProductDataRequest);

        expect(mockCreateProductService.execute).toHaveBeenCalled();
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(mockValidProductDataRequest.name);
        expect(response.body).toEqual({
          ...mockValidProductDataResponse,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .post("/api/products")
            .send(mockValidProductDataRequest);

        expect(response.status).toBe(401);
      });
      test("should return 400 if it validation fails", async () => {
        const response = await AuthenticatedRequestHelper.authenticatedPost(
          app,
          "/api/products"
        ).send({});

        expect(response.status).toBe(400);
      });
      test("should return a 500 if create product service fails", async () => {
        mockCreateProductService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedPost(
          app,
          "/api/products"
        ).send(mockValidProductDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
    });
  });
  describe("PUT", () => {
    describe("Success", () => {
      test("should update a product successfully", async () => {
        mockUpdateProductService.execute.mockResolvedValue(
          mockValidProductDataResponse
        );

        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/products/:id"
        ).send(mockValidProductDataRequest);

        expect(mockUpdateProductService.execute).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe(mockValidProductDataRequest.name);
        expect(response.body).toEqual({
          ...mockValidProductDataResponse,
          updatedAt: expect.any(String),
          createdAt: expect.any(String),
        });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app)
            .put("/api/products/:id")
            .send(mockValidProductDataRequest);

        expect(response.status).toBe(401);
      });
      test("should return 400 if it validation fails", async () => {
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/products/:id"
        ).send({});

        expect(response.status).toBe(400);
      });
      test("should return a 500 if update product service fails", async () => {
        mockUpdateProductService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/products/:id"
        ).send(mockValidProductDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return a 404 if product by id does not exist", async () => {
        mockUpdateProductService.execute.mockRejectedValue(
          CustomError.notFound("Product not found")
        );
        const response = await AuthenticatedRequestHelper.authenticatedPut(
          app,
          "/api/products/:id"
        ).send(mockValidProductDataRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Product not found");
      });
    });
  });
  describe("DELETE", () => {
    describe("Success", () => {
      test("should delete a product successfully", async () => {
        mockDeleteProductService.execute.mockResolvedValue(Promise.resolve());

        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/products/:id"
        );

        expect(mockDeleteProductService.execute).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Product deleted" });
      });
    });
    describe("Failure", () => {
      test("should return 401 if not authenticated", async () => {
        const response =
          await AuthenticatedRequestHelper.unauthenticatedRequest(app).delete(
            "/api/products/:id"
          );

        expect(response.status).toBe(401);
      });
      test("should return a 500 if delete product service fails", async () => {
        mockDeleteProductService.execute.mockRejectedValue(new Error("Error"));
        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/products/:id"
        ).send(mockValidProductDataRequest);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("message");
      });
      test("should return a 404 if product not found", async () => {
        mockDeleteProductService.execute.mockRejectedValue(
          CustomError.notFound("Product not found")
        );
        const response = await AuthenticatedRequestHelper.authenticatedDelete(
          app,
          "/api/products/:id"
        ).send(mockValidProductDataRequest);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Product not found");
      });
    });
  });
  describe("GET", () => {
    describe("GET ALL", () => {
      describe("Success", () => {
        test("should get all products successfully", async () => {
          mockGetAllProductsService.execute.mockResolvedValue([
            mockValidProductDataResponse,
            mockValidProductDataResponseV2,
          ]);

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/products"
            );

          expect(mockGetAllProductsService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body[0]).toHaveProperty("id");
          expect(response.body[0].name).toBe(mockValidProductDataRequest.name);
        });
      });
      describe("Failure", () => {
        test("should return a 500 if get all products service fails", async () => {
          mockGetAllProductsService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/products"
            );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
      });
    });
    describe("GET BY ID", () => {
      describe("Success", () => {
        test("should get product by id successfully", async () => {
          mockGetProductByIdService.execute.mockResolvedValue(
            mockValidProductDataResponse
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              `/api/products/${mockValidProductDataResponse.id}`
            );

          expect(mockGetProductByIdService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id");
          expect(response.body.id).toBe(mockValidProductDataResponse.id);
        });
      });
      describe("Failure", () => {
        test("should return a 500 if get product by id service fails", async () => {
          mockGetProductByIdService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/products/:id"
            );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return a 404 if product by id does not exist", async () => {
          mockGetProductByIdService.execute.mockRejectedValue(
            CustomError.notFound("Product not found")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/products/:id"
            );
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Product not found");
        });
      });
    });
    describe("GET BY NAME", () => {
      describe("Success", () => {
        test("should get product by name successfully", async () => {
          mockGetProductByNameService.execute.mockResolvedValue(
            mockValidProductDataResponse
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              `/api/products/name/${mockValidProductDataResponse.name}`
            );

          expect(mockGetProductByNameService.execute).toHaveBeenCalled();
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Object);
          expect(response.body).toHaveProperty("id");
          expect(response.body.name).toBe(mockValidProductDataResponse.name);
        });
      });
      describe("Failure", () => {
        test("should return a 500 if get product by name service fails", async () => {
          mockGetProductByNameService.execute.mockRejectedValue(
            new Error("Error")
          );
          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              "/api/products/name/:name"
            );
          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty("message");
        });
        test("should return 404 if product not found by name", async () => {
          mockGetProductByNameService.execute.mockRejectedValue(
            CustomError.notFound("Product not found")
          );

          const response =
            await AuthenticatedRequestHelper.unauthenticatedRequest(app).get(
              `/api/products/name/non-existent-name`
            );

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Product not found");
        });
      });
    });
  });
});
