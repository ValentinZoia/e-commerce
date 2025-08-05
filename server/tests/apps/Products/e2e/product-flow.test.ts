import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { Category, PrismaClient } from "../../../../src/generated/prisma";
import { mockValidProductDataRequest } from "../../../helpers/factories/product-mocks";
import { PrismaCategoryRepositoryImpl } from "../../../../src/Categories/infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";
import { PrismaProductRepositoryImpl } from "../../../../src/Products/infrastructure/repositories";

const categoryRepository = new PrismaCategoryRepositoryImpl();
const productRepository = new PrismaProductRepositoryImpl();
const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();
describe("Product E2E Flow", () => {
  let app: Express;
  let authToken: string;
  let categoryId: string;
  let categoryName: string;
  let productId: string;
  let productName: string;
  let existsTheProduct: boolean = false;

  beforeAll(async () => {
    app = createServer();

    //Crear datos de prueba directamente en DB
    //Crear categoria
    const category = await categoryRepository.create({
      name: "e2e-test-category",
      slug: "e2e-test-category",
      description: "e2e-test-category",
    } as Category);
    categoryId = category.id as string;
    categoryName = category.name;

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
    // Limpieza
    await categoryRepository.delete(categoryId);
    if (existsTheProduct) {
      await productRepository.delete(productId);
    }

    await adminRepository.deleteByUsername("admintest");
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
        categoryId: categoryName,
      });
    productId = createRes.body.id as string;
    productName = createRes.body.name;

    expect(createRes.status).toBe(201);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    existsTheProduct = true;

    //2. Obtener producto creado por Id
    const getResById = await request(app)
      .get(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getResById.status).toBe(200);
    expect(getResById.body.id).toBe(productId);
    expect(getResById.body.categoryId).toBe(categoryName);

    //3. Obtener producto por Name
    const getByNameRes = await request(app)
      .get(`/api/products/name/${productName}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getByNameRes.status).toBe(200);
    expect(getByNameRes.body.name).toBe(productName);
    expect(getByNameRes.body.categoryId).toBe(categoryName);

    //4. Obtener todos los productos por categoria
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
      .get(`/api/products?category=${categoryName}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAllByCategory.status).toBe(200);
    expect(getAllByCategory.body).toBeInstanceOf(Array);
    expect(getAllByCategory.body[0].categoryId).toBe(categoryName);

    // 5. Obtener todos los productos
    const getAll = await request(app)
      .get(`/api/products`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAll.status).toBe(200);
    expect(getAll.body).toBeInstanceOf(Array);
    expect(getAll.body[0]).toHaveProperty("id");

    // 6. Obtner productos por status - new, featured, promotion
    const getAllFeatured = await request(app)
      .get(`/api/products?featured=true`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAllFeatured.status).toBe(200);
    expect(getAllFeatured.body).toBeInstanceOf(Array);
    expect(getAllFeatured.body[0].isFeatured).toBe(true);

    //7. Actualizar Producto
    const updateRes = await request(app)
      .put(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        ...mockValidProductDataRequest,
        name: "[E2E] Test Product Updated",
        categoryId: categoryName,
      });

    expect(updateRes.status).toBe(200);
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty("id");
    expect(updateRes.body.name).toBe("[E2E] Test Product Updated");

    //8. Eliminar Producto
    const deleteRes = await request(app)
      .delete(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteRes.status).toBe(200);

    //9. Verificar que el producto fue eliminado
    const verifyRes = await request(app)
      .get(`/api/products/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(verifyRes.status).toBe(404);
    existsTheProduct = false;
  });
});
