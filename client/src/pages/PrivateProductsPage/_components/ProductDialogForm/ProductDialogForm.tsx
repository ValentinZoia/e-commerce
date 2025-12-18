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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Suspense } from "react";
import CategorySelect from "../CategorySelect/CategorySelect";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { useProductForm } from "@/hooks/Shared/Form/useProductForm";
import SizesManager from "@/components/ProductForm/SizesManager";
import InstallmentsManager from "@/components/ProductForm/InstallmentsManager";
import ImageUploadSection from "@/components/ProductForm/ImageUploadSection";
import DialogFooterButtons from "@/components/DialogFooterButtons/DialogFooterButtons";
import {
    FormFieldInput,
    FormFieldSelect,
    FormFieldTextarea,
} from "@/components/ui/form-field";

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
                    <FormFieldInput
                        control={form.control}
                        nameField="name"
                        label="Nombre *"
                    />

                    {/* Descripción */}
                    <FormFieldTextarea
                        control={form.control}
                        nameField="description"
                        label="Descripción *"
                    />

                    {/* Categoría */}
                    <FormFieldSelect
                        control={form.control}
                        nameField={"categoryId"}
                        label="Categoría *"
                        placeholder="Selecciona categoria"
                        selectComponent={
                            <Suspense fallback={<LoaderPage />}>
                                <CategorySelect />
                            </Suspense>
                        }
                    />

                    {/* Precio y descuento */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormFieldInput
                            control={form.control}
                            nameField="price"
                            label="Precio *"
                            type="number"
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
                        <FormFieldInput
                            control={form.control}
                            nameField="cashPrice"
                            label="Precio Efectivo"
                            type="number"
                            step={"1"}
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
                        <FormFieldInput
                            control={form.control}
                            nameField="stock"
                            label="Stock"
                            type="number"
                            min={"0"}
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
                <DialogFooterButtons
                    onClose={onClose}
                    name={product ? "Guardar" : "Crear"}
                    isLoading={
                        isLoading ||
                        form.formState.isSubmitting ||
                        images.isLoadingImages
                    }
                />
            </form>
        </Form>
    );
}
export default ProductDialogForm;
