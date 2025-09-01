import { Suspense } from "react";
import { StoreCustomerFetchData } from "./_components";
import LoaderPage from "@/components/LoaderPage/LoaderPage";

function PrivateSettingsPage() {
  return (
    <div className="lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-balance mb-2">
          Configuración de la Tienda
        </h2>
        <p className="text-muted-foreground text-pretty">
          Configura el nombre, logo y los banners Home desde aquí
        </p>
      </div>
      <Suspense fallback={<LoaderPage />}>
        <StoreCustomerFetchData />
      </Suspense>
    </div>
  );
}
export default PrivateSettingsPage;
