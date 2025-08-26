import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { JwtAdapter } from "../../../shared/infrastructure/adapters";
import { CreateCheckoutDto } from "../../domain/dtos/CreateCheckoutData.dto";
import { CheckoutSession } from "../../domain/entities/CheckoutSession.entity";
import { ICheckoutRepository } from "../../domain/interfaces";
import { CheckoutToken } from "../../domain/value-objects/CheckoutToken.value-object";
export type JwtPayloadCheckout = {
  checkoutId: string;
  exp: number;
};

export class CreateCheckoutService extends Service<
  [CreateCheckoutDto],
  string
> {
  constructor(
    private readonly checkoutRepoitory: ICheckoutRepository,
    private readonly CHECKOUT_EXPIRY_TIME: number
  ) {
    super();
  }
  async execute(data: CreateCheckoutDto): Promise<string> {
    // Crear token único
    const token = CheckoutToken.create();
    // Crear sesión de checkout
    const expiresAt = new Date(
      Date.now() + this.CHECKOUT_EXPIRY_TIME * 60 * 1000
    );

    const jwtPayload: JwtPayloadCheckout = {
      checkoutId: token.getValue(),
      exp: Math.floor(expiresAt.getTime() / 1000),
    };

    const jwtToken = await JwtAdapter.generateToken(jwtPayload, false);
    if (!jwtToken)
      throw CustomError.internalServerError("Error al generar JWT");
    const session = new CheckoutSession(
      token.getValue(), //id
      data.userId,
      jwtToken,
      expiresAt,
      new Date()
    );

    await this.checkoutRepoitory.save(session);

    return jwtToken;
  }
}
