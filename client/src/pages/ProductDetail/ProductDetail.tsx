import { useLoaderData } from "react-router-dom";
import ProductDetailFetchData from "./_components/ProductDetailFetchData/ProductDetailFetchData";
import { Suspense } from "react";
import LoaderPage from "@/components/LoaderPage/LoaderPage";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

const ProductDetail = () => {
    //obtenemos el productId de la url
    const { productId } = useLoaderData() as {
        productId: string;
    };

    if (!productId) {
        throw new Response("Invalid category ID", { status: 400 });
    }

    return (
        <main className="container bg-white min-h-screen rounded-md">
            <Suspense fallback={<LoaderPage />}>
                <ErrorBoundary
                    fallback={
                        <div className="p-4 text-center">
                            Error cargando producto
                        </div>
                    }
                >
                    <ProductDetailFetchData id={productId} />
                </ErrorBoundary>
            </Suspense>
        </main>
    );
};

export default ProductDetail;
