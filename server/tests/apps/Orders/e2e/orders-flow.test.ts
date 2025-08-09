import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import { PrismaOrderRepositoryImpl } from "../../../../src/Orders/infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";
const orderRepository = new PrismaOrderRepositoryImpl();
const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();

describe("Order E2E Flow", () => {
  let app: Express;
  let authToken: string;
  let orderId: string;
  let customerEmail: string;
  let customerName: string;
  let customerPhone: string;
  let productId: string;
  let existsTheOrder: boolean = false;
  let existsTheAdmin: boolean = false;
  beforeAll(async () => {
    app = createServer();
    existsTheOrder = false;
    existsTheAdmin = false;
    // Setup inicial de prueba
    // Crear y autenticar usuario de prueba
    const createAdminRes = await request(app)
      .post("/api/admin")
      .send({ username: "e2eoradmintest", password: "Password1" });

    if (createAdminRes.status === 201) {
      existsTheAdmin = true;
    }

    const loginRes = await request(app)
      .post("/api/admin/login")
      .send({ username: "e2eoradmintest", password: "Password1" });

    authToken = loginRes.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];
  });
  afterAll(async () => {
    // Limpieza
    await request(app)
      .delete("/api/admin/logout")
      .set("Cookie", [`access_token=${authToken}`]);
    if (existsTheOrder) await orderRepository.delete(orderId);
    if (existsTheAdmin) {
      await adminRepository.deleteByUsername("e2eoradmintest");
    }
    await prisma.$disconnect();
    existsTheAdmin = false;
    existsTheOrder = false;
  });
  test("should complete full order lifecycle", async () => {
    // 1. Crear Orden
    const createRes = await request(app)
      .post("/api/orders")
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        customerPhone: "1198765432",
        customerEmail: "pablocuervo@gmail.com",
        customerName: "Pablo Hernandez",
        customerNotes: null,
        whatsappMessage: null,
        whatsappStatus: "pending",
        paymentMethod: "mercadopago",
        subtotal: 1000,
        total: 1000,
        isFreeShipping: false,
        products: [
          {
            productId: "1",
            productName: "Samsung A06",
            quantity: 1,
            size: null,
            unitPrice: 1000,
            discount: 0,
            imageUrl: "https://example.com/image1.jpg",
          },
        ],
        shippingCost: null,
      });

    orderId = createRes.body.id;
    customerEmail = createRes.body.customerEmail;
    customerName = createRes.body.customerName;
    customerPhone = createRes.body.customerPhone;
    productId = createRes.body.products[0].productId;

    expect(createRes.status).toBe(201);
    expect(createRes.statusCode).toBe(201);
    expect(createRes.body).toHaveProperty("id");
    existsTheOrder = true;

    //2. Obtener orden creado por Id
    const getResById = await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getResById.status).toBe(200);
    expect(getResById.body.id).toBe(orderId);

    //3. Obtener todas las ordenes
    const getAll = await request(app)
      .get(`/api/orders`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getAll.status).toBe(200);
    expect(getAll.body.length).toBeGreaterThan(0);
    expect(getAll.body).toBeInstanceOf(Array);
    expect(getAll.body[0]).toHaveProperty("id");

    //4.Obtener orden por email del cliente
    const getByEmail = await request(app)
      .get(`/api/orders/customerEmail/${customerEmail}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getByEmail.status).toBe(200);
    expect(getByEmail.body.length).toBeGreaterThan(0);
    expect(getByEmail.body).toBeInstanceOf(Array);
    expect(getByEmail.body[0]).toHaveProperty("id");
    expect(getByEmail.body[0].customerEmail).toBe(customerEmail);

    //5.Obtener orden por name del cliente
    const getByName = await request(app)
      .get(`/api/orders/customerName/${customerName}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getByName.status).toBe(200);
    expect(getByName.body.length).toBeGreaterThan(0);
    expect(getByName.body).toBeInstanceOf(Array);
    expect(getByName.body[0]).toHaveProperty("id");
    expect(getByName.body[0].customerName).toBe(customerName);

    //6.Obtener orden por phone del cliente
    const getByPhone = await request(app)
      .get(`/api/orders/customerPhone/${customerPhone}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getByPhone.status).toBe(200);
    expect(getByPhone.body.length).toBeGreaterThan(0);
    expect(getByPhone.body).toBeInstanceOf(Array);
    expect(getByPhone.body[0]).toHaveProperty("id");
    expect(getByPhone.body[0].customerPhone).toBe(customerPhone);

    //7.Obtener orden por productId
    const getByProductId = await request(app)
      .get(`/api/orders/productId/${productId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getByProductId.status).toBe(200);
    expect(getByProductId.body.length).toBeGreaterThan(0);
    expect(getByProductId.body).toBeInstanceOf(Array);
    expect(getByProductId.body[0]).toHaveProperty("id");
    expect(getByProductId.body[0].products[0].productId).toBe(productId);

    //8 Actualizar Orden - cambiar el telefono
    const nuevoTelefono: string = "1123456789";
    const updateRes = await request(app)
      .put(`/api/orders/${orderId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        customerPhone: nuevoTelefono, //actualizó el telefono
        customerEmail: "pablocuervo@gmail.com",
        customerName: "Pablo Hernandez",
        customerNotes: null,
        whatsappMessage: null,
        whatsappStatus: "pending",
        paymentMethod: "mercadopago",
        subtotal: 1000,
        total: 1000,
        isFreeShipping: false,
        products: [
          {
            productId: "1",
            productName: "Samsung A06",
            quantity: 1,
            size: null,
            unitPrice: 1000,
            discount: 0,
            imageUrl: "https://example.com/image1.jpg",
          },
        ],
        shippingCost: null,
      });
    expect(updateRes.status).toBe(200);
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty("id");
    expect(updateRes.body.customerPhone).toBe(nuevoTelefono);

    //9 Eliminar Orden
    const deleteRes = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(deleteRes.status).toBe(200);

    //10. Verificar que la orden fue eliminada
    const verifyRes = await request(app)
      .get(`/api/orders/${orderId}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(verifyRes.status).toBe(404);
    existsTheOrder = false;
  });
});
