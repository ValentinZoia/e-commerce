import{
    CreateOrderService,
    UpdateOrderService,
    DeleteOrderService,
    GetAllOrdersService,
    GetOrderByIdService,
    GetOrdersByCustomerEmailService,
    GetOrdersByCustomerNameService,
    GetOrdersByCustomerPhoneService,
    GetOrdersByProductIdService
    
} from '../../application/services'
import { PrismaOrderRepositoryImpl } from "../../infrastructure/repositories/PrismaOrder.repository.impl";
import { ValidationMiddleware } from "../../../shared/presentation/middlewares";
import {CreateOrderDtoSchema} from "../../domain/dtos/OrderDataDto.dto";
import { OrderController } from "../controllers/Order.controller";
import { Router } from 'express';
import { OrderSendMessageToCustomer } from '../../infrastructure/adapters/OrderSendMessageToCustomer';


export class OrderRoutes{
    static get routes():Router{
        const router = Router();
        const orderRepository = new PrismaOrderRepositoryImpl();
        const orderSendMessageToCustomer = new OrderSendMessageToCustomer();
        const createOrderService = new CreateOrderService(orderRepository, orderSendMessageToCustomer);
        const updateOrderService = new UpdateOrderService(orderRepository);
        const deleteOrderService = new DeleteOrderService(orderRepository);
        const getAllOrdersService = new GetAllOrdersService(orderRepository);
        const getOrderByIdService = new GetOrderByIdService(orderRepository);
        const getOrdersByCustomerEmailService = new GetOrdersByCustomerEmailService(orderRepository);
        const getOrdersByCustomerNameService = new GetOrdersByCustomerNameService(orderRepository);
        const getOrdersByCustomerPhoneService = new GetOrdersByCustomerPhoneService(orderRepository);
        const getOrdersByProductIdService = new GetOrdersByProductIdService(orderRepository);
        const controller = new OrderController(
            createOrderService,
            updateOrderService,
            deleteOrderService,
            getAllOrdersService,
            getOrderByIdService,
            getOrdersByCustomerEmailService,
            getOrdersByCustomerNameService,
            getOrdersByCustomerPhoneService,
            getOrdersByProductIdService,
        );


        //POSTS
        router.post('/', ValidationMiddleware.validateBody(CreateOrderDtoSchema), controller.createOrder);
        
        //GETS - con autenticacion - authMiddleware.authenticate
        router.get('/', controller.getAllOrders);
        router.get('/:id', controller.getOrderById);
        router.get('/customerEmail/:customerEmail', controller.getOrdersByCustomerEmail);
        router.get('/customerName/:customerName', controller.getOrdersByCustomerName);
        router.get('/customerPhone/:customerPhone', controller.getOrdersByCustomerPhone);
        router.get('/productId/:productId', controller.getOrdersByProductId);
        
        //PUT - con autenticacion - authMiddleware.authenticate
        router.put('/:id', ValidationMiddleware.validateBody(CreateOrderDtoSchema), controller.updateOrder);

        //DELETE - con autenticacion - authMiddleware.authenticate
        router.delete('/:id', controller.deleteOrder);
        return router;
    }
}