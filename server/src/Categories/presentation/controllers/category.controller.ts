import { CustomError } from "../../../shared/domain/errors";
import { Request, Response, NextFunction } from "express";
import { CategoryDataDto } from "../../domain/dtos";
import {
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
  GetAllCategoriesService,
  GetCategoryByIdService,
  GetCategoryByNameService,
} from "../../application/services";
import { SortDir } from "../../../Products/domain/interfaces";

export class CategoryController {
  constructor(
    private createCategoryService: CreateCategoryService,
    private updateCategoryService: UpdateCategoryService,
    private deleteCategoryService: DeleteCategoryService,
    private getAllCategoriesService: GetAllCategoriesService,
    private getCategoryByIdService: GetCategoryByIdService,
    private getCategoryByNameService: GetCategoryByNameService
  ) {}

  createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const categoryDataDto = CategoryDataDto.create(req.body);
      const category = await this.createCategoryService.execute(
        categoryDataDto
      );
      res.status(201).json({
        success: true,
        message: "Categoria Creada Exitosamente",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("Category id is required");
      }
      const categoryDataDto = CategoryDataDto.create(req.body);
      const updatedCategory = await this.updateCategoryService.execute(
        id,
        categoryDataDto
      );
      res.status(200).json({
        success: true,
        message: "Categoria Actualizada Exitosamente",
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("Category id is required");
      }
      await this.deleteCategoryService.execute(id);
      res
        .status(200)
        .json({
          success: true,
          message: "Categoria Eliminada Exitosamente",
          data: {},
        })
        .end();
    } catch (error) {
      next(error);
    }
  };

  getAllCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { take, skip, sortBy, sortDir, search } = req.query;

      const limit = take ? parseInt(take as string) : 10;
      const offset = skip ? parseInt(skip as string) : 0;
      const currentPage = Math.floor(offset / limit) + 1;

      const result = await this.getAllCategoriesService.execute({
        take: limit,
        skip: offset,
        sortBy: sortBy ? (sortBy as string) : undefined,
        sortDir: sortDir ? (sortDir as SortDir) : undefined,
        search: search ? (search as string) : undefined,
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

  getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        throw CustomError.badRequest("Category id is required");
      }
      const category = await this.getCategoryByIdService.execute(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };

  getCategoryByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { name } = req.params;
      if (!name) {
        throw CustomError.badRequest("Category name is required");
      }
      const category = await this.getCategoryByNameService.execute(name);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  };
}
