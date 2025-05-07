import { Router } from "express";
import {
  
  getCategoryById,
  getAllCategories,
  
  createCategory,
} from "../controllers/categoryController";

const CategoryRouter = Router();

/// api/categories

CategoryRouter.get("/", getAllCategories);
CategoryRouter.post("/", createCategory);
CategoryRouter.get("/:id", getCategoryById);


export default CategoryRouter;
