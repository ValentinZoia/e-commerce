import { Router } from "express";
import { PrismaStoreCustomerRepositoryImpl } from "../../infrastructure/repositories";
import { PrismaAdminRepositoryImpl } from "../../../Auth/infrastructure/repositories";
import {
  CreateStoreCustomerService,
  UpdateStoreCustomerService,
  DeleteStoreCustomerService,
  GetAllStoreCustomerService,
  GetStoreCustomerByIdService,
} from "../../application/services";
import { StoreCustomerController } from "../controllers";
import {
  AuthMiddleware,
  ValidationMiddleware,
} from "../../../shared/presentation/middlewares";
import { storeCustomerSchema } from "../../domain/dtos";

export class StoreCustomerRoutes {
  static get routes(): Router {
    const router = Router();
    const adminRepository = new PrismaAdminRepositoryImpl();
    const storeCustomerRepository = new PrismaStoreCustomerRepositoryImpl();

    const createStoreCustomerService = new CreateStoreCustomerService(
      storeCustomerRepository
    );
    const updateStoreCustomerService = new UpdateStoreCustomerService(
      storeCustomerRepository
    );
    const deleteStoreCustomerService = new DeleteStoreCustomerService(
      storeCustomerRepository
    );
    const getAllStoreCustomerService = new GetAllStoreCustomerService(
      storeCustomerRepository
    );
    const getStoreCustomerByIdService = new GetStoreCustomerByIdService(
      storeCustomerRepository
    );

    const controller = new StoreCustomerController(
      createStoreCustomerService,
      updateStoreCustomerService,
      deleteStoreCustomerService,
      getAllStoreCustomerService,
      getStoreCustomerByIdService
    );
    const authMiddleware = new AuthMiddleware(adminRepository);

    //POSTS
    router.post(
      "/",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(storeCustomerSchema),
      controller.createStoreCustomer
    );

    //GETS
    router.get("/", controller.getAllStoreCustomer);
    router.get(
      "/:id",

      controller.getStoreCustomerById
    );

    //PUT - con autenticacion - authMiddleware.authenticate
    router.put(
      "/:id",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(storeCustomerSchema),
      controller.updateStoreCustomer
    );

    //DELETE - con autenticacion - authMiddleware.authenticate
    router.delete(
      "/:id",
      authMiddleware.authenticate,
      controller.deleteStoreCustomer
    );
    return router;
  }
}
