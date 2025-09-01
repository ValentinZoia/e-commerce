import { useStoreCustomerSuspense } from "@/hooks/StoreCustomer/useStoreCustomer";
import { SettingsForm } from "../SettingsForm";

function StoreCustomerFetchData() {
  const { data } = useStoreCustomerSuspense();

  return (
    <div>
      <SettingsForm data={data[0]} />
    </div>
  );
}
export default StoreCustomerFetchData;
