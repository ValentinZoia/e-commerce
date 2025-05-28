import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts";
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
  AdminPage
} from "@/pages";

import {PrivateRoutes, PublicRoutes} from '@/types'
import { AuthGuard } from "@/guards";

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
        /private/admin - panel de control del admin - para editar y crear productos.
        
    
    
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
              if (!params.categoryId ) {
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
              if (!params.productId ) {
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
        path:`${PrivateRoutes.PRIVATE}`,
        element:<AuthGuard />,
        children:[
          {
            index:true,
            element:<Navigate to={`${PrivateRoutes.ADMIN}`} />
          },
          {
            path:PrivateRoutes.ADMIN,
            element:<AdminPage />
          }
        ]
      },
     
    ],
  },
  {
    path: PublicRoutes.LOGIN,
    element:<Login />,
    errorElement:<Error />
  }
]);

export default router;
