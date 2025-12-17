import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { CheckoutForm } from "./_components/CheckoutForm";
import { DetailOrderProductsCard } from "./_components/DetailOrderProducts";
import { DetailOrderProductsBody } from "./_components/DetailOrderProductsBody";
import { ItemList } from "./_components/ItemList";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

function Checkout() {
    const { totalItems, totalPrice, items } = useSelector(
        (state: RootState) => state.cart,
    );

    const isFreeShipping = items.every((item) => item.product?.isFreeShipping);
    const hasInstallments = items.some(
        (item) =>
            item.product?.installments && item.product?.installments.length > 0,
    );

    const hasCashDiscount = items.some(
        (item) =>
            item.product?.cashDiscountPercentage &&
            item.product?.cashDiscountPercentage > 0,
    );

    const initialInstallments = hasInstallments
        ? items
              .flatMap((item) => item.product?.installments || [])
              .filter(Boolean) // elimina null/undefined
        : [];

    const initialCashDiscount = hasCashDiscount
        ? items.find((item) => item.product?.cashDiscountPercentage)?.product
              ?.cashDiscountPercentage || null
        : null;
    return (
        <div className=" bg-white px-4 py-4 w-full h-screen grid grid-cols-1 lg:grid-cols-2 gap-2 ">
            <ErrorBoundary
                fallback={
                    <div className="p-4 text-center">
                        Error en el proceso de pago
                    </div>
                }
            >
                <div className="">
                    <h1 className="text-3xl font-bold pb-2">
                        Completa con tus Datos
                    </h1>
                    <p className="text-muted-foreground">
                        Te enviaremos un mensaje por whatsapp para completar la
                        compra personalmente con vos!
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
                                initialInstallments={initialInstallments}
                                initialCashDiscoutnt={initialCashDiscount}
                            />
                        }
                        HeaderComponent={
                            <ItemList items={items} needActions={true} />
                        }
                    />
                </div>
            </ErrorBoundary>
        </div>
    );
}
export default Checkout;
