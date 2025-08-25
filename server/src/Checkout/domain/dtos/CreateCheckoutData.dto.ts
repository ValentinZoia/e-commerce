import z from "zod";

export const CreateCheckoutDtoSchema = z.object({
  userId: z.string().min(1),
});

export type CreateCheckoutDto = z.infer<typeof CreateCheckoutDtoSchema>;

export class CreateCheckoutDTO {
  static create(data: unknown): CreateCheckoutDto {
    const parsedData: CreateCheckoutDto = CreateCheckoutDtoSchema.parse(data);

    return parsedData;
  }
}
