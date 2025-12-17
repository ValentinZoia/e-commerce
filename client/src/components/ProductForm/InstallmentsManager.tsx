import { Installment } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { Button } from "../ui/button";
import { FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface InstallmentsManagerProps {
    installments: Installment[];
    addInstallment: () => void;
    removeInstallment: (index: number) => void;
    newInstallment: Installment;
    setNewInstallment: React.Dispatch<React.SetStateAction<Installment>>;
}

export default function InstallmentsManager({
    installments,
    addInstallment,
    newInstallment,
    removeInstallment,
    setNewInstallment,
}: InstallmentsManagerProps) {
    return (
        <div className="space-y-2">
            <FormLabel>Installments</FormLabel>
            <div className="flex gap-2">
                <Input
                    placeholder="Meses"
                    value={
                        newInstallment.quantity ? newInstallment.quantity : ""
                    }
                    onChange={(e) =>
                        setNewInstallment({
                            ...newInstallment,
                            quantity: Number(e.target.value),
                        })
                    }
                />
                <Input
                    type="number"
                    placeholder="Cantidad en Pesos"
                    value={newInstallment.amount ? newInstallment.amount : ""}
                    onChange={(e) =>
                        setNewInstallment({
                            ...newInstallment,
                            amount: Number(e.target.value) || 0,
                        })
                    }
                />
                <Button type="button" onClick={addInstallment}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            {installments.map((size, index) => (
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
                        onClick={() => removeInstallment(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
