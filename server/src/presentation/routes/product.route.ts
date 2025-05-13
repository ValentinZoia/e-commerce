import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export function createProductRoutes(productController: ProductController){
    const router = Router();

    router.post('/', productController.createProduct);
    router.get('/', productController.getAllProducts);
    router.get('/:id', productController.getProductById);
    router.get('/name/:name', productController.getProductByName);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', productController.deleteProduct);

    return router;

}