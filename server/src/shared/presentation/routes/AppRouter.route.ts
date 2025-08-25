import { CategoryRoutes } from "../../../Categories/presentation/routes";
import { ProductRoutes } from "../../../Products/presentation/routes";
import { AuthAdminRoutes } from "../../../Auth/presentation/routes";
import { OrderRoutes } from "../../../Orders/presentation/routes/Order.route";
import { Router } from "express";
import { CheckoutRoutes } from "../../../Checkout/presentation/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definir todas mis rutas principales
    router.use("/api/admin", AuthAdminRoutes.routes);
    router.use("/api/products", ProductRoutes.routes);
    router.use("/api/categories", CategoryRoutes.routes);
    router.use("/api/orders", OrderRoutes.routes);
    router.use("/api/checkout", CheckoutRoutes.routes);

    return router;
  }
}
