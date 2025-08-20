import { PrismaAdminRepositoryImpl } from "../../infrastructure/repositories";
import { createAdminSchema, loginAdminSchema } from "../../domain/dtos";
import { BcryptAdapter } from "../../../shared/infrastructure/adapters";
import {
  AuthMiddleware,
  ValidationMiddleware,
} from "../../../shared/presentation/middlewares";
import { AdminController } from "../controllers";
import {
  CreateAdminService,
  LogInAdminService,
  DeleteAdminService,
} from "../../application/services";

import { Router } from "express";

export class AuthAdminRoutes {
  static get routes(): Router {
    const router = Router();
    const adminRepository = new PrismaAdminRepositoryImpl();
    const createAdminService = new CreateAdminService(
      adminRepository,
      BcryptAdapter.hash
    );
    const logInAdminService = new LogInAdminService(
      adminRepository,
      BcryptAdapter.compare
    );

    const deleteAdminService = new DeleteAdminService(adminRepository);

    const authMiddleware = new AuthMiddleware(adminRepository);
    const controller = new AdminController(
      createAdminService,
      logInAdminService,
      deleteAdminService
    );

    router.post(
      "/login",
      ValidationMiddleware.validateBody(loginAdminSchema),
      controller.login.bind(controller)
    );

    // a estas rutas solo deberan acceder admins. por eso el uso del middleware para verificar su session.
    router.post(
      "/logout",
      authMiddleware.authenticate,
      controller.logout.bind(controller)
    );
    router.post(
      "/",
      authMiddleware.authenticate, //comentar esta linea para los test
      ValidationMiddleware.validateBody(createAdminSchema),
      controller.createAdmin.bind(controller)
    );

    router.delete(
      "/:username",
      authMiddleware.authenticate,
      controller.deleteAdmin.bind(controller)
    );

    router.get("/", authMiddleware.authenticate, (req, res) => {
      res.json({ user: req.admin });
    });

    return router;
  }
}
