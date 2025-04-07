import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Layout</div>,
        errorElement: <div>404</div>,
        children:[
            {
                index:true,
                element: <div>Home</div>
            },
            {
                path:"categories",
                element: <div>Categories</div>
            },
            {
                path:"products/:prefix",
                element: <div>Products</div>,
                loader: ({params}) =>{
                    if(typeof params.prefix !== "string" ||  !/^[a-z]+$/i.test(params.prefix)){
                        throw new Response("Invalid prefix", {status:400})
                    }
                    return true;
                },
            },
            {
                path:"about-us",
                element: <div>About Us</div>
            },
            {
                path:"login",
                element: <div>Login</div>
            },
            {
                path:"register",
                element: <div>Register</div>
            },
        ],
    },

]);


export default router;
