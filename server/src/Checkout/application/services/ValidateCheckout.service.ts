import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { JwtAdapter } from "../../../shared/infrastructure/adapters";
import { CheckoutSession } from "../../domain/entities/CheckoutSession.entity";
import { ICheckoutRepository } from "../../domain/interfaces";
import { JwtPayloadCheckout } from "./CreateCheckout.service";

export class ValidateCheckoutService extends Service<
  [string],
  CheckoutSession
> {
  constructor(private checkoutRepository: ICheckoutRepository) {
    super();
  }
  async execute(jwtToken: string): Promise<CheckoutSession> {
    //verificar JWT
    const decoded = await JwtAdapter.validateToken<JwtPayloadCheckout>(
      jwtToken
    );
    if (!decoded) {
      await this.checkoutRepository.findByToken(jwtToken);
      throw CustomError.unauthorized("Token de checkout inválido o expirado.");
    }
    //Buscar session
    const session = await this.checkoutRepository.findById(decoded.checkoutId);
    if (!session) {
      throw CustomError.unauthorized("Token de checkout inválido o expirado.");
    }

    //return session
    return session;
  }
}
