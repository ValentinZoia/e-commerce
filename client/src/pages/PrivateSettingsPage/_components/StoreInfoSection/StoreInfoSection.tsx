import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StoreCustomerFormValues } from "@/lib/zod-schemas/storeCustomerSchema";

interface StoreInfoSectionProps {
  control: Control<StoreCustomerFormValues>;
}

function StoreInfoSection({ control }: StoreInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Tienda</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="nameStore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Tienda</FormLabel>
              <FormControl>
                <Input placeholder="Mi tienda..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
export default StoreInfoSection;
