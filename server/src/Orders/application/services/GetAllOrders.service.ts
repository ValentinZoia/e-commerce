import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { Order } from "../../domain/entities/Order.entity";
import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";



export class GetAllOrdersService extends Service<[],Order[]>{
    constructor(
            private orderRepository:IOrderRepository,
        ){
            super()
        }
    async execute(): Promise<Order[]> {
        const orders = await this.orderRepository.findAll();
        if (!orders) throw CustomError.notFound("No se encontraron Ordenes");
        return orders;
    }
}