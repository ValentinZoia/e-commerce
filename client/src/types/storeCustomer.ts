import { BaseEntity } from "./shared";

export interface Banner {
  imageUrl: string;
  title: string | null;
  description: string | null;
  redirectUrl: string | null;
}

export interface StoreCustomer extends BaseEntity {
  nameStore: string;
  logo: string | null;
  banners: Banner[];
}
