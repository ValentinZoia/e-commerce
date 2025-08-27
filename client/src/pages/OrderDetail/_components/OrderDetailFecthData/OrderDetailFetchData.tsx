import { useOrderByIdSuspense } from "@/hooks/Orders/useOrderById";
import { OrderDetailCard } from "../OrderDetailCard";

function OrderDetailFetchData({ id }: { id: string }) {
  const { data } = useOrderByIdSuspense(id);

  return <OrderDetailCard order={data} />;
}
export default OrderDetailFetchData;
