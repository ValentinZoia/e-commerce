import { CustomError } from "../../../shared/domain/errors";
import {
  IOrderRepository,
  OrdersGetAllQueryOptions,
} from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { Order, WhatsAppStatusNames } from "../../domain/entities";
import { GetAllItemsResult } from "../../../Products/domain/interfaces";

export class GetAllOrdersService extends Service<
  [OrdersGetAllQueryOptions],
  GetAllItemsResult<Order>
> {
  constructor(private orderRepository: IOrderRepository) {
    super();
  }
  async execute(
    options?: OrdersGetAllQueryOptions
  ): Promise<GetAllItemsResult<Order>> {
    if (options?.take && options.take < 0) {
      throw CustomError.badRequest("El valor de take debe ser mayor a 0");
    }

    if (options?.skip && options.skip < 0) {
      throw CustomError.badRequest("El valor de skip debe ser mayor a 0");
    }

    const orders = await this.orderRepository.findAll({
      take: options?.take,
      skip: options?.skip,
      sortBy: options?.sortBy,
      sortDir: options?.sortDir,
      customerEmail: options?.customerEmail,
      customerName: options?.customerName,
      customerPhone: options?.customerPhone,
      productId: options?.productId,
      status: options?.status,
    });

    return orders;
  }
}
