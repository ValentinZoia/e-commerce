import { Router } from "express";
import {
  getAllProducts,
  getNewProducts,
  getFeaturedProducts,
  getPromotionalProducts,
  getProductById,
  createProduct,
} from "../controllers/productController";

const ProductRouter = Router();

ProductRouter.get("/", getAllProducts);
ProductRouter.post("/", createProduct);
ProductRouter.get("/new", getNewProducts);
ProductRouter.get("/featured", getFeaturedProducts);
ProductRouter.get("/promotional", getPromotionalProducts);
ProductRouter.get("/:id", getProductById);

export default ProductRouter;
