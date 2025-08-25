import { CustomError } from "../../../shared/domain/errors";

export class CheckoutToken {
  constructor(private readonly value: string) {
    if (!value || value.length < 10) {
      throw CustomError.badRequest(
        "El token debe tener al menos 10 caracteres"
      );
    }
  }

  public getValue(): string {
    return this.value;
  }

  public toString(): string {
    return this.value;
  }

  public static create(): CheckoutToken {
    // Generar un token único para el checkout
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2);
    return new CheckoutToken(`chk_${timestamp}_${randomPart}`);
  }
}
