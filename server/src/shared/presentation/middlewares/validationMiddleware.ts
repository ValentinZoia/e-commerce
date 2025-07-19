import { Request, Response, NextFunction } from "express";
import { z } from "zod";


export class ValidationMiddleware {
  static validateBody(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        // Validar el cuerpo de la solicitud
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        throw error;
      }
    };
  }
}
