import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";
import {
  mockValidCreateUserRequest,
  mockValidLoginRequest,
} from "../../../helpers/factories/admin-mocks";

import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";

const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();
describe("admin Balck Box Tests", () => {
  let app: Express;
  let adminUsername: string;
  let authToken: string;
  let existsTheAdmin: boolean = false;
  beforeAll(async () => {
    app = createServer();
    existsTheAdmin = false;
  });
  afterAll(async () => {
    await request(app)
      .delete("/api/admin/logout")
      .set("Cookie", [`access_token=${authToken}`]);
    if (existsTheAdmin) {
      await adminRepository.deleteByUsername(adminUsername);
    }
    await prisma.$disconnect();
    existsTheAdmin = false;
  });

  describe("POST /api/admin - createAdmin", () => {
    describe("Success", () => {
      test("should create admin successfully", async () => {
        const response = await request(app)
          .post("/api/admin")
          .send(mockValidCreateUserRequest);
        expect(response.status).toBe(201);
        adminUsername = response.body.username;
        existsTheAdmin = true;
      });
    });
    describe("Failure", () => {
      test("should return 400 for invalid admin data", async () => {
        const response = await request(app).post("/api/admin").send({
          username: "",
          password: "",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
      });
    });
  });
  describe("POST /api/admin/login - login", () => {
    describe("Success", () => {
      test("should login successfully", async () => {
        const response = await request(app)
          .post("/api/admin/login")
          .send(mockValidLoginRequest);
        expect(response.status).toBe(200);
        authToken = response.header["set-cookie"][0]
          .split("access_token=")[1]
          .split(";")[0];
      });
    });
    describe("Failure", () => {
      test("should return 400 for invalid login data", async () => {
        const response = await request(app).post("/api/admin/login").send({
          username: "",
          password: "",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
      });
      test("should return 400 if dont exists admin account", async () => {
        const response = await request(app).post("/api/admin/login").send({
          username: "invalid-username",
          password: "invalid-password",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
      });
    });
  });
  describe("GET /api/admin", () => {
    describe("Success", () => {
      test("should get session successfully", async () => {
        const response = await request(app)
          .get("/api/admin")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);

        expect(response.body).toHaveProperty("user");
      });
    });
    describe("Failure", () => {
      test("should return 401 when not authenticated", async () => {
        const response = await request(app).get("/api/admin");
        expect(response.status).toBe(401);
      });
    });
  });

  describe("POST /api/admin/logout - logout", () => {
    describe("Success", () => {
      test("should logout successfully", async () => {
        const response = await request(app)
          .post("/api/admin/logout")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
      });
    });
    describe("Failure", () => {
      test("should return 401 when not authenticated", async () => {
        const response = await request(app).post("/api/admin/logout");
        expect(response.status).toBe(401);
      });
    });
  });

  describe("DELETE /api/admin/:username", () => {
    //tengo que logearme nuevamente porque hice un logout anteriormente
    beforeAll(async () => {
      const response = await request(app)
        .post("/api/admin/login")
        .send(mockValidLoginRequest);
      expect(response.status).toBe(200);
      authToken = response.header["set-cookie"][0]
        .split("access_token=")[1]
        .split(";")[0];
    });

    //Importante poner el Failure antes del Success
    describe("Failure", () => {
      test("should return 404 for non-existent admin", async () => {
        const response = await request(app)
          .delete("/api/admin/non-existent-username")
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);
        expect(response.status).toBe(404);
      });

      test("should return 401 when not authenticated", async () => {
        const response = await request(app).delete(
          `/api/admin/${adminUsername}`
        );
        expect(response.status).toBe(401);
      });
    });
    describe("Success", () => {
      test("should delete admin successfully", async () => {
        const response = await request(app)
          .delete(`/api/admin/${adminUsername}`)
          .set("Cookie", [`access_token=${authToken}`])
          .set("Authorization", `Bearer ${authToken}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");

        //verificar que el admin fue eliminado - hacer login
        const loginRes = await request(app)
          .post("/api/admin/login")
          .send(mockValidLoginRequest);
        expect(loginRes.status).toBe(400);
        expect(loginRes.body).toHaveProperty("message");
        existsTheAdmin = false;
      });
    });
  });
});
