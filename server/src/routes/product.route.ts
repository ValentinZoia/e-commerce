import { Router } from "express";
import {
  getAllProducts,
  getNewProducts,
  getFeaturedProducts,
  getPromotionalProducts,
  getProductById,
  createProduct,
  getProductsByCategory,
  getProductsByCategoryV2
  
} from "../controllers/productController";

const ProductRouter = Router();

/// api/products

ProductRouter.get("/", getAllProducts);
ProductRouter.post("/", createProduct);
ProductRouter.get("/new", getNewProducts);
ProductRouter.get("/featured", getFeaturedProducts);
ProductRouter.get("/promotional", getPromotionalProducts);
ProductRouter.get("/:id", getProductById);
ProductRouter.get("/categories/:categoryId", getProductsByCategory);
ProductRouter.get("/categories/v2/:categoryId", getProductsByCategoryV2);



export default ProductRouter;
