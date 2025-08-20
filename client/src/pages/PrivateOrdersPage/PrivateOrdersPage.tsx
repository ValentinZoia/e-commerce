import { PrivateItemPage } from "@/components/PrivateItemPage/PrivateItemPage";
import { Order, WhatsAppStatusNames } from "@/types/order";
import { OrderFormValues } from "@/lib/zod-schemas/orderSchema";
import { useOrderMutations } from "@/hooks/Orders/useOrderMutations";
import OrdersDataTableFilters from "./_components/OrdersTable/OrdersDataTableFilters";
import DataTableOrders from "./_components/OrdersTable/DataTableOrders";
import OrdersDialogForm from "./_components/OrdersDialogForm/OrdersDialogForm";

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
    />
  );
}
export default PrivateOrdersPage;
