import {
  CreateProductService,
  UpdateProductService,
  GetAllProductsService,
  GetProductByNameService,
  GetProductByIdService,
  DeleteProductService,
} from "../../application/services";
import { Request, Response, NextFunction } from "express";
import { CreateProductDto } from "../../domain/dtos";
import { CustomError } from "../../../shared/domain/errors";
import { GetAllQueryOptions } from "../../domain/interfaces";

export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService,
    private readonly updateProductService: UpdateProductService,
    private readonly deleteProductService: DeleteProductService,
    private readonly getAllProductsService: GetAllProductsService,
    private readonly getProductByIdService: GetProductByIdService,
    private readonly getProductByNameService: GetProductByNameService
  ) {}

  createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const createProductDto = CreateProductDto.create(req.body);
      const product = await this.createProductService.execute(createProductDto);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("Product id is required");
      }
      const updateProductDto = CreateProductDto.create(req.body);
      const updatedProduct = await this.updateProductService.execute(
        id,
        updateProductDto
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("Product id is required");
      }
      await this.deleteProductService.execute(id);
      res.status(200).json({ message: "Product deleted" }).end();
    } catch (error) {
      next(error);
    }
  };

  getAllProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        category,
        featured,
        promotion,
        new: isNew,
        take,
        skip,
      } = req.query;

      /*
      *la request se vera algo asi:
       - /api/products?featured=true.
       -/api/products?new=true.
       -/api/products?promotion=true.
       -/api/products?featured=true
       -/api/products?category=${categoryId}.

       dependiendo los productos que se quieran traer.
      */

      const result = await this.getAllProductsService.execute({
        category: category as string,
        featured:
          featured === "true" ? true : featured === "false" ? false : undefined,
        new: isNew === "true" ? true : isNew === "false" ? false : undefined,
        promotion:
          promotion === "true"
            ? true
            : promotion === "false"
            ? false
            : undefined,
        take: take ? parseInt(take as string) : undefined,
        skip: skip ? parseInt(skip as string) : undefined,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("Product id is required");
      }
      const product = await this.getProductByIdService.execute(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  getProductByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name } = req.params;
      if (!name) {
        throw CustomError.badRequest("Product name is required");
      }
      const product = await this.getProductByNameService.execute(name);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
}
