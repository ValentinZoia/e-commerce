import z from "zod";
import { Banner } from "../entities";

export const bannersSchema = z.object({
  imageUrl: z.string().url().default(""),
  title: z.string().nullable().optional().default(null),
  description: z.string().nullable().optional().default(null),
  redirectUrl: z.string().nullable().optional().default(null),
});

export const storeCustomerSchema = z.object({
  nameStore: z.string().min(1),
  logo: z.string().nullable(),
  banners: z.array(bannersSchema).default([]),
});

export type StoreCustomerDataDTO = z.infer<typeof storeCustomerSchema>;

export class StoreCustomerDataDto {
  private constructor(
    public nameStore: string,
    public logo: string | null,
    public banners: Banner[]
  ) {}
  static create(data: unknown): StoreCustomerDataDto {
    const parsedata = storeCustomerSchema.parse(data);
    return new StoreCustomerDataDto(
      parsedata.nameStore,
      parsedata.logo,
      parsedata.banners
    );
  }
}
