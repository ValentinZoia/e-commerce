import { Order } from "../entities/Order.entity";

export interface IOrderSendMessage {
    sendMessage(order:Order):Promise<boolean>;
}