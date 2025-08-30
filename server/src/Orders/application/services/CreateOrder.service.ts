import { IOrderSendMessage, IOrderRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { CreateOrderDto } from "../../domain/dtos";
import {
  OrderItemBuilder,
  Order,
  OrderBuilder,
  OrderItem,
  WhatsAppStatusNames,
} from "../../domain/entities";

export class CreateOrderService extends Service<[CreateOrderDto], Order> {
  constructor(
    private orderRepository: IOrderRepository,
    private orderSendMessageToCustomer: IOrderSendMessage
  ) {
    super();
  }
  async execute(data: CreateOrderDto): Promise<Order> {
    //  1 - Crear la orden

    // mapear los productos a OrderItem
    const items: OrderItem[] = data.products.map((item) =>
      new OrderItemBuilder()
        .setId(null)
        .setOrderId(null)
        .setProductId(item.productId)
        .setProductName(item.productName)
        .setQuantity(item.quantity)
        .setSize(item.size)
        .setUnitPrice(item.unitPrice)
        .setDiscount(item.discount)
        .setImageUrl(item.imageUrl)
        .build()
    );

    // crear la orden con OrderBuilder y asignar los OrderItems
    const order = new OrderBuilder()
      .setId(null)
      .setCustomerPhone(data.customerPhone)
      .setCustomerEmail(data.customerEmail)
      .setCustomerName(data.customerName)
      .setCustomerNotes(data.customerNotes)
      .setProducts(items)
      .setWhatsappMessage(data.whatsappMessage)
      .setWhatsappStatus(data.whatsappStatus)
      .setPaymentMethod(data.paymentMethod)
      .setSubtotal(data.subtotal)
      .setShippingCost(data.shippingCost)
      .setTotal(data.total)
      .setIsFreeShipping(data.isFreeShipping)
      .setIsCashDiscount(data.isCashDiscount)
      .setCashDiscountPercentage(data.cashDiscountPercentage)
      .setInstallments(data.installments)
      .build();

    // Calcular totales
    order.calculateTotals();

    // Guardar la orden en la db
    const savedOrder = await this.orderRepository.save(order);

    // Enviar mensaje solo si se guardó correctamente
    const isMessageSent = await this.orderSendMessageToCustomer.sendMsj(
      savedOrder
    );

    if (isMessageSent.success && isMessageSent.data !== null) {
      await this.orderRepository.updateWhatsAppStatus(
        savedOrder.id as string,
        WhatsAppStatusNames.SENT
      );
    }

    return savedOrder;
  }
}
