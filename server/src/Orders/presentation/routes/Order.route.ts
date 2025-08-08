import {
  CreateOrderService,
  UpdateOrderService,
  DeleteOrderService,
  GetAllOrdersService,
  GetOrderByIdService,
  GetOrdersByCustomerEmailService,
  GetOrdersByCustomerNameService,
  GetOrdersByCustomerPhoneService,
  GetOrdersByProductIdService,
} from "../../application/services";
import { PrismaOrderRepositoryImpl } from "../../infrastructure/repositories/PrismaOrder.repository.impl";
import {
  AuthMiddleware,
  ValidationMiddleware,
} from "../../../shared/presentation/middlewares";
import { CreateOrderDtoSchema } from "../../domain/dtos/OrderDataDto.dto";
import { OrderController } from "../controllers/Order.controller";
import { Router } from "express";
import { OrderSendMessageToCustomer } from "../../infrastructure/adapters/OrderSendMessageToCustomer.impl";
import { PrismaAdminRepositoryImpl } from "../../../Auth/infrastructure/repositories";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();
    const adminRepository = new PrismaAdminRepositoryImpl();
    const orderRepository = new PrismaOrderRepositoryImpl();
    const orderSendMessageToCustomer = new OrderSendMessageToCustomer();
    const createOrderService = new CreateOrderService(
      orderRepository,
      orderSendMessageToCustomer
    );
    const updateOrderService = new UpdateOrderService(orderRepository);
    const deleteOrderService = new DeleteOrderService(orderRepository);
    const getAllOrdersService = new GetAllOrdersService(orderRepository);
    const getOrderByIdService = new GetOrderByIdService(orderRepository);
    const getOrdersByCustomerEmailService = new GetOrdersByCustomerEmailService(
      orderRepository
    );
    const getOrdersByCustomerNameService = new GetOrdersByCustomerNameService(
      orderRepository
    );
    const getOrdersByCustomerPhoneService = new GetOrdersByCustomerPhoneService(
      orderRepository
    );
    const getOrdersByProductIdService = new GetOrdersByProductIdService(
      orderRepository
    );
    const controller = new OrderController(
      createOrderService,
      updateOrderService,
      deleteOrderService,
      getAllOrdersService,
      getOrderByIdService,
      getOrdersByCustomerEmailService,
      getOrdersByCustomerNameService,
      getOrdersByCustomerPhoneService,
      getOrdersByProductIdService
    );
    const authMiddleware = new AuthMiddleware(adminRepository);

    //POSTS
    router.post(
      "/",
      ValidationMiddleware.validateBody(CreateOrderDtoSchema),
      controller.createOrder
    );

    //GETS - con autenticacion - authMiddleware.authenticate
    router.get("/", authMiddleware.authenticate, controller.getAllOrders);
    router.get("/:id", authMiddleware.authenticate, controller.getOrderById);
    router.get(
      "/customerEmail/:customerEmail",
      authMiddleware.authenticate,
      controller.getOrdersByCustomerEmail
    );
    router.get(
      "/customerName/:customerName",
      authMiddleware.authenticate,
      controller.getOrdersByCustomerName
    );
    router.get(
      "/customerPhone/:customerPhone",
      authMiddleware.authenticate,
      controller.getOrdersByCustomerPhone
    );
    router.get(
      "/productId/:productId",
      authMiddleware.authenticate,
      controller.getOrdersByProductId
    );

    //PUT - con autenticacion - authMiddleware.authenticate
    router.put(
      "/:id",
      authMiddleware.authenticate,
      ValidationMiddleware.validateBody(CreateOrderDtoSchema),
      controller.updateOrder
    );

    //DELETE - con autenticacion - authMiddleware.authenticate
    router.delete("/:id", authMiddleware.authenticate, controller.deleteOrder);
    return router;
  }
}
