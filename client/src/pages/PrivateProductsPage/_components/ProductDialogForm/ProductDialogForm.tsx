import { ProductFormValues } from "@/lib/zod-schemas/productSchema";
import { Product } from "@/types";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Suspense } from "react";
import { SubmitBtn } from "@/pages/Login/_components";
import CategorySelect from "../CategorySelect/CategorySelect";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { useProductForm } from "@/hooks/Shared/Form/useProductForm";
import SizesManager from "@/components/ProductForm/SizesManager";
import InstallmentsManager from "@/components/ProductForm/InstallmentsManager";
import ImageUploadSection from "@/components/ProductForm/ImageUploadSection";

interface ProductDialogFormProps {
    item: Product | null;
    onSave: (product: ProductFormValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

function ProductDialogForm({
    item: product,
    onSave,
    onClose,
    isLoading,
}: ProductDialogFormProps) {
    const { form, sizes, installments, images, onSubmit } = useProductForm({
        product,
        onSave,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    {/* Nombre */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">
                                    Nombre *
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} className="col-span-3" />
                                </FormControl>
                                <FormMessage className="col-span-4 col-start-2" />
                            </FormItem>
                        )}
                    />

                    {/* Descripción */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel className="text-right">
                                    Descripción *
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="col-span-3"
                                    />
                                </FormControl>
                                <FormMessage className="col-span-4 col-start-2" />
                            </FormItem>
                        )}
                    />

                    {/* Categoría */}
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-4 items-center gap-4">
                                <FormLabel
                                    htmlFor="categoryId"
                                    className="text-right"
                                >
                                    Categoría *
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger
                                            className="col-span-3"
                                            id="categoryId"
                                        >
                                            <SelectValue placeholder="Selecciona categoría" />
                                        </SelectTrigger>

                                        <Suspense fallback={<LoaderPage />}>
                                            <CategorySelect />
                                        </Suspense>
                                    </Select>
                                </FormControl>
                                <FormMessage className="col-span-4 col-start-2" />
                            </FormItem>
                        )}
                    />

                    {/* Precio y descuento */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            {...field}
                                            value={
                                                field.value ? field.value : ""
                                            }
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountPercentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descuento (%)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="100"
                                            value={
                                                field.value
                                                    ? field.value * 100
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        ? Number(
                                                              e.target.value,
                                                          ) / 100
                                                        : null,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Precio en efectivo y descuento en efectivo */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="cashPrice"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio Efectivo</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="1"
                                            value={
                                                field.value ? field.value : ""
                                            }
                                            onChange={(e) =>
                                                field.onChange(
                                                    (e.target.value as string)
                                                        ? (Number(
                                                              e.target.value,
                                                          ) as number)
                                                        : 0,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cashDiscountPercentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Descuento en Efectivo(%)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="1"
                                            min="0"
                                            max="100"
                                            value={
                                                field.value
                                                    ? field.value * 100
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        ? Number(
                                                              e.target.value,
                                                          ) / 100
                                                        : null,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min="0"
                                            value={
                                                field.value ? field.value : ""
                                            }
                                            onChange={(e) =>
                                                field.onChange(
                                                    e.target.value
                                                        ? Number(e.target.value)
                                                        : null,
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Talles */}
                    <SizesManager {...sizes} />

                    {/* Cuotas */}
                    <InstallmentsManager {...installments} />

                    {/* Características */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            "isFeatured",
                            "isNew",
                            "isPromotion",
                            "isFreeShipping",
                        ].map((name, i) => (
                            <FormField
                                key={name}
                                control={form.control}
                                name={name as any}
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) =>
                                                    field.onChange(!!checked)
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor={name}>
                                            {i === 0
                                                ? "Producto Destacado"
                                                : i === 1
                                                  ? "Producto Nuevo"
                                                  : i === 2
                                                    ? "En Promoción"
                                                    : "Envío Gratis"}
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    {/* Imágenes (control local, subir en submit) */}
                    <ImageUploadSection {...images} />
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <SubmitBtn
                        isLoading={
                            isLoading ||
                            form.formState.isSubmitting ||
                            images.isLoadingImages
                        }
                        name={product ? "Guardar" : "Crear"}
                    />
                </DialogFooter>
            </form>
        </Form>
    );
}
export default ProductDialogForm;
