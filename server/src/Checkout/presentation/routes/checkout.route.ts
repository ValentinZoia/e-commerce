import { Router } from "express";
import { PrismaCheckoutRepositoryImpl } from "../../infrastructure/repositories";
import {
  CreateCheckoutService,
  ValidateCheckoutService,
  ExtendCheckoutService,
  DeleteCheckoutService,
} from "../../application/services";
import { CheckoutController } from "../controllers";
const CHECKOUT_EXPIRY_MINUTES = 30;
export class CheckoutRoutes {
  static get routes(): Router {
    const router = Router();
    const repository = new PrismaCheckoutRepositoryImpl();
    const createCheckoutService = new CreateCheckoutService(
      repository,
      CHECKOUT_EXPIRY_MINUTES
    );
    const validateCheckoutService = new ValidateCheckoutService(repository);
    const extendCheckoutService = new ExtendCheckoutService(
      validateCheckoutService,
      CHECKOUT_EXPIRY_MINUTES
    );
    const deleteCheckoutService = new DeleteCheckoutService(repository);
    const controller = new CheckoutController(
      createCheckoutService,
      validateCheckoutService,
      extendCheckoutService,
      deleteCheckoutService
    );

    //Crear session
    router.post("/", controller.createCheckoutSession.bind(controller));

    //Vlidar sesion
    router.get("/:token", controller.getCheckoutSession.bind(controller));

    //Extender tiempo
    router.put(
      "/:token/extend",
      controller.extendCheckoutSession.bind(controller)
    );

    //Eliminar sesion
    router.delete("/:token", controller.deleteCheckoutSession.bind(controller));

    return router;
  }
}
