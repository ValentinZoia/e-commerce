import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { OrderDetailFetchData } from "./_components/OrderDetailFecthData";
import LoaderPage from "@/components/LoaderPage/LoaderPage";

function OrderDetail() {
  const { orderId } = useLoaderData() as {
    orderId: string;
  };
  return (
    <Suspense fallback={<LoaderPage />}>
      <OrderDetailFetchData id={orderId} />
    </Suspense>
  );
}
export default OrderDetail;
