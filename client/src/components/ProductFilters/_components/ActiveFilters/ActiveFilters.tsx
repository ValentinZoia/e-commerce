// components/ActiveFilters.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Filters } from "@/types/filters";

interface ActiveFiltersProps {
  filters: Filters;
  onRemoveFilter: (filterKey: keyof Filters) => void;
  onClearAll: () => void;
  activeFiltersCount: number;
}

function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
  activeFiltersCount,
}: ActiveFiltersProps) {
  const sortLabels: { [key: string]: string } = {
    "price-asc": "Precio: menor a mayor",
    "price-desc": "Precio: mayor a menor",
    newest: "Más nuevos",
    "best-discount": "Mejor descuento",
  };
  const getFilterDisplayName = (key: keyof Filters, value: any) => {
    switch (key) {
      case "searchQuery":
        return `Búsqueda: "${value}"`;
      case "category":
        return `Categoría: ${value}`;
      case "minPrice":
      case "maxPrice":
        if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
          return `Precio: $${filters.minPrice || 0} - $${
            filters.maxPrice || "∞"
          }`;
        }
        return "";
      case "size":
        return `Talla: ${value}`;
      case "sortBy":
        return `Orden: ${sortLabels[value] || value}`;
      case "inStock":
        return "Solo disponibles";
      case "isFeatured":
        return "Destacados";
      case "isPromotion":
        return "En promoción";
      case "isNew":
        return "Nuevos";
      case "freeShipping":
        return "Envío gratis";
      default:
        return "";
    }
  };

  if (activeFiltersCount === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(filters).map(([key, value]) => {
        if (!value || value === "all" || value === "default") return null;
        if (key === "minPrice" && filters.maxPrice !== undefined) return null; // Show price range once

        const displayName = getFilterDisplayName(key as keyof Filters, value);
        if (!displayName) return null;

        return (
          <Badge key={key} variant="secondary" className="gap-1">
            {displayName}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => onRemoveFilter(key as keyof Filters)}
            />
          </Badge>
        );
      })}
      {activeFiltersCount > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="h-6 px-2 text-xs"
        >
          Limpiar todo
        </Button>
      )}
    </div>
  );
}

export default ActiveFilters;
