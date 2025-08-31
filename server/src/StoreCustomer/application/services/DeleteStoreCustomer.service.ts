import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { IStoreCustomerRepository } from "../../domain/interfaces";

export class DeleteStoreCustomerService extends Service<[string], void> {
  constructor(
    private readonly storeCustomerRepository: IStoreCustomerRepository
  ) {
    super();
  }
  async execute(id: string): Promise<void> {
    //Verificar que exista stoerCustoemr a eliminar
    const existing = await this.storeCustomerRepository.getById(id);
    if (!existing) {
      throw CustomError.notFound("StoreCustomer a eliminar no encontrada");
    }

    //Eliminar storeCustomer
    await this.storeCustomerRepository.delete(id);
  }
}
