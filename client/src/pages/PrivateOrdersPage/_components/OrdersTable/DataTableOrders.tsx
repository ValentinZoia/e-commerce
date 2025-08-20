import DataTable from "@/components/PrivateItemPage/DataTable/BodyTable/data-table";
import { useOrdersSuspense } from "@/hooks/Orders/useOrders";
import { Order, WhatsAppStatus } from "@/types/order";
import { useMemo } from "react";
import { buildOrderColumns } from "./OrdersColumns";
import { useDataTablePagination } from "@/hooks/GenericTABLE/useDataTablePagination";

interface DataTableOrdersProps {
  customerEmailFilter: string;
  customerNameFilter: string;
  customerPhoneFilter: string;
  statusFilter: string;
  productIdFilter: string;
  onEdit: (item: Order) => void;
  onDelete: (item: Order) => void;
  search: string;
}

function DataTableOrders({
  customerEmailFilter,
  customerNameFilter,
  customerPhoneFilter,
  statusFilter,
  productIdFilter,
  onEdit,
  onDelete,
  search,
}: DataTableOrdersProps) {
  const {
    pageIndex,
    setPageIndex,
    pageSize,
    sorting,
    setSorting,
    sortBy,
    sortDir,
  } = useDataTablePagination({ pageSize: 10 });

  const { data } = useOrdersSuspense({
    page: pageIndex + 1,
    limit: pageSize,
    search,
    sortBy,
    sortDir,
    customerEmail: customerEmailFilter,
    customerName: customerNameFilter,
    customerPhone: customerPhoneFilter,
    status:
      statusFilter === "all" ? undefined : (statusFilter as WhatsAppStatus),
    productId: productIdFilter,
  });

  const orderColumns = useMemo(
    () => buildOrderColumns(onEdit, onDelete),
    [onDelete, onEdit]
  );
  return (
    <DataTable<Order>
      itemPlural="órdenes"
      columns={orderColumns}
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
export default DataTableOrders;
