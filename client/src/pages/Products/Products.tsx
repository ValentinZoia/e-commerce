
import { EmptyState } from "@/components/EmptyState";
import { ProductList } from "./_components"
import { useFetchProducts } from "@/hooks/useFetchProducts";
import { ProductStatus } from "@/types";

//En esta pagina se mostrarian todos los productos
//Hay que hacer un fetching de datos




const Products = () => {
  const{status, error, products} = useFetchProducts({productsStatus: ProductStatus.All});

  if (status === "loading") return <div className="flex justify-center items-center h-screen text-center">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-cente text-center">Error: {error}</div>;
  if(products == undefined || products == null) return <EmptyState  title="No se encontraron productos"/>;
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <ProductList products={products} title="Todos los productos" />
      </div>
    </div>
    
  )
}

export default Products