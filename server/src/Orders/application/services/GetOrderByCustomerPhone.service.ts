import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";
import { CustomError } from "../../../shared/domain/errors";
import { Service } from "../../../shared/application/base";
import { Order } from "../../domain/entities/Order.entity";


export class GetOrdersByCustomerPhoneService extends Service<[string], Order[]>{
    constructor(private orderRepository: IOrderRepository){
        super()
    }

    async execute(customerPhone: string): Promise<Order[]> {
        const order = await this.orderRepository.findByCustomerPhone(customerPhone);
        if(!order) throw  CustomError.notFound(`No se encontraron ningunas ordenes para el ciente con numero celular: ${customerPhone}   `);

        return order;
    }
}