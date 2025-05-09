

import { ProductStatus } from '@/types'
import {useLoaderData} from 'react-router-dom'
import { ProductList } from '../Products/_components'
import { EmptyState } from '@/components/EmptyState'
import { useFilteredProducts } from '@/hooks/useFilteredProducts'
import { ProductFilters } from '@/components/ProductFilters'
import { capitalizeFirstLetter } from '@/utilities'

const CategoryProducts = () => {
  const {categoryId} = useLoaderData() as{
    categoryId: string
  }
  if(!categoryId){
    
    throw new Response("Invalid category ID", {status: 400})
    
  }

  const {status, error, products, filters, setFilters} = useFilteredProducts({productsStatus: ProductStatus.FORCATEGORY, categoryId:categoryId.toLocaleLowerCase()});

  if (status === "loading") return <div className="flex justify-center items-center h-screen text-center">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-cente text-center">Error: {error}</div>;
  if(products == undefined || products == null || products.length == 0) return <EmptyState  title="No se encontraron productos"/>;
  return (
    <div className="container px-0 py-10">
      <div className='grid md:grid-cols-4'>
        <div className='hidden md:block mr-4'>
          <ProductFilters filters={filters} setFilters={setFilters} products={products} productsStatus={ProductStatus.FORCATEGORY} categoryId={capitalizeFirstLetter(categoryId)} />
        </div>
        <div className="col-span-3">
        <ProductList products={products} title={`Productos de la categoria ${categoryId}`} />
      </div>
      </div>
      
    </div>
    
  )
}

export default CategoryProducts