import { Router } from "express";
import { PrismaAdminRepositoryImpl } from "../../../Auth/infrastructure/repositories";
import { AuthMiddleware } from "../../../shared/presentation/middlewares";
import { AIController } from "../controllers";
export class AIRoutes {
  static get routes(): Router {
    const router = Router();
    const adminRepository = new PrismaAdminRepositoryImpl();
    const authMiddleware = new AuthMiddleware(adminRepository);
    const controller = new AIController();
    //Crear session
    router.post(
      "/",
      authMiddleware.authenticate,
      controller.generate.bind(controller)
    );

    return router;
  }
}
