import { BcryptAdapter } from "../../../../../src/shared/infrastructure/adapters";

export const mockBcryptAdapter = {
  hash: jest.fn(),
  compare: jest.fn(),
} as unknown as jest.Mocked<typeof BcryptAdapter>;
