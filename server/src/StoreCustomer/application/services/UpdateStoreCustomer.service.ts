import { Service } from "../../../shared/application/base";
import { CustomError } from "../../../shared/domain/errors";
import { StoreCustomerDataDto } from "../../domain/dtos";
import { StoreCustomer } from "../../domain/entities";
import { IStoreCustomerRepository } from "../../domain/interfaces";

export class UpdateStoreCustomerService extends Service<
  [string, StoreCustomerDataDto],
  StoreCustomer
> {
  constructor(
    private readonly storeCustomerRepository: IStoreCustomerRepository
  ) {
    super();
  }
  async execute(
    id: string,
    data: StoreCustomerDataDto
  ): Promise<StoreCustomer> {
    //verificar que exista storeCustomer a actualizar
    const existingStoreCustomer = await this.storeCustomerRepository.getById(
      id
    );
    if (!existingStoreCustomer)
      throw CustomError.notFound("StoreCustomer a actualizar no encontrada");

    const storeEntity = new StoreCustomer(
      null,
      data.nameStore,
      data.logo,
      data.banners
    );
    const newStoreCustomer = await this.storeCustomerRepository.update(
      id,
      storeEntity
    );
    return newStoreCustomer;
  }
}
