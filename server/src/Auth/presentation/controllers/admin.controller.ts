import { CreateAdminDto, LoginAdminDto } from "../../domain/dtos";
import { CustomError } from "../../../shared/domain/errors";
import { Request, Response, NextFunction } from "express";
import {
  CreateAdminService,
  LogInAdminService,
  DeleteAdminService,
} from "../../application/services";

export class AdminController {
  // DI
  constructor(
    private readonly createAdminService: CreateAdminService,
    private readonly logInAdminService: LogInAdminService,
    private readonly deleteAdminService: DeleteAdminService
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
        data: {},
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
      data: {},
    });
  }
  deleteAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { username } = req.params;
      if (!username) {
        throw CustomError.badRequest("username is required");
      }
      const deletedAdmin = await this.deleteAdminService.execute(username);
      res.status(200).json({
        success: true,
        message: "Admin deleted successfully",
        data: deletedAdmin,
      });
    } catch (error) {
      next(error);
    }
  };
}
