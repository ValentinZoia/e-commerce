import { IAdminRepository } from "../../../Auth/domain/interfaces";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { JwtAdapter } from "../../infrastructure/adapters";

type JwtAdminPayload = {
  id: string;
  username: string;
}

export class AuthMiddleware {
  constructor(private readonly adminRespository: IAdminRepository) {}

  authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //extrae el token de la cookie con nombre 'access_token'
      const token = req.cookies.access_token;

      //si no existe ese token, o esa cookie. Devuelve un error con acceso denegado.
      if (!token) {
        throw CustomError.unauthorized(
          "Acceso denegado. No se proporcionó un token de autenticación."
        );
      }

      //si hay token, lo verifica. mediante esta inyeccion de dependencia oculta.
      const payload = await JwtAdapter.validateToken<JwtAdminPayload>(token);

      //si esa verificacion da error, lo devolvemos.
      if (!payload) {
        throw CustomError.unauthorized(
          "Token de autenticación inválido o expirado."
        );
      }

      const user = await this.adminRespository.findAdminByUsername(payload.username);
      if(!user) throw CustomError.unauthorized("Token invalido - Usuario no encontrado.");

      //Si todo es correcto, Añadir información del admin al objeto request (id, username).
      req.admin = { id: payload.id, username: payload.username } as JwtAdminPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
}
// Extendemos el tipo Request de Express para incluir el admin
declare global {
  namespace Express {
    interface Request {
      admin?: JwtAdminPayload
    }
  }
}
