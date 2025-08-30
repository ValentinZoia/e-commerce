import {
  OrderFormValues,
  orderSchema,
  defaultValues,
} from "@/lib/zod-schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, WhatsAppStatusNames } from "@/types/order";
import { useForm } from "react-hook-form";
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
import { SubmitBtn } from "@/pages/Login/_components";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

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
  const [cuotas, setCuotas] = useState<
    { quantity: number | null; amount: number | null }[]
  >(order?.installments || []);

  const [newCuota, setNewCuota] = useState<{
    quantity: number | null;
    amount: number | null;
  }>({ quantity: null, amount: null });
  function addCuota() {
    if (newCuota.quantity && newCuota.amount) {
      setCuotas([...cuotas, newCuota]);
      setNewCuota({ quantity: null, amount: null });
    }
  }
  function removeCuota(index: number) {
    setCuotas(cuotas.filter((_, i) => i !== index));
  }

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: order || defaultValues,
  });

  const onSubmit = () => {
    onSave({ ...form.getValues(), installments: cuotas[0] ? cuotas : [] });
  };
  const removeProduct = (index: number) => {
    const updated = [...form.getValues("products")];
    updated.splice(index, 1);
    form.setValue("products", updated, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          {/* Campos de cliente */}
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+54 9 11 1234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="cliente@email.com"
                      value={field.value ? field.value : ""}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      ref={field.ref}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Notas y mensaje de WhatsApp */}
          <FormField
            control={form.control}
            name="customerNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas del Cliente</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Detalles adicionales..."
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    ref={field.ref}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsappMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje de WhatsApp</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mensaje enviado al cliente..."
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    disabled={field.disabled}
                    ref={field.ref}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Estado de WhatsApp */}
            <FormField
              control={form.control}
              name="whatsappStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado de Mensaje</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(WhatsAppStatusNames).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Método de pago */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pago</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Transferencia, Efectivo..."
                      value={field.value ? field.value : ""}
                      onChange={field.onChange}
                      disabled={field.disabled}
                      ref={field.ref}
                      onBlur={field.onBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Costos */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="subtotal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtotal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costo de Envío</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.value ? field.value : ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={field.disabled}
                      ref={field.ref}
                      onBlur={field.onBlur}
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
                  <FormLabel>Descuento en Efectivo(%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={field.value ? field.value * 100 : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) / 100 : null
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
                      onCheckedChange={(checked) => field.onChange(!!checked)}
                    />
                  </FormControl>
                  <FormLabel>Envío Gratis</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Cuotas */}
          <div className="space-y-2">
            <FormLabel>Cuotas</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Meses"
                value={newCuota.quantity ? newCuota.quantity : ""}
                onChange={(e) =>
                  setNewCuota({ ...newCuota, quantity: Number(e.target.value) })
                }
              />
              <Input
                type="number"
                placeholder="Cantidad en Pesos"
                value={newCuota.amount ? newCuota.amount : ""}
                onChange={(e) =>
                  setNewCuota({
                    ...newCuota,
                    amount: Number(e.target.value) || 0,
                  })
                }
              />
              <Button type="button" onClick={addCuota}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {cuotas.map((size, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted p-2 rounded"
              >
                <span>
                  Meses: {size.quantity} - Cantidad: {size.amount}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeCuota(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
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
                  <Badge variant="outline">{product.productName}</Badge>
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

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <SubmitBtn isLoading={isLoading} name={order ? "Guardar" : "Crear"} />
        </DialogFooter>
      </form>
    </Form>
  );
}
export default OrdersDialogForm;
