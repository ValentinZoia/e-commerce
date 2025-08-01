import { NextFunction, Request, Response } from "express";
import { ValidationMiddleware } from "../../../../../src/shared/presentation/middlewares";

export const mockValidationMiddleware: jest.Mocked<
  typeof ValidationMiddleware
> = {
  validateBody: jest.fn(
    (schema) => (req: Request, res: Response, next: NextFunction) => next()
  ),
} as unknown as jest.Mocked<typeof ValidationMiddleware>;
