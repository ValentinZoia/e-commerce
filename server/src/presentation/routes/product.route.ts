import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function createProductRoutes(productController: ProductController, authMiddleware:AuthMiddleware){
    const router = Router();

    //a estas rutas solo deberan acceder los admins, por eso se verifica con el middleware su session.
    router.post('/',authMiddleware.authenticate, productController.createProduct);
    router.put('/:id',authMiddleware.authenticate, productController.updateProduct);
    router.delete('/:id',authMiddleware.authenticate, productController.deleteProduct);

    router.get('/', productController.getAllProducts);
    router.get('/:id', productController.getProductById);
    router.get('/name/:name', productController.getProductByName);
    

    return router;

}