import { Installment } from "@/types";
import { useState } from "react";

export const useInstallments = (initialInstallments: Installment[] = []) => {
    const [installments, setInstallments] =
        useState<Installment[]>(initialInstallments);
    const [newInstallment, setNewInstallment] = useState<Installment>({
        amount: null,
        quantity: null,
    });

    function addInstallment() {
        if (newInstallment.quantity && newInstallment.amount) {
            setInstallments([...installments, newInstallment]);
            setNewInstallment({ quantity: 0, amount: 0 });
        }
    }
    function removeInstallment(index: number) {
        setInstallments(installments.filter((_, i) => i !== index));
    }

    return {
        installments,
        addInstallment,
        removeInstallment,
        newInstallment,
        setNewInstallment,
    };
};
