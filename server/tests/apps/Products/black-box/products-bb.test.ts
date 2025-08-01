import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import { mockValidProductDataRequest } from "../../../helpers/factories/product-mocks";

const prisma = new PrismaClient();

describe("Product Black Box Tests", () => {
  let app: Express;
  let authToken: string;
  let categoryId: string;

  beforeAll(async () => {
    app = createServer();

    // Setup inicial de prueba
    const category = await prisma.category.create({
      data: {
        name: "blackbox-test-category",
        slug: "blackbox-test-category",
        description: "blackbox-test-category",
      },
    });
    categoryId = category.name;

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
    await prisma.admin.deleteMany({ where: { username: "blackboxtest" } });
    await prisma.product.deleteMany({
      where: { name: { contains: "[BlackBox]" } },
    });
    await prisma.category.deleteMany({
      where: { name: "blackbox-test-category" },
    });
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
            categoryId,
          });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("[BlackBox] Test Product");
        expect(response.body.categoryId).toBe(categoryId);
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
            categoryId,
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
            categoryId,
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
    let productId: string;

    beforeEach(async () => {
      // Crear producto para las pruebas
      const createRes = await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] Get Test Product",
          categoryId,
        });
      productId = createRes.body.id;
    });

    afterEach(async () => {
      await prisma.product.deleteMany({
        where: { name: "[BlackBox] Get Test Product" },
      });
    });

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
    const testProductName = "[BlackBox] Name Test Product";

    beforeEach(async () => {
      // Crear producto para las pruebas
      await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: testProductName,
          categoryId,
        });
    });

    afterEach(async () => {
      await prisma.product.deleteMany({
        where: { name: testProductName },
      });
    });

    describe("Success", () => {
      test("should get product by name (200)", async () => {
        const response = await request(app).get(
          `/api/products/name/${testProductName}`
        );

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(testProductName);
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
    beforeAll(async () => {
      // Crear varios productos para pruebas
      await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] Featured Product",
          isFeatured: true,
          categoryId,
        });

      await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] New Product",
          isNew: true,
          categoryId,
        });
    });

    afterAll(async () => {
      await prisma.product.deleteMany({
        where: { name: { contains: "[BlackBox]" } },
      });
    });

    describe("Success", () => {
      test("should get all products (200)", async () => {
        const response = await request(app).get("/api/products");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
      });

      test("should filter products by category (200)", async () => {
        const response = await request(app).get(
          `/api/products?category=${categoryId}`
        );

        expect(response.status).toBe(200);
        expect(
          response.body.every((p: any) => p.categoryId === categoryId)
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
      test("should filter new products (200)", async () => {
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
    let productId: string;

    beforeEach(async () => {
      // Crear producto para las pruebas
      const createRes = await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] Update Test Product",
          categoryId,
        });
      productId = createRes.body.id;
    });

    afterEach(async () => {
      await prisma.product.deleteMany({
        where: { name: { contains: "[BlackBox] Update" } },
      });
    });

    describe("Success", () => {
      test("should update product (200)", async () => {
        const updatedName = "[BlackBox] Updated Product Name";
        const response = await request(app)
          .put(`/api/products/${productId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .send({
            ...mockValidProductDataRequest,
            name: updatedName,
            categoryId,
          });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedName);
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
    let productId: string;

    beforeEach(async () => {
      // Crear producto para las pruebas
      const createRes = await request(app)
        .post("/api/products")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          ...mockValidProductDataRequest,
          name: "[BlackBox] Delete Test Product",
          categoryId,
        });
      productId = createRes.body.id;
    });

    describe("Success", () => {
      test("should delete product (200)", async () => {
        const response = await request(app)
          .delete(`/api/products/${productId}`)
          .set("Cookie", [`access_token=${authToken}`]);

        expect(response.status).toBe(200);

        // Verificar que el producto fue eliminado
        const verifyRes = await request(app)
          .get(`/api/products/${productId}`)
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
          `/api/products/${productId}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
});
