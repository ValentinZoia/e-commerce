import { z } from "zod";
import { installmentSchema } from "./productSchema";
export enum WhatsAppStatusNames {
  PENDING = "pending",
  SENT = "sent",
  RESPONDED = "responded",
  COMPLETED = "completed",
}
const OrderItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  quantity: z.number().int().positive(),
  size: z.string().nullable().optional(),
  unitPrice: z.number().positive(),
  discount: z.number().min(0).max(1),
  imageUrl: z.string().url().nullable().optional(),
});

export const orderSchema = z.object({
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().nullable().optional(),
  customerName: z.string().min(1),
  customerNotes: z.string().nullable().optional(),
  whatsappMessage: z.string().nullable().optional(),
  whatsappStatus: z.enum([
    WhatsAppStatusNames.PENDING,
    WhatsAppStatusNames.COMPLETED,
    WhatsAppStatusNames.RESPONDED,
    WhatsAppStatusNames.SENT,
  ]),
  paymentMethod: z.string().nullable().optional(),
  subtotal: z.number().nonnegative(),
  total: z.number().nonnegative(),
  isFreeShipping: z.boolean(),
  isCashDiscount: z.boolean(),
  cashDiscountPercentage: z.number().min(0).max(1).nullable(),
  installments: z.array(installmentSchema).nullable(),
  products: z.array(OrderItemSchema).min(0),
  shippingCost: z.number().nonnegative().nullable().optional(),
});

export type OrderFormValues = z.infer<typeof orderSchema>;

export const defaultValues: OrderFormValues = {
  customerPhone: "",
  customerEmail: null,
  customerName: "",
  customerNotes: null,
  whatsappMessage: null,
  whatsappStatus: WhatsAppStatusNames.PENDING,
  paymentMethod: null,
  subtotal: 0,
  total: 0,
  isFreeShipping: false,
  isCashDiscount: false,
  cashDiscountPercentage: null,
  installments: [],
  products: [],
  shippingCost: null,
};
