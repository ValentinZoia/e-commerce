import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../../application/services/AdminService';

export class AuthMiddleware {
  constructor(private readonly adminService: AdminService) {}

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   //extrae el token de la cookie con nombre 'access_token'
    const token = req.cookies.access_token;
    
    //si no existe ese token, o esa cookie. Devuelve un error con acceso denegado.
    if (!token) {
      res.status(401).json({ 
        success: false, 
        message: 'Acceso denegado. No se proporcionó token de autenticación' 
      });
      return;
    }
    
    //si hay token, lo verifica. mediante esta inyeccion de dependencia.
    const payload = await this.adminService.verify(token);
    
    //si esa verificacion da error, lo devolvemos.
    if (!payload) {
      res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
      return;
    }
    
    //Si todo es correcto, Añadir información del admin al objeto request (id, username).
    req.admin = { id: payload.id, username:payload.username };
    next();
  };
}

// Extendemos el tipo Request de Express para incluir el admin
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
        username:string;
      };
    }
  }
}