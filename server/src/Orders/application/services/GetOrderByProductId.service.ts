import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";
import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Order } from "../../domain/entities/Order.entity";


export class GetOrdersByProductIdService extends Service<[string], Order[]>{
    constructor(private orderRepository: IOrderRepository){
        super()
    }

    async execute(productId: string): Promise<Order[]> {
        const order = await this.orderRepository.findByProductId(productId);
        if(!order) throw  CustomError.notFound(`No se encontraron ningunas ordenes para el producto con id: ${productId}   `);

        return order;
    }
}