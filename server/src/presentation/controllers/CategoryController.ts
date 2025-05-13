import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../../application/services/CategoryService";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const category = await this.categoryService.createCategory(req.body);
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
      const updatedCategory = await this.categoryService.updateCategory(
        id,
        req.body
      );
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
      await this.categoryService.deleteCategory(id);
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
        const categories = await this.categoryService.getAllCategories();
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
        const category = await this.categoryService.getCategoryById(id)
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
        const category = await this.categoryService.getCategoryByName(name)
        res.status(200).json(category)
    } catch (error) {
      next(error);
    }
  };
}
