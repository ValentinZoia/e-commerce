import { z } from "zod";

const sizeSchema = z.object({
  name: z.string().min(1, { message: "El nombre del talle es requerido" }),
  stock: z
    .number()
    .int()
    .min(0, { message: "El stock del talle debe ser mayor o igual a 0" }),
});

// Schema para cuotas
const installmentSchema = z.object({
  quantity: z
    .number()
    .int()
    .positive({ message: "La cantidad de cuotas debe ser positiva" }),
  amount: z
    .number()
    .positive({ message: "El monto de cuotas debe ser positivo" }),
});

// Schema principal para productos
export const productSchema = z.object({
  name: z.string().min(3, {
    message:
      "El nombre del producto debe tener por lo menos 3 caracteres/letras",
  }),
  description: z.string().min(3, {
    message:
      "La descripcion del producto debe tener por lo menos 3 caracteres/letras",
  }),
  price: z
    .number()
    .positive({ message: "El precio del producto debe ser positivo" }),
  discountPercentage: z
    .number()
    .min(0, { message: "El descuento debe ser positivo" })
    .max(1, { message: "El descuento debe ser mayor a 0 y menor a 1" })
    .nullable(),
  cashPrice: z
    .number()
    .positive({
      message: "El precio en efectivo del producto debe ser positivo",
    })
    .nullable(),
  cashDiscountPercentage: z
    .number()
    .min(0, { message: "El descuento en efectivo debe ser positivo" })
    .max(1, {
      message: "El descuento en efectivo debe ser mayor a 0 y menor a 1",
    })
    .nullable(),
  stock: z
    .number()
    .int()
    .min(0, { message: "El stock debe ser mayor o igual a 0" })
    .nullable(),
  sizes: z.array(sizeSchema),
  installments: z.array(installmentSchema).nullable(),
  currentSize: z.string().nullable().nullable(),
  freeShippingThreshold: z.number().positive().nullable().nullable(),
  isFreeShipping: z.boolean(),
  isFeatured: z.boolean(),
  isPromotion: z.boolean(),
  isNew: z.boolean(),
  categoryId: z.string().min(1, { message: "La categoría es requerida" }),
  images: z
    .array(z.string().url({ message: "La URL de la imagen no es válida" }))
    .nullable(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const defaultValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  discountPercentage: null,
  cashPrice: null,
  cashDiscountPercentage: null,
  stock: 1,
  sizes: [],
  installments: [],
  currentSize: null,
  freeShippingThreshold: null,
  isFreeShipping: false,
  isFeatured: false,
  isPromotion: false,
  isNew: false,
  categoryId: "",
  images: [],
};
