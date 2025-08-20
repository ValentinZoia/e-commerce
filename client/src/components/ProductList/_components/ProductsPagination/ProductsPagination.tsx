import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  visiblePages: (number | string)[];
  onPageChange: (page: number) => void;
}

export const ProductsPagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  visiblePages,
  onPageChange,
}: ProductsPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground sm:hidden">
        Página {currentPage} de {totalPages}
      </div>

      <Pagination className="mx-0">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPreviousPage}
              className="gap-1 pl-2.5"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:block">Anterior</span>
            </Button>
          </PaginationItem>

          {visiblePages.map((pageItem, index) => (
            <PaginationItem key={index}>
              {pageItem === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageItem as number);
                  }}
                  isActive={currentPage === pageItem}
                >
                  {pageItem}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="gap-1 pr-2.5"
            >
              <span className="hidden sm:block">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="hidden sm:block text-sm text-muted-foreground">
        Página {currentPage} de {totalPages}
      </div>
    </div>
  );
};
