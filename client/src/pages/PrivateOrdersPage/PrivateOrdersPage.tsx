import { PrivateItemPage } from "@/components/PrivateItemPage/PrivateItemPage";
import { Order, WhatsAppStatusNames } from "@/types/order";
import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";
import { useOrderMutations } from "@/hooks/Orders/useOrderMutations";
import OrdersDataTableFilters from "./_components/OrdersTable/OrdersDataTableFilters";
import DataTableOrders from "./_components/OrdersTable/DataTableOrders";
import OrdersDialogForm from "./_components/OrdersDialogForm/OrdersDialogForm";
const PAGESIZE = import.meta.env.VITE_ORDER_TABLE_PAGESIZE;

function PrivateOrdersPage() {
  return (
    <PrivateItemPage<Order, OrderFormValues>
      titlePlural="órdenes"
      titleSingular="orden"
      useMutations={useOrderMutations}
      FiltersComponent={OrdersDataTableFilters}
      TableComponent={DataTableOrders}
      FormComponent={OrdersDialogForm}
      defaultFilters={{
        customerPhoneFilter: "",
        customerEmailFilter: "",
        customerNameFilter: "",
        statusFilter: "all" as WhatsAppStatusNames | string,
        productIdFilter: "",
      }}
      pageSizeProp={PAGESIZE}
    />
  );
}
export default PrivateOrdersPage;
