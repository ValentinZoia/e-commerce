import { useStoreCustomerSuspense } from "@/hooks/StoreCustomer/useStoreCustomer";
import { SettingsForm } from "../SettingsForm";

function StoreCustomerFetchData() {
  const { data } = useStoreCustomerSuspense();
  console.log(data);
  // if (data.length === 0)
  //   return (
  //     <div className="flex justify-center items-center text-muted-foreground text-xl">
  //       {" "}
  //       No hay Datos Cargados de la tienda
  //     </div>
  //   );
  return (
    <div>
      <SettingsForm data={data[0]} />
    </div>
  );
}
export default StoreCustomerFetchData;
