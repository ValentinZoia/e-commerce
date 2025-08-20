import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

function ResetFiltersButton({ resetFilters }: { resetFilters: () => void }) {
  return (
    <Button variant="outline" onClick={resetFilters}>
      <Filter className="mr-2 h-4 w-4" />
      Limpiar
    </Button>
  );
}
export default ResetFiltersButton;
