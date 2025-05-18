import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../../application/services/AdminService';

export class AuthMiddleware {
  constructor(private readonly adminService: AdminService) {}

  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.access_token;
    
    if (!token) {
      res.status(401).json({ 
        success: false, 
        message: 'Acceso denegado. No se proporcionó token de autenticación' 
      });
      return;
    }
    
    const payload = await this.adminService.verify(token);
    
    if (!payload) {
      res.status(401).json({ 
        success: false, 
        message: 'Token inválido o expirado' 
      });
      return;
    }
    
    // Añadir información del admin al objeto request
    req.admin = { id: payload.id };
    next();
  };
}

// Extendemos el tipo Request de Express para incluir el admin
declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: string;
      };
    }
  }
}