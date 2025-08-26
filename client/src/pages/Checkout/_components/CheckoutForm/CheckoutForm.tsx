import { useForm } from "react-hook-form";
import {
  OrderFormValues,
  orderSchema,
  defaultValues,
} from "@/lib/zod-schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
import { SubmitBtn } from "@/pages/Login/_components";
import {
  //   FormControl,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { CartItem, DBResponseCommand } from "@/types";
import { useOrderMutations } from "@/hooks/Orders/useOrderMutations";
import { Order } from "@/types/order";

// import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CheckoutFormProps {
  items: CartItem[];
  subtotal?: number;
  total?: number;
  shippingCost?: number;
  isFreeShipping?: boolean;
}

function CheckoutForm({
  items,
  subtotal,
  total,
  shippingCost,
  isFreeShipping,
}: CheckoutFormProps) {
  const { createMutation } = useOrderMutations();

  const productToCartItemMap = (item: CartItem) => ({
    productId: item.productId,
    productName: item.product?.name as string,
    quantity: item.quantity,
    size: item.size,
    unitPrice: item.product?.price as number,
    discount: 0,
    imageUrl: item.product?.images[0],
  });

  const products = items.map(productToCartItemMap);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...defaultValues,
      products: products,
      subtotal: subtotal ? subtotal : 0,
      total: total ? total : 0,
      shippingCost: shippingCost ? shippingCost : null,
      isFreeShipping: isFreeShipping ? isFreeShipping : false,
    },
  });
  const onSubmit = () => {
    createMutation.mutate(form.getValues(), {
      onSuccess: (res: DBResponseCommand<Order>) => {
        console.log(res.data);
        form.reset();
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          {/* Campos de cliente */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre y Apellido</FormLabel>
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

          <div className="grid grid-cols-2 gap-4">
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
        </div>

        <SubmitBtn isLoading={false} name={"Enviar"} />
      </form>
    </Form>
  );
}
export default CheckoutForm;
