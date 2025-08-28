import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout, AdminLayout } from "@/layouts";
import {
  Home,
  Categories,
  CategoryProducts,
  Products,
  AboutUs,
  Login,
  Error,
  ProductDetail,
  NewProducts,
  FeaturedProducts,
  PromotionalProducts,
  AdminPage,
  PrivateAdminsPage,
  PrivateCategoriesPage,
  PrivateOrdersPage,
  PrivateProductsPage,
  PrivateSettingsPage,
  PrivateAnalyticsPage,
  SearchPage,
  Checkout,
  OrderDetail,
  PrivateAdminAI,
} from "@/pages";

import { PrivateRoutes, PublicRoutes } from "@/types";
import { AuthGuard, CheckoutGuard } from "@/guards";

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

        --------------- RUTAS PRIVADAS-------------------
        /private - realmente aqui no hay nada - redirigira a /private/admin
        /private/admin - panel de control del admin 
        /private/admin/products - Tabla de todos los productos - para editar, eliminar y crear productos.
        /private/admin/categories - Tabla de todas las categorías - para editar, eliminar y crear categorias.
        /private/admin/orders - Tabla de todas las ordenes - para editar, eliminar y crear ordenes.
        /private/admin/admins - Listado de todos los admins/empleados
        /private/admin/settings - Configuraciones de la tienda
        /private/admin/analytics - Estadísticas de la tienda
        
    
    
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
                throw new Response("Invalid category ID", { status: 400 });
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
            element: <ProductDetail />,
            loader: async ({ params }) => {
              if (!params.productId) {
                throw new Response("Invalid product ID", { status: 400 });
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
                throw new Response("Invalid token", { status: 400 });
              }
              return { token: params.token };
            },
            children: [
              {
                index: true,
                element: <Checkout />,
                loader: async ({ params }) => {
                  if (!params.token) {
                    throw new Response("Invalid token", { status: 400 });
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
            element: <OrderDetail />,
            loader: async ({ params }) => {
              if (!params.orderId) {
                throw new Response("Invalid order ID", { status: 400 });
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
        element: <AdminLayout />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: PrivateRoutes.PRODUCTS,
            element: <PrivateProductsPage />,
          },
          {
            path: PrivateRoutes.CATEGORIES,
            element: <PrivateCategoriesPage />,
          },
          {
            path: PrivateRoutes.ORDERS,
            element: <PrivateOrdersPage />,
          },
          {
            path: PrivateRoutes.ADMINS,
            element: <PrivateAdminsPage />,
          },
          {
            path: PrivateRoutes.SETTINGS,
            element: <PrivateSettingsPage />,
          },
          {
            path: PrivateRoutes.ANALYTICS,
            element: <PrivateAnalyticsPage />,
          },
          {
            path: PrivateRoutes.AI,
            element: <PrivateAdminAI />,
          },
        ],
      },
    ],
  },
]);

export default router;
