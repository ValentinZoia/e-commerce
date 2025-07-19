import { errorHandler } from './shared/presentation/middlewares';
import rateLimit from 'express-rate-limit';
import express, { Router } from "express";
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';


interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 5000, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    // Middlewares de seguridad y configuración
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN || "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, //para permitir el uso y guardado de cookies
      })
    );
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));

    // Limitador de solicitudes para prevenir ataques de fuerza bruta
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // Limitar cada IP a 100 solicitudes por ventana
    });
    this.app.use(limiter);

    //Usar las rutas definidas
    this.app.use(this.routes);

    // Middleware de manejo de errores (siempre al final)
    this.app.use(errorHandler);

    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en puerto ${this.port}`);
      console.log(`Entorno: ${process.env.NODE_ENV || "development"}`);
    });
  }
}
