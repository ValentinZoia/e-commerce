import { Request, Response, NextFunction } from "express";
import { CreateCategoryService, UpdateCategoryService,DeleteCategoryService,GetAllCategoriesService,GetCategoryByIdService,GetCategoryByNameService } from "../../application/services";
import { CategoryDataDto } from "../../domain/dtos";

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
      const category = await this.createCategoryService.execute(categoryDataDto);
      res.status(201).json(category);
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
      const categoryDataDto = CategoryDataDto.create(req.body);
      const updatedCategory = await this.updateCategoryService.execute(id, categoryDataDto);
      res.status(200).json(updatedCategory);
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
      await this.deleteCategoryService.execute(id);
      res.status(204).end();
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
        const categories = await this.getAllCategoriesService.execute();
        res.status(200).json(categories);
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
        const {id} = req.params;
        const category = await this.getCategoryByIdService.execute(id);
        res.status(200).json(category)
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
        const {name} = req.params;
        const category = await this.getCategoryByNameService.execute(name);
        res.status(200).json(category)
    } catch (error) {
      next(error);
    }
  };
}
