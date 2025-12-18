import { Control } from "react-hook-form";
import { FormFieldInput } from "@/components/ui/form-field";

export const CustomerInfoSection = ({ control }: { control: Control<any> }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <FormFieldInput
                control={control}
                nameField="customerName"
                label="Nombre y Apellido"
                placeholder="Juan Pérez"
            />
            <FormFieldInput
                control={control}
                nameField="customerPhone"
                label="Teléfono"
                placeholder="1112345678"
            />
            <FormFieldInput
                control={control}
                nameField="customerEmail"
                label="Email"
                placeholder="cliente@email.com"
                type="email"
            />
        </div>
    );
};