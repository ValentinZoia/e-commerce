
import { EmptyState } from "@/components/EmptyState";
import { ProductList } from "./_components"

import { ProductStatus } from "@/types";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { ProductFilters } from "@/components/ProductFilters";

//En esta pagina se mostrarian todos los productos
//Hay que hacer un fetching de datos




const Products = () => {
  const {status, error, products, filters, setFilters} = useFilteredProducts({productsStatus: ProductStatus.All});

  if (status === "loading") return <div className="flex justify-center items-center h-screen text-center">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-cente text-center">Error: {error}</div>;
  if(products == undefined || products == null || products.length == 0) return <EmptyState  title="No se encontraron productos"/>;
  return (
    <div className="container px-0 py-10">
      <div className='grid md:grid-cols-4 '>
        <div className='hidden md:block mr-4'>
          <ProductFilters filters={filters} setFilters={setFilters} products={products} productsStatus={ProductStatus.All} />
        </div>
        <div className="col-span-3">
        <ProductList products={products} title={`Todos los productos`} />
      </div>
      </div>
      
    </div>
    
  )
}

export default Products