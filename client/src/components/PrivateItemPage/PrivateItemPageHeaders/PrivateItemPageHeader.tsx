import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { capitalizeFirstLetter } from "@/utilities";
import { Plus, Search } from "lucide-react";
import ResetFiltersButton from "../DataTable/ResetFiltersButton/ResetFiltersButton";

interface PrivateItemPageHeaderProps {
  titlePlural: string;
  titleSingular: string;
  handleNewItem: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  resetFilters: () => void;
  isFetching?: boolean;
  children?: React.ReactNode;
}

function PrivateItemPageHeader({
  titlePlural,
  titleSingular,
  handleNewItem,
  search,
  onSearchChange,
  isFetching,
  resetFilters,
  children,
}: PrivateItemPageHeaderProps) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {capitalizeFirstLetter(titlePlural)}
          </h1>
          <p className="text-muted-foreground">
            Gestiona el inventario de {titlePlural} de tu tienda.
          </p>
        </div>
        <Button onClick={handleNewItem}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo {capitalizeFirstLetter(titleSingular)}
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col space-y-4 lg:flex-col lg:space-y-4 lg:space-x-4 w-full">
        {/* Búsqueda global */}
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Buscar ${titlePlural}...`}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {/* Filtros específicos */}
        <div className="flex flex-wrap gap-2 items-end space-x-2 ">
          {children}
          <ResetFiltersButton resetFilters={resetFilters} />
        </div>
        {isFetching ? (
          <span className="text-sm text-muted-foreground">Actualizando…</span>
        ) : null}
      </div>
    </>
  );
}
export default PrivateItemPageHeader;
