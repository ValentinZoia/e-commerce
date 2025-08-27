import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { CheckoutForm } from "./_components/CheckoutForm";
import { DetailOrderProductsCard } from "./_components/DetailOrderProducts";
import { DetailOrderProductsBody } from "./_components/DetailOrderProductsBody";
import { ItemList } from "./_components/ItemList";

function Checkout() {
  const { totalItems, totalPrice, items } = useSelector(
    (state: RootState) => state.cart
  );

  const isFreeShipping = items.every((item) => item.product?.isFreeShipping);

  return (
    <div className=" bg-white px-4 py-4 w-full h-screen grid grid-cols-1 lg:grid-cols-2 gap-2 ">
      <div className="">
        <h1 className="text-3xl font-bold pb-2">Completa con tus Datos</h1>
        <p className="text-muted-foreground">
          Te enviaremos un mensaje por whatsapp para completar la compra
          personalmente con vos!
        </p>
        <CheckoutForm
          items={items}
          total={totalPrice}
          subtotal={totalPrice}
          isFreeShipping={isFreeShipping}
        />
      </div>
      <div>
        <DetailOrderProductsCard
          headerTitle="Detalles"
          BodyComponent={
            <DetailOrderProductsBody
              totalItems={totalItems}
              totalPrice={totalPrice}
              isFreeShipping={isFreeShipping}
              paymentMethod={null}
            />
          }
          HeaderComponent={<ItemList items={items} needActions={true} />}
        />
      </div>
    </div>
  );
}
export default Checkout;
