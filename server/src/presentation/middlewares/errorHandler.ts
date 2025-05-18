import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../infrastructure/validators/ValidationError";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  

  //Error de validacion personalizado
  if (err instanceof ValidationError) {
    res.status(400).json({
      type: "ValidationError",
      message: err.message,
      errors: err.errors,
    });
    return;
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

  //Error no encontrado
  if(err.message.includes('no encontrado') || err.message.includes('not found')){
    res.status(404).json({
      message: err.message
    });
    return;
  }

  
  // Error general del servidor
  res.status(500).json({
    message: `Error del Servidor`
  });

};
