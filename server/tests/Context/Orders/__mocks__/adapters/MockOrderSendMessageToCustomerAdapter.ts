import { OrderSendMessageToCustomer } from "../../../../../src/Orders/infrastructure/adapters/OrderSendMessageToCustomer.impl";
export const mockOrderSendMessageToCustomerAdapter: jest.Mocked<OrderSendMessageToCustomer> =
  {
    sendMessage: jest.fn(),
  } as unknown as jest.Mocked<OrderSendMessageToCustomer>;
