import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { JwtAdapter } from "../../../shared/infrastructure/adapters";
import { ICheckoutRepository } from "../../domain/interfaces";
import { JwtPayloadCheckout } from "./CreateCheckout.service";

export class DeleteCheckoutService extends Service<[string], boolean> {
  constructor(private readonly checkoutRepository: ICheckoutRepository) {
    super();
  }

  async execute(jwtToken: string): Promise<boolean> {
    const decoded = await JwtAdapter.validateToken<JwtPayloadCheckout>(
      jwtToken
    );
    if (!decoded) {
      await this.checkoutRepository.findByToken(jwtToken);
      throw CustomError.unauthorized("Token de checkout inválido o expirado.");
    }
    const session = await this.checkoutRepository.findById(decoded.checkoutId);
    if (!session) {
      throw CustomError.unauthorized("Token de checkout inválido o expirado.");
    }
    await this.checkoutRepository.delete(decoded.checkoutId);
    return true;
  }
}
