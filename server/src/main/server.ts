import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupDependencies } from './container';
import { createProductRoutes } from '../presentation/routes/product.route';
import { createCategoryRoutes } from '../presentation/routes/category.route';
import { createAdminRoutes} from '../presentation/routes/admin.route';
import { errorHandler } from '../presentation/middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import prisma from '../infrastructure/database/prismaClient';


const createServer = () => {
  const app = express();

  // Middlewares de seguridad y configuración
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true, //para permitir el uso y guardado de cookies
  }));
  app.use(helmet());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  // Limitador de solicitudes para prevenir ataques de fuerza bruta
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limitar cada IP a 100 solicitudes por ventana
  });
  app.use(limiter);

  // Inyección de dependencias
  const { categoryController, productController, adminController, authMiddleware } = setupDependencies();

  // Rutas
  app.use('/api/categories', createCategoryRoutes(categoryController));
  app.use('/api/products', createProductRoutes(productController));
  app.use('/api/admin',createAdminRoutes(adminController, authMiddleware) )

  // Manejador de rutas no encontradas
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Ruta no encontrada',
      path: req.path
    });
  });

  // Middleware de manejo de errores (siempre al final)
  app.use(errorHandler);
  // app.use(authMiddleware.authenticate)

  return app;
};

// Iniciar el servidor
const startServer = () => {
  const PORT = process.env.PORT || 5000;
  const app = createServer();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  });

  // Manejo de apagado gracioso
  process.on('SIGTERM', () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    server.close(() => {
      console.log('Proceso terminado');
      process.exit(0);
    });
  });

  return server;
};

// Función principal para ejecutar el servidor
async function main() {
  try {
    const server = startServer();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// Ejecutar el servidor
main().catch(async (e) => {
  console.error(e);
  process.exit(1);
}).finally(()=>{
  prisma.$disconnect();
})
;

export { createServer, startServer };