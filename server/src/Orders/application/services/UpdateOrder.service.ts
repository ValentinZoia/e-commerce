import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";
import { OrderItemBuilder } from "../../domain/entities/OrderItem.builder";
import { CreateOrderDto } from "../../domain/dtos/OrderDataDto.dto";
import { OrderBuilder } from "../../domain/entities/Order.builder";
import { OrderItem } from "../../domain/entities/OrderItem.entity";
import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Order} from "../../domain/entities/Order.entity";

export class UpdateOrderService
  extends Service<[string, CreateOrderDto], Order>
{
  constructor(private orderRepository: IOrderRepository) {
    super();
  }

  async execute(id: string, data: CreateOrderDto): Promise<Order> {
    //verificar que exista orden a actualizar
    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder)
      throw CustomError.notFound("Orden a actualizar no encontrada");

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
    const updatedOrder = new OrderBuilder()
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
      .build();

    // Calcular totales
    updatedOrder.calculateTotals();

    return await  this.orderRepository.update(id,updatedOrder);
  }
}
