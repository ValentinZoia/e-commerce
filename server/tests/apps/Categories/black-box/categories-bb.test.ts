import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import { mockValidCategoryDataRequest } from "../../../helpers/factories/category-mocks";
import { PrismaCategoryRepositoryImpl } from "../../../../src/Categories/infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";

const categoryRepository = new PrismaCategoryRepositoryImpl();
const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();

describe("category Black Box Tests", () => {
  let app: Express;
  let authToken: string;
  let categoryId: string;
  let categoryName: string;

  beforeAll(async () => {
    app = createServer();

    // Setup inicial de prueba
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
    await categoryRepository.delete(categoryId);
    await adminRepository.deleteByUsername("blackboxtest");
    await prisma.$disconnect();
  });

  describe("POST /api/categories", () => {
    describe("Success", () => {
      test("should create a category with valid data (201)", async () => {
        const response = await request(app)
          .post("/api/categories")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            ...mockValidCategoryDataRequest,
            name: "category-test-id",
          });

        categoryId = response.body.id;
        categoryName = response.body.name;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("category-test-id");
      });
    });

    describe("Failure", () => {
      test("should return 400 for invalid category data (empty name)", async () => {
        const response = await request(app)
          .post("/api/categories")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            ...mockValidCategoryDataRequest,
            name: "", // Nombre inválido
          });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app)
          .post("/api/categories")
          .send(mockValidCategoryDataRequest);

        expect(response.status).toBe(401);
      });
    });
  });

  describe("GET /api/categories/:id", () => {
    describe("Success", () => {
      test("should get category by id (200)", async () => {
        const response = await request(app).get(
          `/api/categories/${categoryId}`
        );

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(categoryId);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent category", async () => {
        const nonExistentId = "non-existent-id";
        const response = await request(app).get(
          `/api/categories/${nonExistentId}`
        );

        expect(response.status).toBe(404);
      });

      test("should return 404 for invalid category id format", async () => {
        const response = await request(app).get(
          "/api/categories/invalid-id-format"
        );

        expect(response.status).toBe(404);
      });
    });
  });

  describe("GET /api/categories/name/:name", () => {
    describe("Success", () => {
      test("should get category by name (200)", async () => {
        const response = await request(app).get(
          `/api/categories/name/${categoryName}`
        );

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(categoryName);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent category name", async () => {
        const response = await request(app).get(
          "/api/categories/name/non-existent-category"
        );

        expect(response.status).toBe(404);
      });
    });
  });

  describe("GET /api/categories", () => {
    let newCategoryId: string;
    beforeEach(async () => {
      // Crear una categoria mas para las pruebas
      const newCategoryRes = await request(app)
        .post("/api/categories")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          name: "[BlackBox]-Category-test-1",
          slug: "[BlackBox]-Category-test-1",
          description: "[BlackBox] Category 1",
        });

      newCategoryId = newCategoryRes.body.id as string;
    });

    afterEach(async () => {
      await categoryRepository.delete(newCategoryId);
    });

    describe("Success", () => {
      test("should get all categorys (200)", async () => {
        const response = await request(app).get("/api/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
      });
    });
  });

  describe("PUT /api/categories/:id", () => {
    describe("Success", () => {
      test("should update category (200)", async () => {
        const updatedName = "[BlackBox] Category Updated";
        const response = await request(app)
          .put(`/api/categories/${categoryId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .send({
            name: updatedName,
            slug: updatedName,
            description: updatedName,
          });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedName);
      });
    });

    describe("Failure", () => {
      test("should return 400 for invalid update data", async () => {
        const response = await request(app)
          .put(`/api/categories/${categoryId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .send({
            name: "", // Nombre inválido
            slug: "",
          });

        expect(response.status).toBe(400);
      });

      test("should return 404 for non-existent category", async () => {
        const response = await request(app)
          .put("/api/categories/non-existent-id")
          .set("Cookie", [`access_token=${authToken}`])
          .send(mockValidCategoryDataRequest);

        expect(response.status).toBe(404);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app)
          .put(`/api/categories/${categoryId}`)
          .send(mockValidCategoryDataRequest);

        expect(response.status).toBe(401);
      });
    });
  });

  describe("DELETE /api/categories/:id", () => {
    let deletedCategoryId: string;

    beforeAll(async () => {
      // Crear category para eliminar
      const createRes = await request(app)
        .post("/api/categories")
        .set("Cookie", [`access_token=${authToken}`])
        .send({
          name: "[BlackBox] Delete Test category",
          slug: "[BlackBox] Delete Test category",
          description: "[BlackBox] Delete Test category",
        });
      deletedCategoryId = createRes.body.id;
    });

    describe("Success", () => {
      test("should delete category (200)", async () => {
        const response = await request(app)
          .delete(`/api/categories/${deletedCategoryId}`)
          .set("Cookie", [`access_token=${authToken}`]);

        expect(response.status).toBe(200);

        // Verificar que el categoryfue eliminado
        const verifyRes = await request(app)
          .get(`/api/categories/${deletedCategoryId}`)
          .set("Cookie", [`access_token=${authToken}`]);

        expect(verifyRes.status).toBe(404);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent category", async () => {
        const response = await request(app)
          .delete("/api/categories/non-existent-id")
          .set("Cookie", [`access_token=${authToken}`]);

        expect(response.status).toBe(404);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).delete(
          `/api/categories/${deletedCategoryId}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
});
