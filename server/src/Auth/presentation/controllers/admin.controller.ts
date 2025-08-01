import {
  CreateAdminService,
  LogInAdminService,
} from "../../application/services";
import { CreateAdminDto } from "../../domain/dtos";
import { LoginAdminDto } from "../../domain/dtos";
import { Request, Response, NextFunction } from "express";

export class AdminController {
  // DI
  constructor(
    private readonly createAdminService: CreateAdminService,
    private readonly logInAdminService: LogInAdminService
  ) {}

  createAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //realmente aca la request ya esta validada por el middleware, pero lo hacemos igual.

      const createAdminDto = CreateAdminDto.create(req.body);

      const newAdmin = await this.createAdminService.execute(createAdminDto);
      res.status(201).json(newAdmin);
    } catch (error) {
      next(error);
    }
  };
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loginAdminDto = LoginAdminDto.create(req.body);

      const token = await this.logInAdminService.execute(loginAdminDto);
      // Configurar la cookie con el token JWT
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        maxAge: 5 * 60 * 60 * 1000, // 5 horas
        sameSite: "strict",
      });

      res.status(200).json({
        success: true,
        message: "Login exitoso",
      });
    } catch (error) {
      next(error);
    }
  };
  async logout(req: Request, res: Response): Promise<void> {
    // Eliminar la cookie
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "Logout exitoso",
    });
  }
}
