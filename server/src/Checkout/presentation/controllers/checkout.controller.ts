import { Request, Response, NextFunction } from "express";
import { CreateCheckoutDTO } from "../../domain/dtos/CreateCheckoutData.dto";
import {
  CreateCheckoutService,
  ValidateCheckoutService,
  ExtendCheckoutService,
  DeleteCheckoutService,
} from "../../application/services";
import { CustomError } from "../../../shared/domain/errors";

export class CheckoutController {
  constructor(
    private readonly createCheckoutService: CreateCheckoutService,
    private readonly validateCheckoutService: ValidateCheckoutService,
    private readonly extendCheckoutService: ExtendCheckoutService,
    private readonly deleteCheckoutService: DeleteCheckoutService
  ) {}
  createCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const createCheckoutDto = CreateCheckoutDTO.create(req.body);

      const jwtToken = await this.createCheckoutService.execute(
        createCheckoutDto
      );
      res.status(201).json({
        success: true,
        message: "Checkout Session creada exitosamente",
        data: {
          checkoutToken: jwtToken,
          checkoutUrl: `/checkout/${jwtToken}`,
          expiresInMinutes: 30,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  getCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;
      const session = await this.validateCheckoutService.execute(token);

      if (!session) {
        throw CustomError.unauthorized(
          "Token de checkout inválido o expirado."
        );
      }

      res.status(200).json({
        success: true,
        message: "Checkout Session obtenida exitosamente",
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };
  extendCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;

      const newToken = await this.extendCheckoutService.execute(token);

      if (!newToken) {
        throw CustomError.unauthorized(
          "Token de checkout inválido o expirado."
        );
      }

      res.json({
        success: true,
        message: "Checkout Session extendida exitosamente",
        data: {
          checkoutToken: newToken,
          checkoutUrl: `/checkout/${newToken}`,
          expiresInMinutes: 30,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  deleteCheckoutSession = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.params;

      const deleted = await this.deleteCheckoutService.execute(token);

      res.json({
        success: true,
        message: deleted ? "Checkout session deleted" : "Session not found",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
