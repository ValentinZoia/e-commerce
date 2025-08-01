import { z } from "zod";
import { ValidationError } from "../../../shared/domain/errors";
//Schema para los talles - sizes
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
    .optional()
    .default(0),
  cashPrice: z
    .number()
    .positive({
      message: "El precio en efectivo del producto debe ser positivo",
    })
    .optional()
    .nullable()
    .default(null),
  cashDiscountPercentage: z
    .number()
    .min(0, { message: "El descuento en efectivo debe ser positivo" })
    .max(1, {
      message: "El descuento en efectivo debe ser mayor a 0 y menor a 1",
    })
    .optional()
    .default(0),
  stock: z
    .number()
    .int()
    .min(0, { message: "El stock debe ser mayor o igual a 0" })
    .optional()
    .default(1),
  sizes: z.array(sizeSchema).default([]),
  installments: z.array(installmentSchema).optional().default([]),
  currentSize: z.string().optional().nullable().default(null),
  freeShippingThreshold: z
    .number()
    .positive()
    .optional()
    .nullable()
    .default(null),
  isFreeShipping: z.boolean().default(false),
  isFeatured: z.boolean().optional().default(false),
  isPromotion: z.boolean().optional().default(false),
  isNew: z.boolean().optional().default(false),
  categoryId: z.string().min(1, { message: "La categoría es requerida" }),
  images: z
    .array(z.string().url({ message: "La URL de la imagen no es válida" }))
    .optional()
    .default([]),
});

export type ProductCreateDTO = z.infer<typeof productSchema>;

export class CreateProductDto {
  private constructor(
    public name: string,
    public description: string,
    public price: number,
    public discountPercentage: number,
    public cashPrice: number | null,
    public cashDiscountPercentage: number,
    public stock: number,
    public sizes: { name: string; stock: number }[],
    public installments: { quantity: number; amount: number }[],
    public currentSize: string | null,
    public freeShippingThreshold: number | null,
    public isFreeShipping: boolean,
    public isFeatured: boolean,
    public isPromotion: boolean,
    public isNew: boolean,
    public categoryId: string,
    public images: string[]
  ) {}

  static create(data: unknown): CreateProductDto {
    const parsedData: ProductCreateDTO = productSchema.parse(data);
    const {
      name,
      description,
      price,
      discountPercentage,
      cashPrice,
      cashDiscountPercentage,
      stock,
      sizes,
      installments,
      currentSize,
      freeShippingThreshold,
      isFreeShipping,
      isFeatured,
      isPromotion,
      isNew,
      categoryId,
      images,
    } = parsedData;

    //--------Validaciones de negocio----------

    if (cashPrice && !cashDiscountPercentage) {
      parsedData.cashDiscountPercentage = -(cashPrice / price) + 1;
    }

    if (
      cashDiscountPercentage > 0 &&
      cashPrice &&
      cashPrice !== price * (1 - cashDiscountPercentage)
    ) {
      throw new ValidationError({
        cashPrice: [
          "Si existe descuento en efectivo, El precio en efectivo debe ser menor al precio normal e igual al precio normal * (1 - descuento en efectivo)",
        ],
      });
    }

    if (sizes.length > 0) {
      //validar coherencia de stock
      let totalSizesStock = 0;
      sizes.forEach((size) => {
        totalSizesStock += size.stock;
      });

      if (sizes.length > 0 && totalSizesStock !== stock) {
        throw new ValidationError({
          stock: [
            "El stock total debe coincidir con la suma del stock de cada talle",
          ],
        });
      }

      //Si currentSize está definido, debe existir entre los sizes
      if (currentSize) {
        const sizeExists = sizes.some((size) => size.name == currentSize);
        if (!sizeExists) {
          throw new ValidationError({
            currentSize: ["El size actual debe existir en la lista de sizes"],
          });
        }
      }
    }

    return new CreateProductDto(
      name,
      description,
      price,
      discountPercentage,
      cashPrice,
      cashDiscountPercentage,
      stock,
      sizes,
      installments,
      currentSize,
      freeShippingThreshold,
      isFreeShipping,
      isFeatured,
      isPromotion,
      isNew,
      categoryId,
      images
    );
  }
}
