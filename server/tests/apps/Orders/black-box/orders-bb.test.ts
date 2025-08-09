import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import { mockValidOrderDataRequest } from "../../../helpers/factories/order-mocks";
import { PrismaOrderRepositoryImpl } from "../../../../src/Orders/infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";
const orderRepository = new PrismaOrderRepositoryImpl();
const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();

describe("order Balck Box Tests", () => {
  let app: Express;
  let authToken: string;
  let orderId: string;
  let customerEmail: string;
  let customerName: string;
  let customerPhone: string;
  let productId: string;
  let orderWasCreated = false;
  let existsTheAdmin: boolean = false;
  beforeAll(async () => {
    app = createServer();
    orderWasCreated = false;
    existsTheAdmin = false;
    // Setup inicial de prueba
    // Crear y autenticar usuario de prueba
    const createAdminRes = await request(app)
      .post("/api/admin")
      .send({ username: "bborderadmintest", password: "Password1" });

    if (createAdminRes.status === 201) {
      existsTheAdmin = true;
    }

    const loginRes = await request(app)
      .post("/api/admin/login")
      .send({ username: "bborderadmintest", password: "Password1" });

    authToken = loginRes.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];
  });
  afterAll(async () => {
    // Limpieza
    await request(app)
      .delete("/api/admin/logout")
      .set("Cookie", [`access_token=${authToken}`]);

    if (orderWasCreated) await orderRepository.delete(orderId);

    if (existsTheAdmin) {
      await adminRepository.deleteByUsername("bborderadmintest");
    }
    await prisma.$disconnect();
    orderWasCreated = false;
    existsTheAdmin = false;
  });
  describe("POST /api/orders - no auth", () => {
    describe("Success", () => {
      test("should create a order with valid data (201) - i dont need to be authenticated", async () => {
        const response = await request(app)
          .post("/api/orders")

          .send({
            ...mockValidOrderDataRequest,
          });

        orderId = response.body.id;
        customerName = response.body.customerName;
        customerEmail = response.body.customerEmail;
        customerPhone = response.body.customerPhone;
        productId = response.body.products[0].productId;
        if (response.status === 201) orderWasCreated = true;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.customerName).toBe("mario");
      });
    });

    describe("Failure", () => {
      test("should return 400 for invalid order data (empty customerName)", async () => {
        const response = await request(app)
          .post("/api/orders")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`)
          .send({
            ...mockValidOrderDataRequest,
            customerName: "", // Nombre inválido
            products: [],
          });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
      });
    });
  });
  describe("GET /api/orders/:id - auth", () => {
    describe("Success", () => {
      test("should get order by id (200) - i need to be authenticated", async () => {
        const response = await request(app)
          .get(`/api/orders/${orderId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(orderId);
      });
    });

    describe("Failure", () => {
      test("should return 404 for non-existent order", async () => {
        const nonExistentId = "non-existent-id";
        const response = await request(app)
          .get(`/api/orders/${nonExistentId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(404);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get(`/api/orders/${orderId}`);

        expect(response.status).toBe(401);
      });
    });
  });
  describe("GET /api/orders - auth", () => {
    let newOrderId: string;
    let orderWasCreated = false;
    beforeEach(async () => {
      // Crear una orden mas para esta prueba en especifico
      const newOrderRes = await request(app)
        .post("/api/orders")

        .send({
          ...mockValidOrderDataRequest,
          customerName: "carlitos",
          customerEmail: "carlitos@gmail.com",
          customerPhone: "1132445667",
        });

      if (newOrderRes.ok) orderWasCreated = true;
      newOrderId = newOrderRes.body.id as string;
    });

    afterEach(async () => {
      if (orderWasCreated && newOrderId !== undefined) {
        await orderRepository.delete(newOrderId);
      }
    });

    describe("Success", () => {
      test("should get all orders (200)", async () => {
        const response = await request(app)
          .get("/api/orders")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
      });
    });
    describe("Failure", () => {
      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get(`/api/orders`);

        expect(response.status).toBe(401);
      });
    });
  });
  describe("GET /api/orders/customerEmail/:customerEmail - auth", () => {
    describe("Success", () => {
      test("should get order by customerEmail (200) - i need to be authenticated", async () => {
        const response = await request(app)
          .get(`/api/orders/customerEmail/${customerEmail}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].customerEmail).toBe(customerEmail);
      });
    });
    describe("Failure", () => {
      test("should return with empty array for non-existent order", async () => {
        const nonExistentEmail = "nonexistent@example.com";
        const response = await request(app)
          .get(`/api/orders/customerEmail/${nonExistentEmail}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get(
          `/api/orders/customerEmail/${customerEmail}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
  describe("GET /api/orders/customerName/:customerName - auth", () => {
    describe("Success", () => {
      test("should get order by customerName (200) - i need to be authenticated", async () => {
        const response = await request(app)
          .get(`/api/orders/customerName/${customerName}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].customerName).toBe(customerName);
      });
    });
    describe("Failure", () => {
      test("should return with empty array for non-existent order", async () => {
        const nonExistentName = "nonexistent-customer";
        const response = await request(app)
          .get(`/api/orders/customerName/${nonExistentName}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get(
          `/api/orders/customerName/${customerName}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
  describe("GET /api/orders/customerPhone/:customerPhone - auth", () => {
    describe("Success", () => {
      test("should get order by customerPhone (200) - i need to be authenticated", async () => {
        const response = await request(app)
          .get(`/api/orders/customerPhone/${customerPhone}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].customerPhone).toBe(customerPhone);
      });
    });
    describe("Failure", () => {
      test("should return empty array for non-existent order", async () => {
        const nonExistentPhone = "9999999999";
        const response = await request(app)
          .get(`/api/orders/customerPhone/${nonExistentPhone}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get(
          `/api/orders/customerPhone/${customerPhone}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
  describe("GET /api/orders/productId/:productId - auth", () => {
    describe("Success", () => {
      test("should get order by productId (200) - i need to be authenticated", async () => {
        const response = await request(app)
          .get(`/api/orders/productId/${productId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body[0].products).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              productId: productId,
            }),
          ])
        );
      });
    });
    describe("Failure", () => {
      test("should return empty array for non-existent order", async () => {
        const nonExistentProductId = "nonexistent-product-id";
        const response = await request(app)
          .get(`/api/orders/productId/${nonExistentProductId}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get(
          `/api/orders/productId/${productId}`
        );

        expect(response.status).toBe(401);
      });
    });
  });
});
