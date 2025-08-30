import { CustomError } from "../../../shared/domain/errors";
import { Request, Response, NextFunction } from "express";
import { CreateOrderDTO } from "../../domain/dtos";
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
import { WhatsAppStatusNames } from "../../domain/entities";
import { SortDir } from "../../../Products/domain/interfaces";

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
    private readonly getOrdersByProductIdService: GetOrdersByProductIdService
  ) {}

  createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createdOrderDto = CreateOrderDTO.create(req.body);
      const order = await this.createOrderService.execute(createdOrderDto);
      console.log("HOOLA", order);
      res.status(201).json({
        success: true,
        message: "Orden Creada Exitosamente",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };
  updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest(
          "id es requerido para actualizar la order"
        );
      }
      const updatedOrderDto = CreateOrderDTO.create(req.body);
      const order = await this.updateOrderService.execute(id, updatedOrderDto);
      res.status(200).json({
        success: true,
        message: "Orden Actualizada Exitosamente",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };
  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("id es requerido para eliminar la order");
      }
      await this.deleteOrderService.execute(id);
      res.status(200).json({
        success: true,
        message: "Orden Eliminada Exitosamente",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  };
  getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        customerEmail,
        customerName,
        customerPhone,
        productId,
        status,
        take,
        skip,
        sortBy,
        sortDir,
      } = req.query;

      const limit = take ? parseInt(take as string) : 10;
      const offset = skip ? parseInt(skip as string) : 0;
      const currentPage = Math.floor(offset / limit) + 1;

      const result = await this.getAllOrdersService.execute({
        customerEmail: customerEmail as string,
        customerName: customerName as string,
        customerPhone: customerPhone as string,
        productId: productId as string,
        status: status as WhatsAppStatusNames,
        take: limit,
        skip: offset,
        sortBy: sortBy ? (sortBy as string) : undefined,
        sortDir: sortDir ? (sortDir as SortDir) : undefined,
      });

      // Calcular información de paginación
      const totalPages = Math.ceil(result.total / limit);
      const hasNextPage = currentPage < totalPages;
      const hasPreviousPage = currentPage > 1;

      res.status(200).json({
        data: result.items,
        total: result.total, // Total real de la base de datos
        page: currentPage, // Página actual
        limit: limit, // Límite usado
        totalPages, // Total de páginas
        hasNextPage, // Si hay página siguiente
        hasPreviousPage, // Si hay página anterior
      });
    } catch (error) {
      next(error);
    }
  };
  getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("id es requerido para obtener la order");
      }
      const order = await this.getOrderByIdService.execute(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };
  getOrdersByCustomerEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { customerEmail } = req.params;
      if (!customerEmail) {
        throw CustomError.badRequest(
          "customerEmail es requerido para obtener orders"
        );
      }
      const orders = await this.getOrdersByCustomerEmailService.execute(
        customerEmail
      );
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };
  getOrdersByCustomerName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { customerName } = req.params;
      if (!customerName) {
        throw CustomError.badRequest(
          "customerName es requerido para obtener orders"
        );
      }
      const orders = await this.getOrdersByCustomerNameService.execute(
        customerName
      );
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };
  getOrdersByCustomerPhone = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { customerPhone } = req.params;
      if (!customerPhone) {
        throw CustomError.badRequest(
          "customerPhone es requerido para obtener orders"
        );
      }
      const orders = await this.getOrdersByCustomerPhoneService.execute(
        customerPhone
      );
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };
  getOrdersByProductId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { productId } = req.params;
      if (!productId) {
        throw CustomError.badRequest(
          "productId es requerido para obtener orders"
        );
      }
      const orders = await this.getOrdersByProductIdService.execute(productId);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };
}
