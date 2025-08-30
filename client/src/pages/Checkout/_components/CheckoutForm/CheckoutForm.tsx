import { useForm } from "react-hook-form";
import {
  OrderFormValues,
  orderSchema,
  defaultValues,
} from "@/lib/zod-schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useLoaderData, useNavigate } from "react-router-dom";
import { useCheckoutSessionMutations } from "@/hooks/Checkout/useCheckoutMutations";
import { useCartActions } from "@/hooks/Cart/useCartActions";
import { Banknote, CreditCard, Landmark } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
// import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CheckoutFormProps {
  items: CartItem[];
  subtotal?: number;
  total?: number;
  shippingCost?: number;
  isFreeShipping?: boolean;
}
const cartItemToOrderItemMap = (item: CartItem) => ({
  productId: item.productId,
  productName: item.product?.name as string,
  quantity: item.quantity,
  size: item.size,
  unitPrice: item.product?.price as number,
  discount: 0,
  imageUrl: item.product?.images[0],
});
const paymentMethods = [
  { id: "efectivo", label: "Efectivo", icon: Banknote },
  { id: "mercadopago", label: "MercadoPago", icon: CreditCard },
  { id: "transferencia", label: "Transferencia", icon: Landmark },
];

function CheckoutForm({
  items,
  subtotal,
  total,
  shippingCost,
  isFreeShipping,
}: CheckoutFormProps) {
  const { createMutation } = useOrderMutations();
  const { doDeleteCheckoutSession } = useCheckoutSessionMutations();
  const navigate = useNavigate();
  const { token } = useLoaderData() as { token: string };

  const hasInstallments = items.some(
    (item) =>
      item.product?.installments && item.product?.installments.length > 0
  );

  const hasCashDiscount = items.some(
    (item) =>
      item.product?.cashDiscountPercentage &&
      item.product?.cashDiscountPercentage > 0
  );

  const products = items.map(cartItemToOrderItemMap);
  const { emptyCart } = useCartActions();

  const initialInstallments = hasInstallments
    ? items.flatMap((item) => item.product?.installments || []).filter(Boolean) // elimina null/undefined
    : [];

  const initialCashDiscount = hasCashDiscount
    ? items.find((item) => item.product?.cashDiscountPercentage)?.product
        ?.cashDiscountPercentage || null
    : null;
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...defaultValues,
      products: products,
      subtotal: subtotal ? subtotal : 0,
      total: total ? total : 0,
      shippingCost: shippingCost ? shippingCost : null,
      isFreeShipping: isFreeShipping ? isFreeShipping : false,
      installments: initialInstallments,
      cashDiscountPercentage: initialCashDiscount,
      isCashDiscount: false,
    },
  });

  const onSubmit = () => {
    console.log(form.getValues());
    console.log(form.formState.errors);
    createMutation.mutate(form.getValues(), {
      onSuccess: (res: DBResponseCommand<Order>) => {
        form.reset();
        emptyCart();
        doDeleteCheckoutSession.mutate(token);
        navigate(`/order/${res.data.id}`);
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };
  console.log(form.getValues());
  console.log(form.formState.errors);

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
                  <div className="flex  gap-2 mt-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const isSelected = field.value === method.id;

                      const handleClick = () => {
                        if (isSelected) {
                          field.onChange(""); // Deseleccionar si ya está seleccionado
                        } else {
                          field.onChange(method.id);
                        }
                      };

                      return (
                        <div
                          key={method.id}
                          className={cn(
                            "flex items-center justify-start gap-3 rounded-lg border px-4 py-2 text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/10"
                              : "border-muted hover:bg-muted/30"
                          )}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => {
                              field.onChange(method.id);
                              handleClick();
                            }}
                          />
                          <Icon className="size-5" />
                          <span className="font-medium">{method.label}</span>
                        </div>
                      );
                    })}
                  </div>
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
