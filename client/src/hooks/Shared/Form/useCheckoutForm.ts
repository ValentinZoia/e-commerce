import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
    OrderFormValues,
    orderSchema,
    defaultValues,
} from "@/lib/zod-schemas/orderSchema";
import { CartItem } from "@/types";
import { useOrderMutations } from "@/hooks/Orders/useOrderMutations";
import { useCheckoutSessionMutations } from "@/hooks/Checkout/useCheckoutMutations";
import { useCartActions } from "@/hooks/Cart/useCartActions";
import { DBResponseCommand } from "@/types";
import { Order } from "@/types/order";

export interface CheckoutFormProps {
    items: CartItem[];
    subtotal?: number;
    total?: number;
    shippingCost?: number;
    isFreeShipping?: boolean;
}

// Helper function - PURE function, no side effects
const mapCartItemToOrderItem = (item: CartItem) => ({
    productId: item.productId,
    productName: item.product?.name as string,
    quantity: item.quantity,
    size: item.size,
    unitPrice: item.product?.price as number,
    discount: 0,
    imageUrl: item.product?.images[0],
});

// Business logic functions - PURE functions
const calculateInitialInstallments = (items: CartItem[]) =>
    items.flatMap((item) => item.product?.installments || []).filter(Boolean);

const calculateInitialCashDiscount = (items: CartItem[]) =>
    items.find((item) => item.product?.cashDiscountPercentage)?.product
        ?.cashDiscountPercentage || null;

export const useCheckoutForm = ({
    items,
    subtotal,
    total,
    shippingCost,
    isFreeShipping,
}: CheckoutFormProps) => {
    // Hooks
    const { createItemMutation } = useOrderMutations();
    const { doDeleteCheckoutSession } = useCheckoutSessionMutations();
    const navigate = useNavigate();
    const { token } = useLoaderData() as { token: string };
    const { emptyCart } = useCartActions();

    // Business calculations
    const hasInstallments = items.some(
        (item) =>
            item.product?.installments && item.product.installments.length > 0,
    );

    const hasCashDiscount = items.some(
        (item) =>
            item.product?.cashDiscountPercentage &&
            item.product.cashDiscountPercentage > 0,
    );

    const products = items.map(mapCartItemToOrderItem);
    const initialInstallments = hasInstallments
        ? calculateInitialInstallments(items)
        : [];
    const initialCashDiscount = hasCashDiscount
        ? calculateInitialCashDiscount(items)
        : null;

    // Form setup
    const form = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            ...defaultValues,
            products,
            subtotal: subtotal ?? 0,
            total: total ?? 0,
            shippingCost: shippingCost ?? null,
            isFreeShipping: isFreeShipping ?? false,
            installments: initialInstallments,
            cashDiscountPercentage: initialCashDiscount,
            isCashDiscount: false,
        },
    });

    // Submit handler - contains business logic
    const onSubmit = () => {
        createItemMutation.mutate(form.getValues(), {
            onSuccess: (res: DBResponseCommand<Order>) => {
                form.reset();
                emptyCart();
                doDeleteCheckoutSession.mutate(token);
                navigate(`/order/${res.data.id}`);
            },
            onError: (error) => {
                console.error("Checkout error:", error);
            },
        });
    };

    return {
        form,
        onSubmit,
        isLoading: createItemMutation.isPending,
        hasInstallments,
        hasCashDiscount,
    };
};
