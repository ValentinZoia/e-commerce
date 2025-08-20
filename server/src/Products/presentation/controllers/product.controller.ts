import { CustomError } from "../../../shared/domain/errors";
import { Request, Response, NextFunction } from "express";
import { CreateProductDto } from "../../domain/dtos";
import {
  CreateProductService,
  UpdateProductService,
  GetAllProductsService,
  GetProductByNameService,
  GetProductByIdService,
  DeleteProductService,
} from "../../application/services";
import { SortDir } from "../../domain/interfaces";

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
      res.status(201).json({
        success: true,
        message: "Producto Creado Exitosamente",
        data: product,
      });
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
      res.status(200).json({
        success: true,
        message: "Producto Actualizado Exitosamente",
        data: updatedProduct,
      });
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
      res
        .status(200)
        .json({ success: true, message: "Product deleted", data: {} })
        .end();
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
        priceMax,
        priceMin,
        inStock,
        freeShipping,
        size,
        take,
        skip,
        sortBy,
        sortDir,
        search,
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
      const limit = take ? parseInt(take as string) : 10;
      const offset = skip ? parseInt(skip as string) : 0;
      const currentPage = Math.floor(offset / limit) + 1;

      const result = await this.getAllProductsService.execute({
        search: search ? (search as string) : undefined,
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
        inStock:
          inStock === "true" ? true : inStock === "false" ? false : undefined,
        freeShipping:
          freeShipping === "true"
            ? true
            : freeShipping === "false"
            ? false
            : undefined,
        size: size as string,
        priceMax: priceMax ? parseInt(priceMax as string) : undefined,
        priceMin: priceMin ? parseInt(priceMin as string) : undefined,
        take: limit,
        skip: offset,
        sortBy: sortBy ? (sortBy as string) : undefined,
        sortDir: sortDir ? (sortDir as SortDir) : undefined,
      });

      // Calcular información de paginación
      const totalPages = Math.ceil(result.total / limit);
      const hasNextPage = currentPage < totalPages;
      const hasPreviousPage = currentPage > 1;

      res.status(200).json({
        data: result.items,
        total: result.total, // Total real de la base de datos
        page: currentPage, // Página actual
        limit: limit, // Límite usado
        totalPages, // Total de páginas
        hasNextPage, // Si hay página siguiente
        hasPreviousPage, // Si hay página anterior
      });
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
