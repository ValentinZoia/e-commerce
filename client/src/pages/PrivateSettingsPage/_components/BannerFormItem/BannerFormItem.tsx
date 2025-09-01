import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadArea } from "@/components/ImageUploadArea";
import { X } from "lucide-react";
import { StoreCustomerFormValues } from "@/lib/zod-schemas/storeCustomerSchema";

interface BannerFormItemProps {
  control: Control<StoreCustomerFormValues>;
  index: number;
  imageUrl: string;
  onImageSelect: (file: File) => void;
  onRemove: () => void;
}

function BannerFormItem({
  control,
  index,
  imageUrl,
  onImageSelect,
  onRemove,
}: BannerFormItemProps) {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <h4 className="text-sm font-medium">Banner {index + 1}</h4>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Banner Image */}
        <div>
          <FormLabel>Imagen del Banner</FormLabel>
          <div className="mt-2">
            <ImageUploadArea
              imageUrl={imageUrl}
              onImageSelect={onImageSelect}
              placeholder="Seleccionar Imagen"
              type="banner"
            />
          </div>
        </div>

        {/* Banner Title */}
        <FormField
          control={control}
          name={`banners.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Título del banner..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Banner Description */}
        <FormField
          control={control}
          name={`banners.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción del banner..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Banner Redirect URL */}
        <FormField
          control={control}
          name={`banners.${index}.redirectUrl`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de Redirección (opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://..."
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
export default BannerFormItem;
