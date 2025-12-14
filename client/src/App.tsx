import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Suspense, useEffect } from "react";
import LoaderPage from "./components/LoaderPage/LoaderPage";
import { useStoreCustomerSuspense } from "./hooks/StoreCustomer/useStoreCustomer";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

const App = () => {
    const { data } = useStoreCustomerSuspense();

    useEffect(() => {
        if (data?.[0]?.nameStore) {
            document.title = data[0].nameStore;
        }
    }, [data]);
    return (
        <Suspense fallback={<LoaderPage />}>
            <ErrorBoundary>
                <RouterProvider router={router} />
            </ErrorBoundary>
        </Suspense>
    );
};

export default App;
