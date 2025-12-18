import { Control } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Banknote, CreditCard, Landmark } from "lucide-react";

// Payment method data
const PAYMENT_METHODS = [
    { id: "efectivo", label: "Efectivo", icon: Banknote },
    { id: "mercadopago", label: "MercadoPago", icon: CreditCard },
    { id: "transferencia", label: "Transferencia", icon: Landmark },
];

// Payment method selector component
interface PaymentMethodSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
    const handleSelect = (methodId: string) => {
        onChange(value === methodId ? "" : methodId);
    };

    return (
        <div className="flex gap-2 mt-2">
            {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon;
                const isSelected = value === method.id;

                return (
                    <div
                        key={method.id}
                        className={cn(
                            "flex items-center justify-start gap-3 rounded-lg border px-4 py-2 text-left transition-all cursor-pointer",
                            isSelected
                                ? "border-primary bg-primary/10"
                                : "border-muted hover:bg-muted/30"
                        )}
                        onClick={() => handleSelect(method.id)}
                    >
                        <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleSelect(method.id)}
                        />
                        <Icon className="size-5" />
                        <span className="font-medium">{method.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

// Main component
export const PaymentMethodField = ({ control }: { control: Control<any> }) => {
    return (
        <FormField
            control={control}
            name="paymentMethod"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Método de Pago</FormLabel>
                    <FormControl>
                        <PaymentMethodSelector
                            value={field.value || ""}
                            onChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};