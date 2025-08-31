import { Service } from "../../../shared/application/base";
import { StoreCustomer } from "../../domain/entities";
import { IStoreCustomerRepository } from "../../domain/interfaces";

export class GetAllStoreCustomerService extends Service<[], StoreCustomer[]> {
  constructor(
    private readonly storeCustomerRepository: IStoreCustomerRepository
  ) {
    super();
  }

  async execute(): Promise<StoreCustomer[]> {
    return await this.storeCustomerRepository.getAll();
  }
}
