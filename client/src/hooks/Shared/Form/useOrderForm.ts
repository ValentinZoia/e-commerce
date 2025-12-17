import { Order } from "@/types";
import { useInstallments } from "./useInstallments";
import { useForm } from "react-hook-form";
import {
    OrderFormValues,
    defaultValues,
    orderSchema,
} from "@/lib/zod-schemas/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useOrderForm = (order?: Order) => {
    const {
        installments,
        addInstallment,
        newInstallment,
        removeInstallment,
        setNewInstallment,
    } = useInstallments(order?.installments || []);

    const form = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: order || defaultValues,
    });

    const removeProduct = (index: number) => {
        const updated = [...form.getValues("products")];
        updated.splice(index, 1);
        form.setValue("products", updated, { shouldValidate: true });
    };

    return {
        form,
        installments: {
            installments,
            addInstallment,
            newInstallment,
            removeInstallment,
            setNewInstallment,
        },
        removeProduct,
    };
};
