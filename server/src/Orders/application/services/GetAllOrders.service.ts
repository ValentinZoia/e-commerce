import { CustomError } from "../../../shared/domain/errors";
import { IOrderRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { Order } from "../../domain/entities";

export class GetAllOrdersService extends Service<[], Order[]> {
  constructor(private orderRepository: IOrderRepository) {
    super();
  }
  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    if (!orders) throw CustomError.notFound("No se encontraron Ordenes");
    return orders;
  }
}
