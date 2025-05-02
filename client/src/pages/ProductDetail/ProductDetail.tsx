
import {useLoaderData} from 'react-router-dom'
import {ProductDetailCard} from './_components'
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductStatus } from "@/types";


const ProductDetail = () => {
  //obtenemos el productId de la url
  const {productId} = useLoaderData() as{
    productId: string
  }
  
  if(!productId){
    
    throw new Response("Invalid category ID", {status: 400})
    
  }
  
  const {status, error, currentProduct} = useFetchProducts({productsStatus: ProductStatus.SINGLEPRODUCT, productId:productId});
  
    if (status === "loading") return <div className="flex justify-center items-center h-screen text-center">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-center">Error: {error}</div>;
    if(!currentProduct) return <div className="flex justify-center items-center h-screen text-center">Product not found</div>
  
  return (
    <main className="bg-white min-h-screen rounded-md">
      <section className="container mx-auto my-12 py-4 ">
      <ProductDetailCard product={currentProduct} />
    </section>
    </main>
    
  )
}

export default ProductDetail