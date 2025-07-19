import { Order } from "../../domain/entities/Order.entity";
import { IOrderSendMessage } from "../../domain/interfaces/IOrderSendMessage.interface";


export class OrderSendMessageToCustomer implements IOrderSendMessage {
    async sendMessage(order: Order): Promise<boolean> {
        return true
    }
}