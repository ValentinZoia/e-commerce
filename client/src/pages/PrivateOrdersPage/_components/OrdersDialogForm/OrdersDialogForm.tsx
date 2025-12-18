import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";
import { Order, WhatsAppStatusNames } from "@/types/order";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useOrderForm } from "@/hooks/Shared/Form/useOrderForm";
import InstallmentsManager from "@/components/ProductForm/InstallmentsManager";
import {
    FormFieldInput,
    FormFieldSelect,
    FormFieldTextarea,
} from "@/components/ui/form-field";
import DialogFooterButtons from "@/components/DialogFooterButtons/DialogFooterButtons";

interface OrderDialogFormProps {
    item: Order | null;
    onSave: (order: OrderFormValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

function OrdersDialogForm({
    item: order,
    onSave,
    onClose,
    isLoading,
}: OrderDialogFormProps) {
    const { form, installments, removeProduct } = useOrderForm(
        order ? order : undefined,
    );

    const onSubmit = () => {
        onSave({
            ...form.getValues(),
            installments: installments.installments[0]
                ? installments.installments
                : [],
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    {/* Campos de cliente */}
                    <div className="grid grid-cols-3 gap-4">
                        <FormFieldInput
                            control={form.control}
                            nameField={"customerName"}
                            label={"Nombre del Cliente"}
                            placeholder="Juan Pérez"
                        />
                        <FormFieldInput
                            control={form.control}
                            nameField={"customerPhone"}
                            label={"Teléfono"}
                            placeholder="+54 9 11 1234 5678"
                        />
                        <FormFieldInput
                            control={form.control}
                            nameField={"customerEmail"}
                            label={"Email"}
                            placeholder="cliente@example.com"
                        />
                    </div>

                    {/* Notas y mensaje de WhatsApp */}
                    <FormFieldTextarea
                        control={form.control}
                        nameField={"customerNotes"}
                        label={"Notas del Cliente"}
                        placeholder="Detalles adicionales..."
                    />
                    <FormFieldTextarea
                        control={form.control}
                        nameField={"whatsappMessage"}
                        label={"Mensaje de WhatsApp"}
                        placeholder="Mensaje a enviar..."
                    />

                    <div className="grid grid-cols-2 gap-4">
                        {/* Estado de WhatsApp */}
                        <FormFieldSelect
                            control={form.control}
                            nameField={"whatsappStatus"}
                            label={"Estado de Mensaje"}
                            placeholder="Seleccionar estado"
                            selectValues={Object.values(WhatsAppStatusNames)}
                        />

                        {/* Método de pago */}
                        <FormFieldInput
                            control={form.control}
                            nameField={"paymentMethod"}
                            label={"Método de Pago"}
                            placeholder="Ej: Transferencia, Efectivo..."
                        />
                    </div>

                    {/* Costos */}
                    <div className="grid grid-cols-2 gap-4">
                        <FormFieldInput
                            control={form.control}
                            nameField={"subtotal"}
                            label={"Subtotal"}
                            type="number"
                        />
                        <FormFieldInput
                            control={form.control}
                            nameField={"total"}
                            label={"Total"}
                            type="number"
                        />

                        <FormFieldInput
                            control={form.control}
                            nameField={"shippingCost"}
                            label={"Costo de Envío"}
                            type="number"
                            step="0.01"
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
                        {/* Envío gratis */}
                        <FormField
                            control={form.control}
                            name="isFreeShipping"
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
                                    <FormLabel>Envío Gratis</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Cuotas */}
                    <InstallmentsManager {...installments} />
                    {/* Lista de productos con opción de eliminar */}
                    <div>
                        <FormLabel>Productos</FormLabel>
                        <div className="space-y-2 mt-2">
                            {form.watch("products").length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    No hay productos en esta orden.
                                </p>
                            )}
                            {form.watch("products").map((product, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-2 border rounded-md"
                                >
                                    <Badge variant="outline">
                                        {product.productName}
                                    </Badge>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeProduct(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooterButtons
                    onClose={onClose}
                    name={order ? "Guardar" : "Crear"}
                    isLoading={isLoading || form.formState.isSubmitting}
                />
            </form>
        </Form>
    );
}
export default OrdersDialogForm;
