import {
    CreateOrderService,
    UpdateOrderService,
    DeleteOrderService,
    GetAllOrdersService,
    GetOrderByIdService,
    GetOrdersByCustomerEmailService,
    GetOrdersByCustomerNameService,
    GetOrdersByCustomerPhoneService,
    GetOrdersByProductIdService
} from '../../application/services';
import { Request, Response, NextFunction } from "express";
import { CreateOrderDTO } from '../../domain/dtos/OrderDataDto.dto';


export class OrderController {
    constructor(
        private readonly createOrderService: CreateOrderService,
        private readonly updateOrderService: UpdateOrderService,
        private readonly deleteOrderService: DeleteOrderService,
        private readonly getAllOrdersService: GetAllOrdersService,
        private readonly getOrderByIdService: GetOrderByIdService,
        private readonly getOrdersByCustomerEmailService: GetOrdersByCustomerEmailService,
        private readonly getOrdersByCustomerNameService: GetOrdersByCustomerNameService,
        private readonly getOrdersByCustomerPhoneService: GetOrdersByCustomerPhoneService,
        private readonly getOrdersByProductIdService: GetOrdersByProductIdService,
    ){}

    createOrder = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const createdOrderDto = CreateOrderDTO.create(req.body);
            const order = await this.createOrderService.execute(createdOrderDto);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    };
    updateOrder = async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            const { id } = req.params;
            const updatedOrderDto = CreateOrderDTO.create(req.body);
            const order = await this.updateOrderService.execute(id, updatedOrderDto);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };
    deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.deleteOrderService.execute(id);
            res.status(200).json({ message: "Order deleted successfully" });
        } catch (error) {
            next(error);
        }
    };
    getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const orders = await this.getAllOrdersService.execute();
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };
    getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const order = await this.getOrderByIdService.execute(id);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };
    getOrdersByCustomerEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { customerEmail } = req.params;
            const orders = await this.getOrdersByCustomerEmailService.execute(customerEmail);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };
    getOrdersByCustomerName = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { customerName } = req.params;
            const orders = await this.getOrdersByCustomerNameService.execute(customerName);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };
    getOrdersByCustomerPhone = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { customerPhone } = req.params;
            const orders = await this.getOrdersByCustomerPhoneService.execute(customerPhone);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };
    getOrdersByProductId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const orders = await this.getOrdersByProductIdService.execute(productId);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };
}