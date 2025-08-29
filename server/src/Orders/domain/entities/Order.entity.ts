import { OrderItem } from "./OrderItem.entity";

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

export class Order {
  constructor(
    public id: string | null = null,
    public customerPhone: string = "",
    public customerEmail: string | null = null,
    public customerName: string = "",
    public customerNotes: string | null = null,
    public products: OrderItem[] = [],
    public whatsappMessage: string | null = null,
    public whatsappStatus: WhatsAppStatus = WhatsAppStatusNames.PENDING,
    public paymentMethod: string | null = null,
    public subtotal: number = 0,
    public shippingCost: number | null = null,
    public total: number = 0,
    public isFreeShipping: boolean = false,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public whatsappSentAt: Date | null = null,
    public completedAt: Date | null = null,
    public expiredAt: Date | null = null
  ) {}

  calculateTotals(): void {
    this.subtotal = this.products.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity * (1 - item.discount),
      0
    );

    this.shippingCost = this.isFreeShipping ? 0 : this.shippingCost || null;
    this.total = this.subtotal + (this.shippingCost || 0);
    this.updatedAt = new Date();
  }

  generateWhatsAppMessage(): string {
    const itemsText = this.products
      .map(
        (item) =>
          `- ${item.productName}${item.size ? ` (Talle ${item.size})` : ""}: ${
            item.quantity
          } x $${item.unitPrice.toFixed(2)}`
      )
      .join("\n");

    const ShippingMessage = this.isFreeShipping
      ? `Envío gratis\n`
      : `Envío: $${(this.shippingCost || 0).toFixed(2)}\n`;

    const paymentMethod = this.paymentMethod
      ? `Método de pago: ${this.paymentMethod}\n`
      : `Por favor confirmame: Método de pago (Efectivo/transferencia/MercadoPago).`;

    return (
      `¡Hola ${this.customerName}! 👋\n\n` +
      `Resumen de tu pedido:\n\n${itemsText}\n\n` +
      `Subtotal: $${this.subtotal.toFixed(2)}\n` +
      ShippingMessage +
      `TOTAL: $${this.total.toFixed(2)}\n\n` +
      `${paymentMethod}` +
      `Por favor confirmame:\n Método de Envio`
    );
  }
}
