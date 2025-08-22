import { useDataTablePagination } from "@/hooks/GenericTABLE/useDataTablePagination";
import { useProductsSuspense } from "@/hooks/Products/useProducts";
import { useMemo } from "react";
import { buildProductColumns } from "./columns";
import { Product } from "@/types/product";
import DataTable from "@/components/PrivateItemPage/DataTable/BodyTable/data-table";

export interface DataTableBasicProps<T> {
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  search: string;
  pageSizeProp?: number;
}

interface DataTableProductsProps extends DataTableBasicProps<Product> {
  categoryFilter: string;
  featuredFilter: string;
  promotionFilter: string;
  newFilter: string;
}

function DataTableProducts({
  onEdit,
  onDelete,
  search,
  categoryFilter,
  featuredFilter,
  promotionFilter,
  newFilter,
  pageSizeProp,
}: DataTableProductsProps) {
  const {
    pageIndex,
    setPageIndex,
    pageSize,
    sorting,
    setSorting,
    sortBy,
    sortDir,
  } = useDataTablePagination({ pageSize: pageSizeProp ? pageSizeProp : 10 });

  // 🔹 Datos traidos con react-query.
  const { data } = useProductsSuspense({
    page: pageIndex + 1,
    limit: pageSize,
    search,
    category: categoryFilter || undefined,
    featured:
      featuredFilter === "true"
        ? true
        : featuredFilter === "false"
        ? false
        : undefined,
    promotion:
      promotionFilter === "true"
        ? true
        : promotionFilter === "false"
        ? false
        : undefined,
    new:
      newFilter === "true" ? true : newFilter === "false" ? false : undefined,
    sortBy,
    sortDir,
  });

  // 🔹 Columnas de la tabla
  const productColumns = useMemo(
    () => buildProductColumns(onEdit, onDelete),
    [onDelete, onEdit]
  );
  return (
    <DataTable<Product>
      itemPlural="productos"
      columns={productColumns}
      data={data.data || []}
      total={data.total || 0}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      sorting={sorting}
      onSortingChange={setSorting}
      totalPages={data.totalPages || 0}
      hasNextPage={data.hasNextPage}
      hasPreviousPage={data.hasPreviousPage}
    />
  );
}
export default DataTableProducts;
