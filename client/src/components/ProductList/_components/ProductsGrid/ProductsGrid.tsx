import { ProductCard } from "@/components";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Lazy } from "@/components/Lazy";
import { SkeletonProductCard } from "@/components/Skeletons/SkeletonProductCard";

interface ProductsGridProps {
  products: Product[];
  currentPage: number;
  itemsPerPage: number;
  total: number;
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export const ProductsGrid = ({
  products,
  currentPage,
  itemsPerPage,
  total,
  activeFiltersCount,
  onClearFilters,
}: ProductsGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">
          No se encontraron productos con los filtros aplicados.
        </p>
        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={onClearFilters}>
            Limpiar filtros
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          Mostrando {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, total)} de {total} productos
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {products.map((product) => (
          <Lazy
            key={product.id}
            placeholder={<SkeletonProductCard />} /* ajustá a tu card */
          >
            <ProductCard product={product} />
          </Lazy>
        ))}
      </div>
    </>
  );
};
