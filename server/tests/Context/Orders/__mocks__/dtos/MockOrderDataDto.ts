import { CreateOrderDTO } from "../../../../../src/Orders/domain/dtos/OrderDataDto.dto";

export const mockOrderDataDto: jest.Mocked<CreateOrderDTO> = {
  create: jest.fn(),
} as unknown as jest.Mocked<CreateOrderDTO>;
