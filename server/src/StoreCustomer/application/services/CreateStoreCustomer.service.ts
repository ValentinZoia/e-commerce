import { Service } from "../../../shared/application/base";
import { StoreCustomerDataDto } from "../../domain/dtos";
import { StoreCustomer } from "../../domain/entities";
import { IStoreCustomerRepository } from "../../domain/interfaces";

export class CreateStoreCustomerService extends Service<
  [StoreCustomerDataDto],
  StoreCustomer
> {
  constructor(
    private readonly storeCustomerRepository: IStoreCustomerRepository
  ) {
    super();
  }
  async execute(data: StoreCustomerDataDto): Promise<StoreCustomer> {
    const storeEntity = new StoreCustomer(
      null,
      data.nameStore,
      data.logo,
      data.banners
    );

    const newStoreCustomer = await this.storeCustomerRepository.create(
      storeEntity
    );
    return newStoreCustomer;
  }
}
