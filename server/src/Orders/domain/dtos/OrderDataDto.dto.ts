import { z } from "zod";
import { WhatsAppStatus, WhatsAppStatusNames } from "../entities/Order.entity";
const OrderItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().positive().default(1),
  size: z.string().nullable(),
  unitPrice: z.number().positive(),
  discount: z.number().min(0).max(1).default(0),
  imageUrl: z.string().url().nullable()
});

export const CreateOrderDtoSchema = z.object({
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().nullable(),
  customerName: z.string().min(1),
  customerNotes: z.string().nullable(),
  whatsappMessage: z.string().nullable(),
  whatsappStatus: z.enum([WhatsAppStatusNames.PENDING,WhatsAppStatusNames.COMPLETED,WhatsAppStatusNames.RESPONDED,WhatsAppStatusNames.SENT]).default(WhatsAppStatusNames.PENDING),
  paymentMethod: z.string().nullable(),
  subtotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),
  isFreeShipping: z.boolean().default(false),
  products: z.array(OrderItemSchema).min(1),
  shippingCost: z.number().nonnegative().nullable()
});

export type CreateOrderDto = z.infer<typeof CreateOrderDtoSchema>;

export class CreateOrderDTO{
  static create(data:unknown):CreateOrderDto{
    const parsedData:CreateOrderDto = CreateOrderDtoSchema.parse(data);
    return parsedData
  }
}