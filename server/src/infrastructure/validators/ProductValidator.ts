import { z } from "zod";
import { IValidator } from "../../domain/Interfaces/IValidator";
import { Product } from "../../domain/entities/Product";
import { ValidationError } from "./ValidationError";
import { ICategoryRepository } from "../../domain/Interfaces/ICategoryRepository";

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
const productSchema = z.object({
  name: z.string().min(3, {
    message:
      "El nombre del producto debe tener por lo menos 3 caracteres/letras",
  }),
  description: z.string().nullable().optional(),
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
    .nullable()
    .optional(),
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
    .default(0),
  sizes: z.array(sizeSchema).optional().default([]),
  installments: z.array(installmentSchema).optional().default([]),
  currentSize: z.string().nullable().optional(),
  freeShippingThreshold: z.number().positive().nullable().optional(),
  isFreeShipping: z.boolean().optional().default(false),
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

export class ProductValidator implements IValidator<Product> {
  constructor(private categoryRepository: ICategoryRepository) {}

  async validate(data: unknown): Promise<Product> {
    try {
      //Primera validacion con zod
      
      const validatedData = productSchema.parse(data);

      //validar en caso de que se este pidiendo productos por categoria,
      //validar que exista esa categoria
      const category = await this.categoryRepository.getByName(
        validatedData.categoryId
      );
      if (!category) {
        throw new ValidationError({
          categoryId: ["La categoría especificada no existe"],
        });
      }

      //Validaciones de negocio
      if (
        validatedData.cashPrice &&
        validatedData.cashPrice >= validatedData.price
      ) {
        throw new ValidationError({
          cashPrice: [
            "El precio en efectivo debe ser menor al precio normal",
          ],
        });
      }

      //validar coherencia de stock
      let totalSizesStock = 0;
      validatedData.sizes.forEach((size) => {
        totalSizesStock += size.stock;
      });

      if (
        validatedData.sizes.length > 0 &&
        totalSizesStock !== validatedData.stock
      ) {
        throw new ValidationError({
          stock: [
            "El stock total debe coincidir con la suma del stock de cada talle",
          ],
        });
      }

      //Si currentSize está definido, debe existir entre los sizes
      if (validatedData.currentSize) {
        const sizeExists = validatedData.sizes.some(
          (size) => size.name == validatedData.currentSize
        );
        if (!sizeExists) {
          throw new ValidationError({
            currentSize: ["El size actual debe existir en la lista de sizes"],
          });
        }
      }

      return new Product(
        null, // este es el id, lo pone la db
        validatedData.name,
        validatedData.description,
        validatedData.price,
        validatedData.discountPercentage,
        validatedData.cashPrice,
        validatedData.cashDiscountPercentage,
        validatedData.stock,
        validatedData.sizes,
        validatedData.currentSize,
        validatedData.freeShippingThreshold,
        validatedData.isFreeShipping,
        validatedData.isFeatured,
        validatedData.isPromotion,
        validatedData.isNew,
        validatedData.categoryId,
        validatedData.installments,
        validatedData.images
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });

        throw new ValidationError(formattedErrors);
      }
      throw error;
    }
  }
}
