
import {useLoaderData} from 'react-router-dom'

const CategoryProducts = () => {
  const {categoryId} = useLoaderData() as{
    categoryId: string
  }
  if(!categoryId){
    
    throw new Response("Invalid category ID", {status: 400})
    
  }

  return (
    <div>{categoryId}</div>
  )
}

export default CategoryProducts