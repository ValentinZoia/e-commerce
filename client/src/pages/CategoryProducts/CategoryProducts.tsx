
import { useFetchProducts } from '@/hooks/useFetchProducts'
import { ProductStatus } from '@/types'
import {useLoaderData} from 'react-router-dom'
import { ProductList } from '../Products/_components'
import { EmptyState } from '@/components/EmptyState'

const CategoryProducts = () => {
  const {categoryId} = useLoaderData() as{
    categoryId: string
  }
  if(!categoryId){
    
    throw new Response("Invalid category ID", {status: 400})
    
  }

  const {status, error, products} = useFetchProducts({productsStatus: ProductStatus.FORCATEGORY, categoryId:categoryId.toLocaleLowerCase()});

  if (status === "loading") return <div className="flex justify-center items-center h-screen text-center">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-cente text-center">Error: {error}</div>;
  if(products == undefined || products == null) return <EmptyState  title="No se encontraron productos"/>;
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <ProductList products={products} title={`Productos de la categoria ${categoryId}`} />
      </div>
    </div>
    
  )
}

export default CategoryProducts