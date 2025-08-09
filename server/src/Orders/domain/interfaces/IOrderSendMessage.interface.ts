import { Order } from "../entities";

export interface IOrderSendMessage {
  sendMessage(order: Order): Promise<boolean>;
}
