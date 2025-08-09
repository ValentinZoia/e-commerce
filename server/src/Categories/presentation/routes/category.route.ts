import { PrismaAdminRepositoryImpl } from "../../../Auth/infrastructure/repositories";
import { PrismaCategoryRepositoryImpl } from "../../infrastructure/repositories";
import { CategoryController } from "../controllers";
import { categorySchema } from "../../domain/dtos";
import {
  AuthMiddleware,
  ValidationMiddleware,
} from "../../../shared/presentation/middlewares";
import {
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
  GetAllCategoriesService,
  GetCategoryByIdService,
  GetCategoryByNameService,
} from "../../application/services";

import { Router } from "express";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const adminRepository = new PrismaAdminRepositoryImpl();
    const categoryRepository = new PrismaCategoryRepositoryImpl();
    const createCategoryService = new CreateCategoryService(categoryRepository);
    const updateCategoryService = new UpdateCategoryService(categoryRepository);
    const deleteCategoryService = new DeleteCategoryService(categoryRepository);
    const getAllCategoriesService = new GetAllCategoriesService(
      categoryRepository
    );
    const getCategoryByIdService = new GetCategoryByIdService(
      categoryRepository
    );
    const getCategoryByNameService = new GetCategoryByNameService(
      categoryRepository
    );

    const controller = new CategoryController(
      createCategoryService,
      updateCategoryService,
      deleteCategoryService,
      getAllCategoriesService,
      getCategoryByIdService,
      getCategoryByNameService
    );

    const authMiddleware = new AuthMiddleware(adminRepository);

    //Solo deben acceder admins, por esp el middleware
    // authMiddleware.authenticate
    router.post(
      "/",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(categorySchema),
      controller.createCategory
    );
    router.put(
      "/:id",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(categorySchema),
      controller.updateCategory
    );
    router.delete(
      "/:id",
      authMiddleware.authenticate,
      controller.deleteCategory
    );

    router.get("/", controller.getAllCategories);
    router.get("/:id", controller.getCategoryById);
    router.get("/name/:name", controller.getCategoryByName);

    return router;
  }
}
