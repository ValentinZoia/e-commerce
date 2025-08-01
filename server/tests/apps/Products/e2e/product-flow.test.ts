import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import { mockValidProductDataRequest } from "../../../helpers/factories/product-mocks";

const prisma = new PrismaClient();
describe("Product E2E Flow", () => {
  let app: Express;
  let authToken: string;
  let categoryId: string;
  let productId: string;
  let productName: string;

  beforeAll(async () => {
    app = createServer();

    //Crear datos de prueba directamente en DB
    //Crear categoria
    const category = await prisma.category.create({
      data: {
        name: "e2e-test-category",
        slug: "e2e-test-category",
        description: "e2e-test-category",
      },
    });
    categoryId = category.name;

    //Autenticar usuario
    //Crear usuario
    const createUser = await request(app)
      .post("/api/admin")
      .send({ username: "admintest", password: "Password1" });

    //Logear
    const loginRes = await request(app)
      .post("/api/admin/login")
      .send({ username: "admintest", password: "Password1" });

    authToken = loginRes.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];
  });

  afterAll(async () => {
    await prisma.admin.deleteMany({ where: { username: "admintest" } });
    await prisma.product.deleteMany({ where: { name: { contains: "[E2E]" } } });
    await prisma.category.deleteMany({ where: { name: "e2e-test-category" } });
    await prisma.$disconnect();
  });

  test("should complete full product lifecycle", async () => {
    // 1. Crear Producto
    const createRes = await request(app)
      .post("/api/products")
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        ...mockValidProductDataRequest,
        name: "[E2E] Test Product",
        categoryId,
      });

    expect(createRes.status).toBe(201);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    productId = createRes.body.id;
    productName = createRes.body.name;

    //2. Obtener producto creado por Id
    const getResById = await request(app)
      .get(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getResById.status).toBe(200);
    expect(getResById.body.id).toBe(productId);
    expect(getResById.body.categoryId).toBe(categoryId);

    //3. Obtener producto por Name
    const getByNameRes = await request(app)
      .get(`/api/products/name/${productName}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getByNameRes.status).toBe(200);
    expect(getByNameRes.body.name).toBe(productName);
    expect(getByNameRes.body.categoryId).toBe(categoryId);

    //3. Obtener todos los productos por categoria
    /*
      *la request se vera algo asi:
       - /api/products?featured=true
       -/api/products?new=true
       -/api/products?promotion=true
       -/api/products?featured=true
       -/api/products?category=${categoryId}

       dependiendo los productos que se quieran traer.
      */
    const getAllByCategory = await request(app)
      .get(`/api/products?category=${categoryId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAllByCategory.status).toBe(200);
    expect(getAllByCategory.body).toBeInstanceOf(Array);
    expect(getAllByCategory.body[0].categoryId).toBe(categoryId);

    // 4. Obtener todos los productos
    const getAll = await request(app)
      .get(`/api/products`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAll.status).toBe(200);
    expect(getAll.body).toBeInstanceOf(Array);
    expect(getAll.body[0]).toHaveProperty("id");

    // 5. Obtner productos por status - new, featured, promotion
    const getAllFeatured = await request(app)
      .get(`/api/products?featured=true`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAllFeatured.status).toBe(200);
    expect(getAllFeatured.body).toBeInstanceOf(Array);
    expect(getAllFeatured.body[0].isFeatured).toBe(true);

    //6. Actualizar Producto
    const updateRes = await request(app)
      .put(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        ...mockValidProductDataRequest,
        name: "[E2E] Test Product Updated",
        categoryId,
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty("id");
    expect(updateRes.body.name).toBe("[E2E] Test Product Updated");

    //7. Eliminar Producto
    const deleteRes = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteRes.status).toBe(200);

    //8. Verificar que el producto fue eliminado
    const verifyRes = await request(app)
      .get(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(verifyRes.status).toBe(404);
  });
});
