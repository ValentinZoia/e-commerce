import { errorHandler } from "./shared/presentation/middlewares";
import rateLimit from "express-rate-limit";
import express, { Router } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { AppRoutes } from "./shared/presentation/routes";

export const createServer = () => {
  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, //para permitir el uso y guardado de cookies
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  // Limitador de solicitudes para prevenir ataques de fuerza bruta
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limitar cada IP a 100 solicitudes por ventana
  });
  app.use(limiter);

  //Usar las rutas definidas
  app.use(AppRoutes.routes);

  // Middleware de manejo de errores (siempre al final)
  app.use(errorHandler);

  return app;
};
