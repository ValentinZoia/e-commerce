import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";
import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Order } from "../../domain/entities/Order.entity";


export class GetOrdersByCustomerNameService extends Service<[string], Order[]>{
    constructor(private orderRepository: IOrderRepository){
        super()
    }

    async execute(customerName: string): Promise<Order[]> {
        const order = await this.orderRepository.findByCustomerName(customerName);
        if(!order) throw  CustomError.notFound(`No se encontraron ningunas ordenes para el ciente ${customerName}   `);

        return order;
    }
}