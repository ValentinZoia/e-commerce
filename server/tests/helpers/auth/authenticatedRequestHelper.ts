import request from "supertest";
import { Express } from "express";
import { mockAdminRepository } from "../../Context/Auth/__mocks__/repositories/MockAdminRepository";
import { mockJwtValidation } from "./authTestHelper";
import { Admin } from "../../../src/Auth/domain/entities";
import { defaultValidUser, mockValidToken } from "../factories/defaultValues";
import { JwtAdminPayload } from "../../../src/shared/presentation/middlewares";

export interface AuthenticatedRequestOptions {
  app: Express;
  user?: Admin;
  token?: string;
}

export class AuthenticatedRequestHelper {
  private static defaulUser: Admin = defaultValidUser;
  private static defualtToken: string = mockValidToken;

  static setupAuthentication(
    options: Partial<AuthenticatedRequestOptions> = {}
  ) {
    const user = options.user || this.defaulUser;
    const token = options.token || this.defualtToken;
    const payload: JwtAdminPayload = {
      id: user.id as string,
      username: user.username,
    };
    //configurar mock del jwt

    mockJwtValidation(payload, token, false);
    const mockAdmin: Admin = {
      id: user.id as string,
      username: user.username,
      password: user.password,
    };

    //configurar mock del repositorio
    mockAdminRepository.findAdminByUsername.mockImplementation(
      async () => mockAdmin
    );

    return { user, token };
  }

  static authenticatedPost(
    app: Express,
    url: string,
    options: Partial<AuthenticatedRequestOptions> = {}
  ) {
    const { token } = this.setupAuthentication(options);

    return request(app)
      .post(url)
      .set("Cookie", [`access_token=${token}`]);
  }

  /**
   * Crea un request GET autenticado
   */
  static authenticatedGet(
    app: Express,
    url: string,
    options: Partial<AuthenticatedRequestOptions> = {}
  ) {
    const { token } = this.setupAuthentication(options);

    return request(app)
      .get(url)
      .set("Cookie", [`access_token=${token}`]);
  }

  /**
   * Crea un request PUT autenticado
   */
  static authenticatedPut(
    app: Express,
    url: string,
    options: Partial<AuthenticatedRequestOptions> = {}
  ) {
    const { token } = this.setupAuthentication(options);

    return request(app)
      .put(url)
      .set("Cookie", [`access_token=${token}`]);
  }

  /**
   * Crea un request DELETE autenticado
   */
  static authenticatedDelete(
    app: Express,
    url: string,
    options: Partial<AuthenticatedRequestOptions> = {}
  ) {
    const { token } = this.setupAuthentication(options);

    return request(app)
      .delete(url)
      .set("Cookie", [`access_token=${token}`]);
  }

  /**
   * Crea un request sin autenticación (para probar casos no autenticados)
   */
  static unauthenticatedRequest(app: Express) {
    return {
      post: (url: string) => request(app).post(url),
      get: (url: string) => request(app).get(url),
      put: (url: string) => request(app).put(url),
      delete: (url: string) => request(app).delete(url),
    };
  }

  /**
   * Limpia todos los mocks relacionados con autenticación
   */
  static cleanup() {
    jest.clearAllMocks();
    mockAdminRepository.findAdminByUsername.mockReset();
  }
}
