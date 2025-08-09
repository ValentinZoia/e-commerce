import { OrderController } from "../../../../../src/Orders/presentation/controllers/Order.controller";

export const mockOrderController: jest.Mocked<OrderController> = {
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
  deleteOrder: jest.fn(),
  getAllOrders: jest.fn(),
  getOrderById: jest.fn(),
  getOrdersByCustomerEmail: jest.fn(),
  getOrdersByCustomerName: jest.fn(),
  getOrdersByCustomerPhone: jest.fn(),
  getOrdersByProductId: jest.fn(),
} as unknown as jest.Mocked<OrderController>;
