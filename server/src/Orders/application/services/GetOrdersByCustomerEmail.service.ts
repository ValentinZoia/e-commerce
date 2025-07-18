import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { Order } from "../../domain/entities/Order.entity";
import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";


export class GetOrdersByCustomerEmailService extends Service<[string], Order[]>{
    constructor(private orderRepository: IOrderRepository){
        super()
    }

    async execute(customerEmail: string): Promise<Order[]> {
        const order = await this.orderRepository.findByCustomerEmail(customerEmail);
        if(!order) throw  CustomError.notFound(`No se encontraron ningunas ordenes para el email ${customerEmail}   `);

        return order;
    }
}