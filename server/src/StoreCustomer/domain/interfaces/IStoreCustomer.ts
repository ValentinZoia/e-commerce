import { StoreCustomer } from "../entities";
export interface IStoreCustomerRepository {
  create(storeCustomer: StoreCustomer): Promise<StoreCustomer>;
  update(id: string, storeCustomer: StoreCustomer): Promise<StoreCustomer>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<StoreCustomer | null>;
  getAll(): Promise<StoreCustomer[]>;
}
