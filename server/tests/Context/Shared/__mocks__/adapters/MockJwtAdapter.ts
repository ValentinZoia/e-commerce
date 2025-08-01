import { JwtAdapter } from "../../../../../src/shared/infrastructure/adapters";

export const mockJwtAdapter = {
  validateToken: jest.fn(),
  generateToken: jest.fn(),
} as unknown as jest.Mocked<typeof JwtAdapter>;
