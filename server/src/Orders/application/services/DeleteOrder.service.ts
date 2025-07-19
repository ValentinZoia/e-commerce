import { IOrderRepository } from "../../domain/interfaces/IOrderRepository.interface";
import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";

export class DeleteOrderService extends Service<[string], void> {
    constructor(private readonly orderRepository: IOrderRepository) {
        super();
    }

    async execute(id: string): Promise<void> {
        //1. Verificar primero que existe la orden a eliminar
        const existingOrder = await this.orderRepository.findById(id);
        if(!existingOrder) throw CustomError.notFound("Orden a eliminar no encontrada");

        //2. Eliminar orden
        await this.orderRepository.delete(id);
    }
}