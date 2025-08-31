import {
  CreateStoreCustomerService,
  UpdateStoreCustomerService,
  DeleteStoreCustomerService,
  GetAllStoreCustomerService,
  GetStoreCustomerByIdService,
} from "../../application/services";
import { NextFunction, Request, Response } from "express";
import { StoreCustomerDataDto } from "../../domain/dtos";
import { CustomError } from "../../../shared/domain/errors";

export class StoreCustomerController {
  constructor(
    private readonly createStoreCustomerService: CreateStoreCustomerService,
    private readonly updateStoreCustomerService: UpdateStoreCustomerService,
    private readonly deleteStoreCustomerService: DeleteStoreCustomerService,
    private readonly getAllStoreCustomerService: GetAllStoreCustomerService,
    private readonly getStoreCustomerByIdService: GetStoreCustomerByIdService
  ) {}
  createStoreCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const storeCustomerDataDto = StoreCustomerDataDto.create(req.body);
      const storeCustomer = await this.createStoreCustomerService.execute(
        storeCustomerDataDto
      );
      res.status(201).json({
        success: true,
        message: "Store creado exitosamente",
        data: storeCustomer,
      });
    } catch (error) {
      next(error);
    }
  };
  updateStoreCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest(
          "id es requerido para actualizar los datos de tu store"
        );
      }
      const storeCustomerDataDto = StoreCustomerDataDto.create(req.body);
      const storeCustomer = await this.updateStoreCustomerService.execute(
        id,
        storeCustomerDataDto
      );
      res.status(201).json({
        success: true,
        message: "Store actualizado exitosamente",
        data: storeCustomer,
      });
    } catch (error) {
      next(error);
    }
  };
  deleteStoreCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest(
          "id es requerido para actualizar los datos de tu store"
        );
      }
      await this.deleteStoreCustomerService.execute(id);
      res.status(201).json({
        success: true,
        message: "StoreData eliminada exitosamente",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  };
  getAllStoreCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const storeCustomer = await this.getAllStoreCustomerService.execute();
      res.status(201).json({
        success: true,
        message: "StoreData eliminada exitosamente",
        data: storeCustomer,
      });
    } catch (error) {
      next(error);
    }
  };
  getStoreCustomerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest(
          "id es requerido para actualizar los datos de tu store"
        );
      }
      const storeCustomer = await this.getStoreCustomerByIdService.execute(id);
      res.status(201).json(storeCustomer);
    } catch (error) {
      next(error);
    }
  };
}
