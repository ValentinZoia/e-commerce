import { AdminService } from "../../application/services/AdminService";
import { Request, Response, NextFunction } from "express";
export class AdminController {
  constructor(private adminService: AdminService) {}

  createAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const admin = await this.adminService.createAdmin(req.body);
      res.status(201).json(admin);
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
      const token = await this.adminService.login(req.body);
       // Configurar la cookie con el token JWT
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
        maxAge: 5 * 60 * 60 * 1000, // 5 horas
        sameSite: 'strict'
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Login exitoso',
        
      });
    } catch (error) {
        next(error);
    }
  };
  async logout(req: Request, res: Response): Promise<void> {
    // Eliminar la cookie
    res.clearCookie('access_token');
    res.status(200).json({ 
      success: true, 
      message: 'Logout exitoso' 
    });
  }
}
