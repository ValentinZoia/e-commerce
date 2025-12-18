import { SubmitBtn } from "@/pages/Login/_components";
import { Form } from "@/components/ui/form";
import { CartItem } from "@/types";
import { CustomerInfoSection } from "@/components/CheckoutForm/CustomerInfoSection";
import { PaymentMethodField } from "@/components/CheckoutForm/PaymentMethodField";
import { useCheckoutForm } from "@/hooks/Shared/Form/useCheckoutForm";

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
    const { form, onSubmit } = useCheckoutForm({
        items,
        subtotal,
        total,
        shippingCost,
        isFreeShipping,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    {/* Campos de cliente */}
                    <CustomerInfoSection control={form.control} />

                    <PaymentMethodField control={form.control} />

                    {/* Costos */}
                </div>

                <SubmitBtn isLoading={false} name={"Enviar"} />
            </form>
        </Form>
    );
}
export default CheckoutForm;
