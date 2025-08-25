import { Service } from "../../../shared/application/base";
import { JwtAdapter } from "../../../shared/infrastructure/adapters";
import { ICheckoutRepository } from "../../domain/interfaces";
import { JwtPayloadCheckout } from "./CreateCheckout.service";
import { ValidateCheckoutService } from "./ValidateCheckout.service";

export class ExtendCheckoutService extends Service<[string], string> {
  constructor(
    private validateCheckoutService: ValidateCheckoutService,
    private readonly CHECKOUT_EXPIRY_TIME: number
  ) {
    super();
  }
  async execute(jwtToken: string): Promise<string> {
    const sessionDto = await this.validateCheckoutService.execute(jwtToken);
    if (!sessionDto) {
      throw new Error("Token de checkout inválido o expirado.");
    }
    const newExpiresAt = new Date(
      Date.now() + this.CHECKOUT_EXPIRY_TIME * 60 * 1000
    );
    const jwtPayload: JwtPayloadCheckout = {
      checkoutId: sessionDto.id,
      exp: Math.floor(newExpiresAt.getTime() / 1000),
    };

    const newJwtToken = await JwtAdapter.generateToken(jwtPayload, false);
    if (!newJwtToken) throw new Error("Error al generar JWT");
    return newJwtToken;
  }
}
