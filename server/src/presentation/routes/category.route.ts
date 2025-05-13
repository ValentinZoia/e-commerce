import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";

export function createCategoryRoutes(categoryController: CategoryController){
    const router = Router();

    router.post('/', categoryController.createCategory);
    router.get('/', categoryController.getAllCategories);
    router.get('/:id', categoryController.getCategoryById);
    router.get('/name/:name', categoryController.getCategoryByName);
    router.put('/:id', categoryController.updateCategory);
    router.delete('/:id', categoryController.deleteCategory);

    return router;

}