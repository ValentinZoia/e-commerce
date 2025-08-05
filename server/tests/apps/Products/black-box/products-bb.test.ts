import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";

import {
  mockValidProductDataRequest,
  mockValidProductDataRequestConvertedToProductType,
} from "../../../helpers/factories/product-mocks";
import { PrismaProductRepositoryImpl } from "../../../../src/Products/infrastructure/repositories";
import { PrismaCategoryRepositoryImpl } from "../../../../src/Categories/infrastructure/repositories";
import { Category, PrismaClient } from "../../../../src/generated/prisma";
import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";

const categoryRepository = new PrismaCategoryRepositoryImpl();
const productRepository = new PrismaProductRepositoryImpl();
const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();

describe("Product Black Box Tests", () => {
  let app: Express;
  let authToken: string;
  let categoryId: string;
  let categoryName: string;
  let productId: string;
  let productName: string;

  beforeAll(async () => {
    app = createServer();

    // Setup inicial de prueba
    //Creamos una categoria de prueba para el test
    const category = await categoryRepository.create({
      name: "blackbox-test-category",
      slug: "blackbox-test-category",
      description: "blackbox-test-category",
    } as Category);

    categoryId = category.id as string;
    categoryName = category.name;

    // Crear y autenticar usuario de prueba
    await request(app)
      .post("/api/admin")
      .send({ username: "blackboxtest", password: "Password1" });

    const loginRes = await request(app)
      .post("/api/admin/login")
      .send({ username: "blackboxtest", password: "Password1" });

    authToken = loginRes.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];
  });

  afterAll(async () => {
    // Limpieza

    await productRepository.delete(productId);
    await categoryRepository.delete(categoryId);
    await adminRepository.deleteByUsername("blackboxtest");

    await prisma.$disconnect();
  });

  describe("POST /api/products", () => {
    describe("Success", () => {
      test("should create a product with valid data (201)", async () => {
        const response = await request(app)
          .post("/api/products")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            ...mockValidProductDataRequest,
            name: "[BlackBox] Test Product",
            categoryId: categoryName,
          });
        productId = response.body.id as string;
        productName = response.body.name;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("[BlackBox] Test Product");
        expect(response.body.categoryId).toBe(categoryName);
      });
    });

    describe("Failure", () => {
      test("should return 400 for invalid product data (empty name)", async () => {
        const response = await request(app)
          .post("/api/products")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            ...mockValidProductDataRequest,
            name: "", // Nombre inválido
            categoryId: categoryName,
          });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
      });

      test("should return 400 for invalid product data (negative price)", async () => {
        const response = await request(app)
          .post("/api/products")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            ...mockValidProductDataRequest,
            price: -10, // Precio inválido
            categoryId: categoryName,
          });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app)
          .post("/api/products")
          .send(mockValidProductDataRequest);

        expect(response.status).toBe(401);
      });
    });
  });

  describe("GET /api/products/:id", () => {
    describe("Success", () => {
      test("should get product by id (200)", async () => {
        const response = await request(app).get(`/api/products/${productId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(productId);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent product", async () => {
        const nonExistentId = "non-existent-id";
        const response = await request(app).get(
          `/api/products/${nonExistentId}`
        );

        expect(response.status).toBe(404);
      });

      test("should return 404 for invalid product id format", async () => {
        const response = await request(app).get(
          "/api/products/invalid-id-format"
        );

        expect(response.status).toBe(404);
      });
    });
  });

  describe("GET /api/products/name/:name", () => {
    describe("Success", () => {
      test("should get product by name (200)", async () => {
        const response = await request(app).get(
          `/api/products/name/${productName}`
        );

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(productName);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent product name", async () => {
        const response = await request(app).get(
          "/api/products/name/non-existent-product"
        );

        expect(response.status).toBe(404);
      });
    });
  });

  describe("GET /api/products", () => {
    let productFeaturedId: string;
    let productNewId: string;
    beforeAll(async () => {
      // Crear varios productos para pruebas
      const productFeatured = await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] Featured Product",
          isFeatured: true,
          categoryId: categoryName,
        });

      productFeaturedId = productFeatured.body.id;

      const productNew = await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] New Product",
          isNew: true,
          categoryId: categoryName,
        });

      productNewId = productNew.body.id;
    });

    afterAll(async () => {
      await productRepository.delete(productFeaturedId);
      await productRepository.delete(productNewId);
    });

    describe("Success", () => {
      test("should get all products (200)", async () => {
        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
      });

      test("should filter products by category (200)", async () => {
        const response = await request(app).get(
          `/api/products?category=${categoryName}`
        );

        expect(response.status).toBe(200);
        expect(
          response.body.every((p: any) => p.categoryId === categoryName)
        ).toBe(true);
      });

      test("should filter featured products (200)", async () => {
        const response = await request(app).get("/api/products?featured=true");

        expect(response.status).toBe(200);
        expect(response.body.every((p: any) => p.isFeatured)).toBe(true);
      });

      test("should filter new products (200)", async () => {
        const response = await request(app).get("/api/products?new=true");

        expect(response.status).toBe(200);
        expect(response.body.every((p: any) => p.isNew)).toBe(true);
      });
      test("should filter promotion products (200)", async () => {
        const response = await request(app).get("/api/products?promotion=true");

        expect(response.status).toBe(200);
        expect(response.body.every((p: any) => p.isPromotion)).toBe(true);
      });
    });

    describe("Failure", () => {
      test("should return empty array for non-existent category", async () => {
        const response = await request(app).get(
          "/api/products?category=non-existent"
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });
    });
  });

  describe("PUT /api/products/:id", () => {
    describe("Success", () => {
      test("should update product (200)", async () => {
        const updatedPrice = 1000;
        const response = await request(app)
          .put(`/api/products/${productId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .send({
            ...mockValidProductDataRequest,
            name: "otro-nombre",
            price: updatedPrice,
            cashDiscountPercentage: 0,
            cashPrice: null,
            categoryId: categoryName,
          });

        expect(response.status).toBe(200);
        expect(response.body.price).toBe(updatedPrice);
        expect(response.body.cashDiscountPercentage).toBe(0);
        expect(response.body.cashPrice).toBe(null);
      });
    });

    describe("Failure", () => {
      test("should return 400 for invalid update data", async () => {
        const response = await request(app)
          .put(`/api/products/${productId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .send({
            name: "", // Nombre inválido
            price: -10, // Precio inválido
          });

        expect(response.status).toBe(400);
      });

      test("should return 404 for non-existent product", async () => {
        const response = await request(app)
          .put("/api/products/non-existent-id")
          .set("Cookie", [`access_token=${authToken}`])
          .send(mockValidProductDataRequest);

        expect(response.status).toBe(404);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app)
          .put(`/api/products/${productId}`)
          .send(mockValidProductDataRequest);

        expect(response.status).toBe(401);
      });
    });
  });

  describe("DELETE /api/products/:id", () => {
    let productToDeleteId: string;
    beforeAll(async () => {
      const productToDelete = await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] Product to delete",
          categoryId: categoryName,
        });

      productToDeleteId = productToDelete.body.id;
    });

    describe("Success", () => {
      test("should delete product (200)", async () => {
        const response = await request(app)
          .delete(`/api/products/${productToDeleteId}`)
          .set("Cookie", [`access_token=${authToken}`]);

        expect(response.status).toBe(200);

        // Verificar que el producto fue eliminado
        const verifyRes = await request(app)
          .get(`/api/products/${productToDeleteId}`)
          .set("Cookie", [`access_token=${authToken}`]);

        expect(verifyRes.status).toBe(404);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent product", async () => {
        const response = await request(app)
          .delete("/api/products/non-existent-id")
          .set("Cookie", [`access_token=${authToken}`]);

        expect(response.status).toBe(404);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).delete(
          `/api/products/${productToDeleteId}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
});
