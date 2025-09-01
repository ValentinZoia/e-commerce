import { z } from "zod";
const bannersSchema = z.object({
  imageUrl: z.string().url(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  redirectUrl: z.string().nullable(),
});

export const storeCustomerSchema = z.object({
  nameStore: z.string().min(1),
  logo: z.string().nullable(),
  banners: z.array(bannersSchema),
});

export type StoreCustomerFormValues = z.infer<typeof storeCustomerSchema>;

export const defaultValues: StoreCustomerFormValues = {
  nameStore: "",
  logo: null,
  banners: [],
};
