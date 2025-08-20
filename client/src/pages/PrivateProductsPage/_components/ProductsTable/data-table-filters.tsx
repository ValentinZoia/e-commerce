import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductDataTableFiltersProps {
  featuredFilter: string;
  promotionFilter: string;
  newFilter: string;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      categoryFilter: string;
      featuredFilter: string;
      promotionFilter: string;
      newFilter: string;
    }>
  >;
}

function ProductDataTableFilters({
  featuredFilter,
  promotionFilter,
  newFilter,
  setFilters,
}: ProductDataTableFiltersProps) {
  return (
    <div className="w-full flex gap-2">
      <div className="space-y-2">
        <Label htmlFor="featured">Destacados</Label>

        <Select
          value={featuredFilter}
          onValueChange={(e) =>
            setFilters((prev) => ({ ...prev, featuredFilter: e }))
          }
        >
          <SelectTrigger className="w-[140px]" id="featured">
            <SelectValue placeholder="Destacados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Destacados</SelectItem>
            <SelectItem value="false">No destacados</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="promotion">Promociones</Label>
        <Select
          value={promotionFilter}
          onValueChange={(e) =>
            setFilters((prev) => ({ ...prev, promotionFilter: e }))
          }
        >
          <SelectTrigger className="w-[140px]" id="promotion">
            <SelectValue placeholder="Promociones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">En promoción</SelectItem>
            <SelectItem value="false">Sin promoción</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new">Nuevos</Label>
        <Select
          value={newFilter}
          onValueChange={(e) =>
            setFilters((prev) => ({ ...prev, newFilter: e }))
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Nuevos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Nuevos</SelectItem>
            <SelectItem value="false">No nuevos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
export default ProductDataTableFilters;
