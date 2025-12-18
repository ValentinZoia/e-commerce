import {
    CategoryFormValues,
    categorySchema,
    defaultValues,
} from "@/lib/zod-schemas/categorySchema";
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import DialogFooterButtons from "@/components/DialogFooterButtons/DialogFooterButtons";
import { FormFieldInput, FormFieldTextarea } from "@/components/ui/form-field";

interface CategoryDialogFormProps {
    item: Category | null;
    onSave: (category: CategoryFormValues) => void;
    onClose: () => void;
    isLoading: boolean;
}

function CategoryDialogForm({
    item: category,
    onSave,
    onClose,
    isLoading,
}: CategoryDialogFormProps) {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: category || defaultValues,
    });

    const onSubmit = () => {
        onSave(form.getValues());
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    {/* Nombre */}
                    <FormFieldInput
                        control={form.control}
                        nameField={"name"}
                        label={"Nombre *"}
                    />
                    <FormFieldInput
                        control={form.control}
                        nameField={"slug"}
                        label={"Slug *"}
                    />

                    {/* Descripción */}
                    <FormFieldTextarea
                        control={form.control}
                        nameField={"description"}
                        label="Descripción *"
                    />
                </div>

                <DialogFooterButtons
                    onClose={onClose}
                    isLoading={isLoading}
                    name={category ? "Guardar" : "Crear"}
                />
            </form>
        </Form>
    );
}
export default CategoryDialogForm;
