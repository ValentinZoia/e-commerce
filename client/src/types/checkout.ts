import { BaseEntity } from "./shared";

export interface CheckoutSession extends BaseEntity {
  userId: string;
  expiresAt: Date;
}

export interface CheckoutDataResponse {
  checkoutToken: string;
  checkoutUrl: string;
  expiresInMinutes: number;
}
