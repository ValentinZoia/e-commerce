import { Installment } from "../../../Products/domain/entities";
import { Order, WhatsAppStatus } from "./Order.entity";
import { OrderItem } from "./OrderItem.entity";

export class OrderBuilder {
  private order: Order;

  constructor() {
    this.order = new Order();
  }
  setId(id: string | null): OrderBuilder {
    this.order.id = id;
    return this;
  }
  setCustomerPhone(customerPhone: string): OrderBuilder {
    this.order.customerPhone = customerPhone;
    return this;
  }
  setCustomerEmail(customerEmail: string | null): OrderBuilder {
    this.order.customerEmail = customerEmail;
    return this;
  }
  setCustomerName(customerName: string): OrderBuilder {
    this.order.customerName = customerName;
    return this;
  }
  setCustomerNotes(customerNotes: string | null): OrderBuilder {
    this.order.customerNotes = customerNotes;
    return this;
  }
  setProducts(products: OrderItem[]): OrderBuilder {
    this.order.products = products;
    return this;
  }
  setWhatsappMessage(whatsappMessage: string | null): OrderBuilder {
    this.order.whatsappMessage = whatsappMessage;
    return this;
  }
  setWhatsappStatus(whatsappStatus: WhatsAppStatus): OrderBuilder {
    this.order.whatsappStatus = whatsappStatus;
    return this;
  }
  setPaymentMethod(method: string | null): OrderBuilder {
    this.order.paymentMethod = method;
    return this;
  }
  setSubtotal(subtotal: number): OrderBuilder {
    this.order.subtotal = subtotal;
    return this;
  }
  setShippingCost(cost: number | null): OrderBuilder {
    this.order.shippingCost = cost;
    return this;
  }
  setTotal(total: number): OrderBuilder {
    this.order.total = total;
    return this;
  }
  setIsFreeShipping(isFree: boolean): OrderBuilder {
    this.order.isFreeShipping = isFree;
    return this;
  }
  setIsCashDiscount(isCashDiscount: boolean): OrderBuilder {
    this.order.isCashDiscount = isCashDiscount;
    return this;
  }
  setCashDiscountPercentage(percentage: number | null): OrderBuilder {
    this.order.cashDiscountPercentage = percentage;
    return this;
  }
  setInstallments(installments: Installment[]): OrderBuilder {
    this.order.installments = installments;
    return this;
  }
  setCreatedAt(date: Date): OrderBuilder {
    this.order.createdAt = date;
    return this;
  }
  setUpdatedAt(date: Date): OrderBuilder {
    this.order.updatedAt = date;
    return this;
  }
  setWhatsappSentAt(date: Date | null): OrderBuilder {
    this.order.whatsappSentAt = date;
    return this;
  }
  setCompletedAt(date: Date | null): OrderBuilder {
    this.order.completedAt = date;
    return this;
  }
  setExpiredAt(date: Date | null): OrderBuilder {
    this.order.expiredAt = date;
    return this;
  }

  build(): Order {
    return this.order;
  }
}
