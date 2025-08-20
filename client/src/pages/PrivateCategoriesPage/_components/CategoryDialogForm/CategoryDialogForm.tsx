import {
  CategoryFormValues,
  categorySchema,
  defaultValues,
} from "@/lib/zod-schemas/categorySchema";
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitBtn } from "@/pages/Login/_components";

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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Nombre *</FormLabel>
                <FormControl>
                  <Input {...field} className="col-span-3" />
                </FormControl>
                <FormMessage className="col-span-4 col-start-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Slug *</FormLabel>
                <FormControl>
                  <Input {...field} className="col-span-3" />
                </FormControl>
                <FormMessage className="col-span-4 col-start-2" />
              </FormItem>
            )}
          />

          {/* Descripción */}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Descripción *</FormLabel>
                <FormControl>
                  <Textarea
                    name="description"
                    value={field.value ? field.value : ""}
                    onChange={field.onChange}
                    className="col-span-3"
                  />
                </FormControl>
                <FormMessage className="col-span-4 col-start-2" />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <SubmitBtn
            isLoading={isLoading}
            name={category ? "Guardar" : "Crear"}
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
export default CategoryDialogForm;
