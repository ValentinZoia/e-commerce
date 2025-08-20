// components/MobileFilters.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface MobileFiltersProps {
  activeFiltersCount: number;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const MobileFilters = ({
  activeFiltersCount,
  isOpen,
  onOpenChange,
  children,
}: MobileFiltersProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Refina tu búsqueda de productos</SheetDescription>
        </SheetHeader>
        <div className="mt-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
};
