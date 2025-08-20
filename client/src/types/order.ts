import { BaseEntity, GetItemParamsBase } from "./shared";
export enum WhatsAppStatusNames {
  PENDING = "pending",
  SENT = "sent",
  RESPONDED = "responded",
  COMPLETED = "completed",
}

export type WhatsAppStatus =
  | WhatsAppStatusNames.PENDING
  | WhatsAppStatusNames.SENT
  | WhatsAppStatusNames.RESPONDED
  | WhatsAppStatusNames.COMPLETED;

export interface OrderItem {
  id: string | null;
  orderId: string | null;
  productId: string;
  productName: string;
  quantity: number;
  size: string | null;
  unitPrice: number;
  discount: number;
  imageUrl: string | null;
}

export interface Order extends BaseEntity {
  customerPhone: string;
  customerEmail: string | null;
  customerName: string;
  customerNotes: string | null;
  products: OrderItem[];
  whatsappMessage: string | null;
  whatsappStatus: WhatsAppStatus;
  paymentMethod: string | null;
  subtotal: number;
  shippingCost: number | null;
  total: number;
  isFreeShipping: boolean;
  whatsappSentAt: Date | null;
  completedAt: Date | null;
  expiredAt: Date | null;
}

export interface GetOrdersParams extends GetItemParamsBase<Order> {
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  productId?: string;
  status?: WhatsAppStatusNames;
}
