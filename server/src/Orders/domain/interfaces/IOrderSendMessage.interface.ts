import { Order } from "../entities";
export interface Return {
  success: boolean;
  data: { id: string } | null;
}
export interface IOrderSendMessage {
  sendMsj(order: Order): Promise<Return>;
}
