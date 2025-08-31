import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { StoreCustomer } from "../../domain/entities";
import { IStoreCustomerRepository } from "../../domain/interfaces";

export class GetStoreCustomerByIdService extends Service<
  [string],
  StoreCustomer
> {
  constructor(
    private readonly storeCustomerRepository: IStoreCustomerRepository
  ) {
    super();
  }
  async execute(id: string): Promise<StoreCustomer> {
    const storeCustomer = await this.storeCustomerRepository.getById(id);
    if (!storeCustomer)
      throw CustomError.notFound(`StoreCustomer con id "${id}" no encontrada`);

    return storeCustomer;
  }
}
