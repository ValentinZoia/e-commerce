import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {Home, Categories, Products, AboutUs, Login, Register, Error} from '@/pages';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children:[
            {
                index:true,
                element: <Home />,
            },
            {
                path:"categories",
                element: <Categories />,
            },
            {
                path:"products/:prefix",
                element: <Products />,
                loader: ({params}) =>{
                    if(typeof params.prefix !== "string" ||  !/^[a-z]+$/i.test(params.prefix)){
                        throw new Response("Invalid prefix", {status:400})
                    }
                    return true;
                },
            },
            {
                path:"about-us",
                element: <AboutUs />,
            },
            {
                path:"login",
                element: <Login />,
            },
            {
                path:"register",
                element: <Register />,
            },
        ],
    },

]);


export default router;
