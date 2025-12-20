import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout, AdminLayout } from "@/layouts";
import {
    Categories,
    CategoryProducts,
    Products,
    AboutUs,
    Login,
    Error,
    NewProducts,
    FeaturedProducts,
    PromotionalProducts,
    SearchPage,
    Home,
} from "@/pages";

import { PrivateRoutes, PublicRoutes } from "@/types";
import { AuthGuard, CheckoutGuard } from "@/guards";
import { lazy, Suspense } from "react";
import LoaderPage from "@/components/LoaderPage/LoaderPage";

const OrderDetail = lazy(() => import("@/pages/OrderDetail/OrderDetail"));
const PrivateAdminAI = lazy(
    () => import("@/pages/PrivateAdminAI/PrivateAdminAI"),
);
const PrivateAnalyticsPage = lazy(
    () => import("@/pages/PrivateAnalyticsPage/PrivateAnalyticsPage"),
);
const PrivateSettingsPage = lazy(
    () => import("@/pages/PrivateSettingsPage/PrivateSettingsPage"),
);
const ProductDetail = lazy(() => import("@/pages/ProductDetail/ProductDetail"));
const Checkout = lazy(() => import("@/pages/Checkout/Checkout"));
const AdminPage = lazy(() => import("@/pages/Admin/page"));
const PrivateCategoriesPage = lazy(
    () => import("@/pages/PrivateCategoriesPage/PrivateCategoriesPage"),
);
const PrivateOrdersPage = lazy(
    () => import("@/pages/PrivateOrdersPage/PrivateOrdersPage"),
);
const PrivateProductsPage = lazy(
    () => import("@/pages/PrivateProductsPage/PrivateProductsPage"),
);
{
    /*

    En esta app debo tener las siguientes rutas:
    --------------- RUTAS PUBLICAS-------------------
        / - Página de inicio
        /categories - Listado de todas las categorías
        /categories/:categoryId - Productos de una categoría específica
        /products - Listado de todos los productos
        /products/:productId - Detalle de un producto
        /new - Productos nuevos
        /featured - Productos destacados
        /promotion - Productos en promoción
        /about-us - Información sobre la tienda
        /login - Página de inicio de sesión - El unico que puede hacerlo es el admin.
        /search - Busqueda de productos
        /checkout/:token - Página de checkout
        /order/:orderId - Detalle de una orden

        --------------- RUTAS PRIVADAS-------------------
        Estas Rutas se cargarán en modo lazy. Osea solo cargaran cuando sean
        necesarias. Ya que solo son accedidas por admins. Lo cual
        no es frecuentemente.

        Las importaciones lazy tienen problemas para crawlers.
        En Bundle Time (build)
        el bundle analiza el AST y si detecta lazy() calls, crea chunks separados


        /private - realmente aqui no hay nada - redirigira a /private/admin
        /private/admin - panel de control del admin
        /private/admin/products - Tabla de todos los productos - para editar, eliminar y crear productos.
        /private/admin/categories - Tabla de todas las categorías - para editar, eliminar y crear categorias.
        /private/admin/orders - Tabla de todas las ordenes - para editar, eliminar y crear ordenes.
        /private/admin/ai- Asistente de IA
        /private/admin/settings - Configuraciones de la tienda - Cambiar nombre, logo, etc.
        /private/admin/analytics - Estadísticas de la tienda.



*/
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: PublicRoutes.CATEGORIES,
                children: [
                    {
                        index: true,
                        element: <Categories />,
                    },
                    {
                        path: ":categoryId",
                        element: <CategoryProducts />,
                        loader: async ({ params }) => {
                            if (!params.categoryId) {
                                throw new Response("Invalid category ID", {
                                    status: 400,
                                });
                            }
                            return { categoryId: params.categoryId };
                        },
                    },
                ],
            },
            {
                path: PublicRoutes.PRODUCTS,
                children: [
                    {
                        index: true,
                        element: <Products />,
                    },
                    {
                        path: ":productId",
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <ProductDetail />
                            </Suspense>
                        ),
                        loader: async ({ params }) => {
                            if (!params.productId) {
                                throw new Response("Invalid product ID", {
                                    status: 400,
                                });
                            }
                            return { productId: params.productId };
                        },
                    },
                ],
            },
            {
                path: PublicRoutes.NEW,
                element: <NewProducts />,
            },
            {
                path: PublicRoutes.FEATURED,
                element: <FeaturedProducts />,
            },
            {
                path: PublicRoutes.PROMOTION,
                element: <PromotionalProducts />,
            },
            {
                path: PublicRoutes.ABOUTUS,
                element: <AboutUs />,
            },
            {
                path: PublicRoutes.SEARCH,
                element: <SearchPage />,
            },
            {
                path: PublicRoutes.CHECKOUT,
                children: [
                    {
                        path: ":token",

                        element: <CheckoutGuard />,
                        loader: async ({ params }) => {
                            if (!params.token) {
                                throw new Response("Invalid token", {
                                    status: 400,
                                });
                            }
                            return { token: params.token };
                        },
                        children: [
                            {
                                index: true,
                                element: (
                                    <Suspense fallback={<LoaderPage />}>
                                        <Checkout />
                                    </Suspense>
                                ),
                                loader: async ({ params }) => {
                                    if (!params.token) {
                                        throw new Response("Invalid token", {
                                            status: 400,
                                        });
                                    }
                                    return { token: params.token };
                                },
                            },
                        ],
                    },
                ],
            },
            {
                path: PublicRoutes.ORDER,
                children: [
                    {
                        index: true,
                        element: <Error />,
                    },
                    {
                        path: ":orderId",
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <OrderDetail />
                            </Suspense>
                        ),
                        loader: async ({ params }) => {
                            if (!params.orderId) {
                                throw new Response("Invalid order ID", {
                                    status: 400,
                                });
                            }
                            return { orderId: params.orderId };
                        },
                    },
                ],
            },
        ],
    },
    {
        path: PublicRoutes.LOGIN,
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: `${PrivateRoutes.PRIVATE}`,
        element: <AuthGuard />,
        children: [
            {
                index: true,
                element: <Navigate to={`${PrivateRoutes.ADMIN}`} />,
            },
            {
                path: PrivateRoutes.ADMIN,
                element: (
                    <Suspense fallback={<LoaderPage />}>
                        <AdminLayout />
                    </Suspense>
                ),
                errorElement: <Error />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <AdminPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: PrivateRoutes.PRODUCTS,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <PrivateProductsPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: PrivateRoutes.CATEGORIES,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <PrivateCategoriesPage />
                            </Suspense>
                        ),
                    },
                    {
                        path: PrivateRoutes.ORDERS,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <PrivateOrdersPage />
                            </Suspense>
                        ),
                    },

                    {
                        path: PrivateRoutes.SETTINGS,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <PrivateSettingsPage />,
                            </Suspense>
                        ),
                    },
                    {
                        path: PrivateRoutes.ANALYTICS,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <PrivateAnalyticsPage />,
                            </Suspense>
                        ),
                    },
                    {
                        path: PrivateRoutes.AI,
                        element: (
                            <Suspense fallback={<LoaderPage />}>
                                <PrivateAdminAI />,
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
]);

export default router;
