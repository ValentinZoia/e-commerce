import { useState } from "react";
import { ProductStatus } from "@/types";
import { useProductsSuspense } from "@/hooks/Products/useProducts";
import { useProductsFilters } from "@/hooks/Products/useProductsFilters";
import { usePaginationProductsList } from "@/hooks/Products/usePaginationProductsList";

import { MobileFilters } from "../ProductFilters/_components/MobileFilters/MobileFilters";

import { ProductsGrid } from "./_components/ProductsGrid/ProductsGrid";
import { ProductsPagination } from "./_components/ProductsPagination/ProductsPagination";
import { ProductFilters } from "../ProductFilters";
import ActiveFilters from "../ProductFilters/_components/ActiveFilters/ActiveFilters";
import { useDebounce } from "@/hooks/Shared/useDebounce";

interface ProductListProps {
  productsStatus: ProductStatus;
  title: string;
  categoryId?: string;
  search?: string;
  itemsPerPage?: number;
}
function ProductsList({
  productsStatus,
  title,
  categoryId,
  search,
  itemsPerPage = 12,
}: ProductListProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Hook personalizado para manejar filtros
  const {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    queryParams,
    clearFilters,
    removeFilter,
    getActiveFiltersCount,
  } = useProductsFilters({ productsStatus, categoryId, search });

  // Fetch de productos con server-side filtering
  const { data } = useProductsSuspense({
    ...queryParams,
    search: useDebounce(queryParams.search, 700),
    priceMax: useDebounce(queryParams.priceMax, 700),
    priceMin: useDebounce(queryParams.priceMin, 700),
    page: currentPage,
    limit: itemsPerPage,
  });

  const {
    data: products,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = data;

  const { handlePageChange, visiblePages } = usePaginationProductsList({
    currentPage,
    totalPages,
    onPageChange: setCurrentPage,
  });

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className=" px-0 py-10 ">
      <div className="grid md:grid-cols-4">
        {/* Desktop Filters */}
        <div className="hidden md:block mr-4">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            products={products}
            productsStatus={productsStatus}
            categoryId={categoryId}
          />
        </div>

        <div className="col-span-3 ">
          {/* Header with mobile filters */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>

            <MobileFilters
              activeFiltersCount={activeFiltersCount}
              isOpen={isFiltersOpen}
              onOpenChange={setIsFiltersOpen}
            >
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                products={products}
                productsStatus={productsStatus}
                categoryId={categoryId}
              />
            </MobileFilters>
          </div>

          {/* Active Filters */}
          <ActiveFilters
            filters={filters}
            onRemoveFilter={removeFilter}
            onClearAll={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />

          {/* Products Grid */}
          <ProductsGrid
            products={products}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            total={total}
            activeFiltersCount={activeFiltersCount}
            onClearFilters={clearFilters}
          />

          {/* Pagination */}
          <ProductsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            visiblePages={visiblePages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
export default ProductsList;
