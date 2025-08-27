import { defaultValues } from "@/lib/zod-schemas/productSchema";
import { DetailOrderProductsCard } from "@/pages/Checkout/_components/DetailOrderProducts";
import { DetailOrderProductsBody } from "@/pages/Checkout/_components/DetailOrderProductsBody";
import { ItemList } from "@/pages/Checkout/_components/ItemList";
import { CartItem } from "@/types";
import { Order, OrderItem } from "@/types/order";
import { DetailCustomerData } from "../DetailCustomerData";
const orderItemToCartItemMap = (item: OrderItem): CartItem => ({
  productId: item.productId,

  quantity: item.quantity,
  size: item.size,
  product: {
    ...defaultValues,
    name: item.productName,
    id: item.productId,
    stock: 0,
    price: item.unitPrice,
    images: [item.imageUrl as string],
    installments: [],
  },
});
function OrderDetailCard({ order }: { order: Order }) {
  const items: CartItem[] = order.products.map(orderItemToCartItemMap);
  return (
    <div className="bg-white px-4 py-4 w-full h-screen grid grid-cols-1 lg:grid-cols-2 gap-2 ">
      <div>
        <DetailOrderProductsCard
          headerTitle="Detalles de la Compra"
          BodyComponent={
            <DetailOrderProductsBody
              totalItems={order.products.length}
              totalPrice={order.total}
              isFreeShipping={order.isFreeShipping}
              paymentMethod={order.paymentMethod}
            />
          }
          HeaderComponent={<ItemList items={items} needActions={false} />}
        />
      </div>
      <div>
        <DetailOrderProductsCard
          headerTitle="Detalles del Cliente"
          BodyComponent={<></>}
          HeaderComponent={
            <DetailCustomerData
              customerEmail={order.customerEmail as string}
              customerName={order.customerName}
              customerPhone={order.customerPhone}
            />
          }
        />
      </div>
    </div>
  );
}
export default OrderDetailCard;
