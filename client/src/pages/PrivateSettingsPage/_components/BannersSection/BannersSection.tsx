import { Control, FieldArrayWithId } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Plus } from "lucide-react";
import { BannerFormItem } from "../BannerFormItem";
import { StoreCustomerFormValues } from "@/lib/zod-schemas/storeCustomerSchema";

interface BannersSectionProps {
  control: Control<StoreCustomerFormValues>;
  fields: FieldArrayWithId<StoreCustomerFormValues, "banners", "id">[];
  onAddBanner: () => void;
  onRemoveBanner: (index: number) => void;
  onBannerImageSelect: (index: number, file: File) => void;
  getBannerImageUrl: (index: number) => string;
}
function BannersSection({
  control,
  fields,
  onAddBanner,
  onRemoveBanner,
  onBannerImageSelect,
  getBannerImageUrl,
}: BannersSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Banners del Carousel</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddBanner}
          disabled={fields.length >= 3}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Banner ({fields.length}/3)
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {fields.map((field, index) => (
            <BannerFormItem
              key={field.id}
              control={control}
              index={index}
              imageUrl={getBannerImageUrl(index)}
              onImageSelect={(file) => onBannerImageSelect(index, file)}
              onRemove={() => onRemoveBanner(index)}
            />
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No hay banners agregados</p>
              <p className="text-sm">
                Haz clic en "Agregar Banner" para comenzar
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export default BannersSection;
