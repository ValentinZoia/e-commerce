import DataTable from "@/components/PrivateItemPage/DataTable/BodyTable/data-table";
import { Category } from "@/types/category";
import { useMemo } from "react";
import { buildCategoryColumns } from "./CategoriesColumns";
import { useCategoriesSuspense } from "@/hooks/Categories/useCategories";
import { useDataTablePagination } from "@/hooks/GenericTABLE/useDataTablePagination";

interface DataTableCategoriesProps {
  search: string;
  onEdit: (item: Category) => void;
  onDelete: (item: Category) => void;
}

function DataTableCategories({
  search,
  onEdit,
  onDelete,
}: DataTableCategoriesProps) {
  const {
    pageIndex,
    setPageIndex,
    pageSize,
    sorting,
    setSorting,
    sortBy,
    sortDir,
  } = useDataTablePagination({ pageSize: 10 });

  const { data } = useCategoriesSuspense({
    page: pageIndex + 1,
    limit: pageSize,
    search,
    sortBy,
    sortDir,
  });
  const categoryColumns = useMemo(
    () => buildCategoryColumns(onEdit, onDelete),
    [onDelete, onEdit]
  );

  return (
    <DataTable<Category>
      itemPlural="categorias"
      columns={categoryColumns}
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
export default DataTableCategories;
