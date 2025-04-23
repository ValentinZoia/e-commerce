import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  Home,
  Categories,
  CategoryProducts,
  Products,
  AboutUs,
  Login,
  Register,
  Error,
  ProductDetail,
  Cart,
} from "@/pages";

{
  /*

    En esta app debo tener las siguientes rutas:
        / - Página de inicio
        /categories - Listado de todas las categorías
        /categories/:categoryId - Productos de una categoría específica
        /products - Listado de todos los productos
        /products/:productId - Detalle de un producto
        /cart - Carrito de compras
        /about-us - Información sobre la tienda
        /login - Página de inicio de sesión
        /register - Página de registro de usuario
    
    
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
        path: "categories",
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
        path: "products",
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
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
