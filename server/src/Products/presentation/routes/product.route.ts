import { PrismaCategoryRepositoryImpl } from "../../../Categories/infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../Auth/infrastructure/repositories";
import { PrismaProductRepositoryImpl } from "../../infrastructure/repositories";
import {
  ValidationMiddleware,
  AuthMiddleware,
} from "../../../shared/presentation/middlewares";
import { ProductController } from "../controllers";
import { productSchema } from "../../domain/dtos";
import {
  CreateProductService,
  UpdateProductService,
  DeleteProductService,
  GetAllProductsService,
  GetProductByIdService,
  GetProductByNameService,
} from "../../application/services";

import { Router } from "express";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const productRepository = new PrismaProductRepositoryImpl();
    const categoryRepository = new PrismaCategoryRepositoryImpl();
    const adminRepository = new PrismaAdminRepositoryImpl();
    const createProductService = new CreateProductService(
      productRepository,
      categoryRepository
    );
    const updateProductService = new UpdateProductService(
      productRepository,
      categoryRepository
    );
    const deleteProductService = new DeleteProductService(productRepository);
    const getAllProductsService = new GetAllProductsService(productRepository);
    const getProductByIdService = new GetProductByIdService(productRepository);
    const getProductByNameService = new GetProductByNameService(
      productRepository
    );
    const controller = new ProductController(
      createProductService,
      updateProductService,
      deleteProductService,
      getAllProductsService,
      getProductByIdService,
      getProductByNameService
    );
    const authMiddleware = new AuthMiddleware(adminRepository);

    //a estas rutas solo deberan acceder los admins, por eso se verifica con el middleware su session.
    router.post(
      "/",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(productSchema),
      controller.createProduct
    );
    router.put(
      "/:id",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(productSchema),
      controller.updateProduct
    );
    router.delete(
      "/:id",
      authMiddleware.authenticate,
      controller.deleteProduct
    );

    router.get("/", controller.getAllProducts);
    router.get("/:id", controller.getProductById);
    router.get("/name/:name", controller.getProductByName);

    return router;
  }
}
