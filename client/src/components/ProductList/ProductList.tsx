
import { ProductCard } from "@/components";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import {  ProductStatus } from "@/types";
import { EmptyState } from "../EmptyState";
import { ProductFilters } from "../ProductFilters";
import { Loader } from "lucide-react";

interface ProductListProps{
  productsStatus: ProductStatus
  title: string;
  categoryId?: string
}


const ProductsList = ({title,productsStatus, categoryId}: ProductListProps) => {
  const {status, error, products, filters, setFilters} = useFilteredProducts({productsStatus: productsStatus, categoryId: categoryId});
  
    if (status === "loading") return <div className="flex justify-center items-center h-screen text-center"><Loader className="animate-spin" /></div>;
    if (error) return <EmptyState title={`Error: ${error}`} />;
    if(products == undefined || products == null || products.length == 0) return <EmptyState  title="No se encontraron productos"/>;
  return (
    <div className="container px-0 py-10">
      <div className='grid md:grid-cols-4 '>
        <div className='hidden md:block mr-4'>
          <ProductFilters filters={filters} setFilters={setFilters} products={products} productsStatus={productsStatus} />
        </div>
        <div className="col-span-3">
        <div>
          <h1 className="mb-8 text-3xl font-bold">{title}</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}  />
            ))}
          </div>
        </div>
      </div>
      </div>
      
    </div>
        
        
        
      
  );
};

export default ProductsList;
