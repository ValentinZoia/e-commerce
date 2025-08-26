import { CheckoutSession } from "../entities/CheckoutSession.entity";

export interface ICheckoutRepository {
  save(session: CheckoutSession): Promise<void>;
  findById(id: string): Promise<CheckoutSession | null>;
  findByToken(token: string): Promise<CheckoutSession | null>;
  delete(id: string): Promise<void>;
}
