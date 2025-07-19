import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import { Request, Response, NextFunction } from "express";
import { ValidationError, CustomError } from "../../domain/errors";
import {z} from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
 
   if (err instanceof z.ZodError) {
    
    
    const formattedErrors: Record<string, string[]> = {};
    err.errors.forEach((_err) => {
      const path = _err.path.join(".");
      if (!formattedErrors[path]) {
        formattedErrors[path] = [];
      }
      formattedErrors[path].push(_err.message);
    });

    // Responder directamente con el error de Zod, no lanzar otro error
     res.status(400).json({
      type: "ValidationError",
      statusCode: 400,
      message: "Validation failed",
      errors: formattedErrors
    });
    return
  }

  //Error de validacion personalizado
  if (err instanceof ValidationError) {
    res.status(400).json({
      type: "ValidationError",
      statusCode: err.statusCode || 400,
      message: err.message,
      
    });
    return
    
  }

  if(err instanceof CustomError){
     
    res.status(err.statusCode).json({
      type: err.type || 'CustomError',
      message: err.message,
      statusCode: err.statusCode ,
    })
    return
  }

  //Error prisma
  if (err instanceof PrismaClientKnownRequestError) {
    // P2002 es el código para violación de restricción única
    if (err.code === "P2002") {
      res.status(409).json({
        type: "UniqueConstraintError",
        message: "Ya existe un registro con este valor",
        // fields: err.meta?.target || [],
      });
      return;
    }

    // P2003 es el código para violación de restricción de clave foránea
    if (err.code === 'P2003') {
      res.status(400).json({
        type: 'ForeignKeyConstraintError',
        message: 'El valor de referencia no existe',
        // field: err.meta?.field_name || ''
      });
      return;
    }

    // P2025 es el código para error de no encontrado
    if (err.code === 'P2025') {
      res.status(404).json({
        type: 'NotFoundError',
        message: 'Recurso no encontrado'
      });
      return;
    }

    if(err.code === 'P2023'){
      res.status(404).json({
        type: 'InconsistentColumnData',
        message: 'Valor inválido de identificador',
        // field: err.meta?.modelName|| '',
        // dbMessage: `Inconsistent column data: ${err.meta?.message}` || 'Inconsistent column data',
      });
      return;
    }
  }

  

  
  // Error general del servidor
  res.status(500).json({
    message: `Error del Servidor`
  });

};
