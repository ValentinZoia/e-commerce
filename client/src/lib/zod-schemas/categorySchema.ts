import { z } from "zod";
export const categorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  slug: z
    .string()
    .min(3, { message: "El slug debe tener al menos 3 caracteres" }),
  description: z.string().nullable(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export const defaultValues: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
};
