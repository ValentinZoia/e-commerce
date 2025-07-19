import { IOrderSendMessage } from "../../domain/interfaces/IOrderSendMessage.interface";
import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";
import { OrderItemBuilder } from "../../domain/entities/OrderItem.builder";
import { CreateOrderDto } from "../../domain/dtos/OrderDataDto.dto";
import { OrderItem } from "../../domain/entities/OrderItem.entity";
import { OrderBuilder } from "../../domain/entities/Order.builder";
import { Service } from "../../../shared/application/base";
import { Order } from "../../domain/entities/Order.entity";

export class CreateOrderService extends Service<[CreateOrderDto],Order>{
    constructor(
        private orderRepository:IOrderRepository,
        private orderSendMessageToCustomer:IOrderSendMessage,
    ){
        super()
    }
    async execute(data: CreateOrderDto): Promise<Order> {
        
        //  1 - Crear la orden

        // mapear los productos a OrderItem
        const items: OrderItem[] = data.products.map(item =>
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
            .build();

        // Calcular totales
        order.calculateTotals();

        // Guardar la orden en la db
        const savedOrder = await this.orderRepository.save(order);

        // Enviar mensaje solo si se guardó correctamente
        await this.orderSendMessageToCustomer.sendMessage(savedOrder);

        return savedOrder;
    }
}