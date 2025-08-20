import {
  GetAllItemsResult,
  GetAllQueryOptionsBase,
} from "../../../Products/domain/interfaces";
import { Order, WhatsAppStatusNames } from "../entities";

export interface OrdersGetAllQueryOptions extends GetAllQueryOptionsBase {
  customerPhone?: string;
  customerEmail?: string;
  customerName?: string;
  productId?: string;
  status?: WhatsAppStatusNames;
}

export interface IOrderRepository {
  save(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(
    options?: OrdersGetAllQueryOptions
  ): Promise<GetAllItemsResult<Order>>;
  findByCustomerPhone(phone: string): Promise<Order[] | null>;
  findByCustomerEmail(email: string): Promise<Order[] | null>;
  findByCustomerName(name: string): Promise<Order[] | null>;
  findByProductId(productId: string): Promise<Order[] | null>;
  findByStatus(status: WhatsAppStatusNames): Promise<Order[] | null>;
  update(id: string, order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
}
