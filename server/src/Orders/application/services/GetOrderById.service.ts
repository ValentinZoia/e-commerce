import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { Order } from "../../domain/entities/Order.entity";
import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";


export class GetOrderByIdService extends Service<[string], Order>{
    constructor(private orderRepository: IOrderRepository){
        super()
    }

    async execute(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if(!order) throw  CustomError.notFound(`Orden con id "${id}" no encontrada`);

        return order;
    }
}