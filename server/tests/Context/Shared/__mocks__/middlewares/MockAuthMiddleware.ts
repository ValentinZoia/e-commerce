import { AuthMiddleware } from "../../../../../src/shared/presentation/middlewares";

export const mockAuthMiddleware: jest.Mocked<AuthMiddleware> = {
  authenticate: jest.fn((req, res, next) => next()),
} as unknown as jest.Mocked<AuthMiddleware>;
