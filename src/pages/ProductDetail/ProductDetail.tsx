import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProductById } from "@/utilities/productSlice";
import { RootState, useAppDispatch } from "@/store/store";
import {useLoaderData} from 'react-router-dom'
import {ProductDetailCard} from './_components'


const ProductDetail = () => {
  //obtenemos el productId de la url
  const {productId} = useLoaderData() as{
    productId: string
  }
  console.log(productId);
  if(!productId){
    
    throw new Response("Invalid category ID", {status: 400})
    
  }
  
  const dispatch = useAppDispatch();
    const { currentProduct,  status, error } = useSelector(
      (state: RootState) => state.products
    );
  
    useEffect(() => {
      const loadProducts = async () => {
        try {
          await dispatch(fetchProductById(productId)).unwrap();
          
        } catch (error) {
          console.error("Failed to load products:", error);
          // Puedes mostrar un mensaje de error al usuario aquí
        }
      };
  
      loadProducts();
    }, [dispatch]);
  
    if (status === "loading") return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if(!currentProduct) return <div>Product not found</div>
  
  return (
    <main className="bg-white min-h-screen rounded-md">
      <section className="container mx-auto my-12 py-4 ">
      <ProductDetailCard product={currentProduct} />
    </section>
    </main>
    
  )
}

export default ProductDetail