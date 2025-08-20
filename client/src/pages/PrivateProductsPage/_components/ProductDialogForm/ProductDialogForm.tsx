import {
  productSchema,
  defaultValues,
  ProductFormValues,
} from "@/lib/zod-schemas/productSchema";
import { Product } from "@/types";
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
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Suspense, useState } from "react";

import { SubmitBtn } from "@/pages/Login/_components";
import CategorySelect from "../CategorySelect/CategorySelect";
import LoaderPage from "@/components/LoaderPage/LoaderPage";

interface ProductDialogFormProps {
  item: Product | null;
  onSave: (product: ProductFormValues) => void;
  onClose: () => void;
  isLoading: boolean;
}

function ProductDialogForm({
  item: product,
  onSave,
  onClose,
  isLoading,
}: ProductDialogFormProps) {
  const [sizes, setSizes] = useState<{ name: string; stock: number }[]>(
    product?.sizes || []
  );
  const [newSize, setNewSize] = useState({ name: "", stock: 0 });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product || defaultValues,
  });

  function addSize() {
    if (newSize.name) {
      setSizes([...sizes, newSize]);
      setNewSize({ name: "", stock: 0 });
    }
  }

  function removeSize(index: number) {
    setSizes(sizes.filter((_, i) => i !== index));
  }
  const onSubmit = () => {
    onSave({
      ...form.getValues(),
      sizes,
    });
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

          {/* Descripción */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">Descripción *</FormLabel>
                <FormControl>
                  <Textarea {...field} className="col-span-3" />
                </FormControl>
                <FormMessage className="col-span-4 col-start-2" />
              </FormItem>
            )}
          />

          {/* Categoría */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="categoryId" className="text-right">
                  Categoría *
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3" id="categoryId">
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>

                    <Suspense fallback={<LoaderPage />}>
                      <CategorySelect />
                    </Suspense>
                  </Select>
                </FormControl>
                <FormMessage className="col-span-4 col-start-2" />
              </FormItem>
            )}
          />

          {/* Precio y efectivo */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cashPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio Efectivo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      value={field.value ? field.value : ""}
                      onChange={(e) =>
                        field.onChange(
                          (e.target.value as string)
                            ? (Number(e.target.value) as number)
                            : 0
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Descuento y stock */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descuento (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={field.value ? field.value * 100 : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) / 100 : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      value={field.value ? field.value : ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Talles */}
          <div className="space-y-2">
            <FormLabel>Talles/Variantes</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Nombre del talle"
                value={newSize.name}
                onChange={(e) =>
                  setNewSize({ ...newSize, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Stock"
                value={newSize.stock}
                onChange={(e) =>
                  setNewSize({ ...newSize, stock: Number(e.target.value) || 0 })
                }
              />
              <Button type="button" onClick={addSize}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-muted p-2 rounded"
              >
                <span>
                  {size.name} - Stock: {size.stock}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSize(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Características */}
          <div className="grid grid-cols-2 gap-4">
            {["isFeatured", "isNew", "isPromotion", "isFreeShipping"].map(
              (name, i) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as any}
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                      </FormControl>
                      <FormLabel htmlFor={name}>
                        {i === 0
                          ? "Producto Destacado"
                          : i === 1
                          ? "Producto Nuevo"
                          : i === 2
                          ? "En Promoción"
                          : "Envío Gratis"}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              )
            )}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <SubmitBtn
            isLoading={isLoading}
            name={product ? "Guardar" : "Crear"}
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
export default ProductDialogForm;
