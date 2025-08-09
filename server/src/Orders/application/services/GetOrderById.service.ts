import { CustomError } from "../../../shared/domain/errors";
import { IOrderRepository } from "../../domain/interfaces";
import { Service } from "../../../shared/application/base";
import { Order } from "../../domain/entities";

export class GetOrderByIdService extends Service<[string], Order> {
  constructor(private orderRepository: IOrderRepository) {
    super();
  }

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order)
      throw CustomError.notFound(`Orden con id "${id}" no encontrada`);

    return order;
  }
}
