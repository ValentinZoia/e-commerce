import request from "supertest";
import { Express } from "express";
import { createServer } from "../../../../src/server";
import { PrismaClient } from "../../../../src/generated/prisma";

import { PrismaAdminRepositoryImpl } from "../../../../src/Auth/infrastructure/repositories";

const adminRepository = new PrismaAdminRepositoryImpl();
const prisma = new PrismaClient();
describe("Admin E2E Flow", () => {
  let app: Express;
  let authToken: string;
  let adminUsername: string;
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

  test("should complete full admin lifecycle", async () => {
    //1 Crear Admin
    const createRes = await request(app).post("/api/admin").send({
      username: "pepeargento",
      password: "Racing123",
    });
    expect(createRes.status).toBe(201);
    expect(createRes.body).toHaveProperty("username");
    expect(createRes.body).toHaveProperty("id");
    adminUsername = createRes.body.username;
    existsTheAdmin = true;

    //2. Logear admin
    const loginRes = await request(app).post("/api/admin/login").send({
      username: "pepeargento",
      password: "Racing123",
    });
    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toStrictEqual({
      success: true,
      message: "Login exitoso",
    });
    authToken = loginRes.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];
    //3 Solicitar session - validar token
    const getSessionRes = await request(app)
      .get("/api/admin")
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);

    expect(getSessionRes.body).toHaveProperty("user");
    //4 Cerrar sesion
    const logoutRes = await request(app)
      .post("/api/admin/logout")
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);
    expect(logoutRes.status).toBe(200);
    expect(logoutRes.body).toStrictEqual({
      success: true,
      message: "Logout exitoso",
    });
    //5 Eliminar admin
    //primero debo logearme asi podre estar autenticado para eliminar un admin
    const loginRes2 = await request(app).post("/api/admin/login").send({
      username: "pepeargento",
      password: "Racing123",
    });
    expect(loginRes2.status).toBe(200);
    expect(loginRes2.body).toStrictEqual({
      success: true,
      message: "Login exitoso",
    });
    authToken = loginRes2.header["set-cookie"][0]
      .split("access_token=")[1]
      .split(";")[0];

    //Ahora si a eliminar
    const deleteRes = await request(app)
      .delete(`/api/admin/${adminUsername}`)
      .set("Cookie", [`access_token=${authToken}`])
      .set("Authorization", `Bearer ${authToken}`);
    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toStrictEqual({
      success: true,
      message: "Admin deleted successfully",
    });

    //verificar que el admin fue eliminado - hacer login
    const loginRes3 = await request(app).post("/api/admin/login").send({
      username: "pepeargento",
      password: "Racing123",
    });
    expect(loginRes3.status).toBe(400);
    expect(loginRes3.body).toHaveProperty("message");
    existsTheAdmin = false;
  });
});
