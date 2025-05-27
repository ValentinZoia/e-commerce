import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export function createAdminRoutes(adminController: AdminController, authMiddleware:AuthMiddleware){
    const router = Router();

    router.post('/login', adminController.login.bind(adminController));
    router.post('/logout',authMiddleware.authenticate,  adminController.logout.bind(adminController));
    router.post('/',authMiddleware.authenticate,  adminController.createAdmin.bind(adminController));
    router.get('/', authMiddleware.authenticate,(req, res) =>{
        res.json({user:req.admin})
    })

    return router;

}