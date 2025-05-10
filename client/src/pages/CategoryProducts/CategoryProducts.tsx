

import { ProductStatus } from '@/types'
import {useLoaderData} from 'react-router-dom'
import { ProductList } from '@/components'


const CategoryProducts = () => {
  const {categoryId} = useLoaderData() as{
    categoryId: string
  }
  if(!categoryId){
    
    throw new Response("Invalid category ID", {status: 400})
    
  }

  return (
    
        <ProductList title={`Productos de la categoria ${categoryId}`} productsStatus={ProductStatus.FORCATEGORY} categoryId={categoryId}/>
      
    
  )
}

export default CategoryProducts