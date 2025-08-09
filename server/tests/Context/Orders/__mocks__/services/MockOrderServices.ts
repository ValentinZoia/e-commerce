import {
  CreateOrderService,
  DeleteOrderService,
  UpdateOrderService,
  GetAllOrdersService,
  GetOrderByIdService,
  GetOrdersByCustomerEmailService,
  GetOrdersByCustomerNameService,
  GetOrdersByCustomerPhoneService,
  GetOrdersByProductIdService,
} from "../../../../../src/Orders/application/services";

export const mockCreateOrderService: jest.Mocked<CreateOrderService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<CreateOrderService>;

export const mockDeleteOrderService: jest.Mocked<DeleteOrderService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<DeleteOrderService>;

export const mockUpdateOrderService: jest.Mocked<UpdateOrderService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<UpdateOrderService>;

export const mockGetAllOrdersService: jest.Mocked<GetAllOrdersService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<GetAllOrdersService>;

export const mockGetOrderByIdService: jest.Mocked<GetOrderByIdService> = {
  execute: jest.fn(),
} as unknown as jest.Mocked<GetOrderByIdService>;

export const mockGetOrdersByCustomerEmailService: jest.Mocked<GetOrdersByCustomerEmailService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetOrdersByCustomerEmailService>;

export const mockGetOrdersByCustomerNameService: jest.Mocked<GetOrdersByCustomerNameService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetOrdersByCustomerNameService>;

export const mockGetOrdersByCustomerPhoneService: jest.Mocked<GetOrdersByCustomerPhoneService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetOrdersByCustomerPhoneService>;

export const mockGetOrdersByProductIdService: jest.Mocked<GetOrdersByProductIdService> =
  {
    execute: jest.fn(),
  } as unknown as jest.Mocked<GetOrdersByProductIdService>;
