import { CreateOrderDto } from "../../../src/Orders/domain/dtos/OrderDataDto.dto";
import { OrderBuilder } from "../../../src/Orders/domain/entities/Order.builder";
import {
  Order,
  WhatsAppStatusNames,
} from "../../../src/Orders/domain/entities/Order.entity";
import { OrderItemBuilder } from "../../../src/Orders/domain/entities/OrderItem.builder";

export const mockValidOrderDataRequest: CreateOrderDto = {
  customerName: "mario",
  customerEmail: "mario@gmail.com",
  customerNotes: "la quiero ya!",
  isFreeShipping: false,
  whatsappStatus: WhatsAppStatusNames.PENDING,
  whatsappMessage: "hola querido",
  subtotal: 100,
  total: 100,
  shippingCost: null,
  products: [
    {
      productId: "1",
      productName: "play 6",
      quantity: 1,
      size: null,
      unitPrice: 100,
      discount: 0,
      imageUrl: null,
    },
  ],
  customerPhone: "1112345678",

  paymentMethod: null,
};

export const mockValidOrderDataRequestToOrderType = new OrderBuilder()
  .setCustomerName(mockValidOrderDataRequest.customerName)
  .setCustomerEmail(mockValidOrderDataRequest.customerEmail)
  .setCustomerNotes(mockValidOrderDataRequest.customerNotes)
  .setWhatsappStatus(mockValidOrderDataRequest.whatsappStatus)
  .setWhatsappSentAt(null)
  .setWhatsappMessage(mockValidOrderDataRequest.whatsappMessage)
  .setUpdatedAt(new Date())
  .setSubtotal(mockValidOrderDataRequest.subtotal)
  .setTotal(mockValidOrderDataRequest.total)
  .setShippingCost(mockValidOrderDataRequest.shippingCost)
  .setProducts([
    ...mockValidOrderDataRequest.products.map((item) =>
      new OrderItemBuilder()

        .setProductId(item.productId)
        .setProductName(item.productName)
        .setQuantity(item.quantity)
        .setSize(item.size)
        .setUnitPrice(item.unitPrice)
        .setDiscount(item.discount)
        .setImageUrl(item.imageUrl)
        .build()
    ),
  ])
  .setCustomerPhone(mockValidOrderDataRequest.customerPhone)
  .setExpiredAt(null)
  .setIsFreeShipping(mockValidOrderDataRequest.isFreeShipping)
  .setPaymentMethod(mockValidOrderDataRequest.paymentMethod)
  .setCreatedAt(new Date())
  .setCompletedAt(null)
  .build();

const productsReponse = mockValidOrderDataRequestToOrderType.products.map(
  (item) => ({
    ...item,
    orderId: "1",
  })
);

const productsReponseV2 = mockValidOrderDataRequestToOrderType.products.map(
  (item) => ({
    ...item,
    orderId: "2",
  })
);

export const mockValidOrderDataResponse = {
  ...mockValidOrderDataRequestToOrderType,
  products: productsReponse,
  id: "1",
} as Order;
export const mockValidOrderDataResponseV2 = {
  ...mockValidOrderDataRequestToOrderType,
  products: productsReponseV2,
  id: "2",
} as Order;
