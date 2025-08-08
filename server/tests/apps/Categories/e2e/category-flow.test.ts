import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import { PrismaCategoryRepositoryImpl } from "../../../../src/Categories/infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";

const categoryRepository = new PrismaCategoryRepositoryImpl();
const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();
describe("Category E2E Flow", () => {
  let app: Express;
  let authToken: string;
  let categoryId: string;
  let categoryName: string;
  let existsTheCategory: boolean = false;
  let existsTheAdmin: boolean = false;

  beforeAll(async () => {
    app = createServer();
    existsTheAdmin = false;
    existsTheCategory = false;

    //Autenticar usuario
    //Crear usuario
    const createUser = await request(app)
      .post("/api/admin")
      .send({ username: "e2ecatadmintest", password: "Password1" });

    if (createUser.status === 201) {
      existsTheAdmin = true;
    }

    //Logear
    const loginRes = await request(app)
      .post("/api/admin/login")
      .send({ username: "e2ecatadmintest", password: "Password1" });

    authToken = loginRes.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];
  });
  afterAll(async () => {
    // Limpieza
    await request(app)
      .delete("/api/admin/logout")
      .set("Cookie", [`access_token=${authToken}`]);
    if (existsTheCategory) {
      await categoryRepository.delete(categoryId);
    }

    if (existsTheAdmin) {
      await adminRepository.deleteByUsername("e2ecatadmintest");
    }

    await prisma.$disconnect();
    existsTheAdmin = false;
    existsTheCategory = false;
  });

  test("should complete full category lifecycle", async () => {
    // 1. Crear Categoria
    const createRes = await request(app)
      .post("/api/categories")
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "nombre-test-category",
        slug: "nombre-test-category",
        description: "nombre-test-category",
      });
    categoryId = createRes.body.id as string;
    categoryName = createRes.body.name;

    expect(createRes.status).toBe(201);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    existsTheCategory = true;

    //2. Obtener categoria creado por Id
    const getResById = await request(app).get(`/api/categories/${categoryId}`);

    expect(getResById.status).toBe(200);
    expect(getResById.body.id).toBe(categoryId);

    //3. Obtener categoria por Name
    const getResByName = await request(app).get(
      `/api/categories/name/${categoryName}`
    );

    expect(getResByName.status).toBe(200);
    expect(getResByName.body.name).toBe(categoryName);

    //4. Obtener todas las categorias
    const getAll = await request(app).get(`/api/categories`);

    expect(getAll.status).toBe(200);
    expect(getAll.body).toBeInstanceOf(Array);
    expect(getAll.body[0]).toHaveProperty("id");
    //7. Actualizar Categoria
    const updateRes = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "nuevo-nombre-test-category",
        slug: "nuevo-nombre-test-category",
        description: "nuevo-nombre-test-category",
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty("id");
    expect(updateRes.body.name).toBe("nuevo-nombre-test-category");

    //8. Eliminar Categoria
    const deleteRes = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteRes.status).toBe(200);

    //9. Verificar que la categoria fue eliminada
    const verifyRes = await request(app)
      .get(`/api/categories/${categoryId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(verifyRes.status).toBe(404);
    existsTheCategory = false;
  });
});
