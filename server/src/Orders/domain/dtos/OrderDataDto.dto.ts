import { WhatsAppStatusNames } from "../entities";
import { z } from "zod";

export const OrderItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().positive().default(1),
  size: z.string().nullable().optional().default(null),
  unitPrice: z.number().positive(),
  discount: z.number().min(0).max(1).default(0),
  imageUrl: z.string().url().nullable().optional().default(null),
});

export const CreateOrderDtoSchema = z.object({
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().nullable().optional().default(null),
  customerName: z.string().min(1),
  customerNotes: z.string().nullable().optional().default(null),
  whatsappMessage: z.string().nullable().optional().default(null),
  whatsappStatus: z
    .enum([
      WhatsAppStatusNames.PENDING,
      WhatsAppStatusNames.COMPLETED,
      WhatsAppStatusNames.RESPONDED,
      WhatsAppStatusNames.SENT,
    ])
    .default(WhatsAppStatusNames.PENDING),
  paymentMethod: z.string().nullable().optional().default(null),
  subtotal: z.number().nonnegative().default(0),
  total: z.number().nonnegative().default(0),
  isFreeShipping: z.boolean().default(false),
  products: z.array(OrderItemSchema).min(1),
  shippingCost: z.number().nonnegative().nullable().optional().default(null),
});

export type CreateOrderDto = z.infer<typeof CreateOrderDtoSchema>;

export class CreateOrderDTO {
  static create(data: unknown): CreateOrderDto {
    const parsedData: CreateOrderDto = CreateOrderDtoSchema.parse(data);

    if (parsedData.isFreeShipping) {
      parsedData.shippingCost = 0;
    }

    parsedData.subtotal = parsedData.products.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity * (1 - item.discount),
      0
    );

    parsedData.shippingCost = parsedData.isFreeShipping
      ? 0
      : parsedData.shippingCost || null;
    parsedData.total = parsedData.subtotal + (parsedData.shippingCost || 0);
    return parsedData;
  }
}
