
import { ProductList } from "@/components"

import { ProductStatus } from "@/types";


//En esta pagina se mostrarian todos los productos
//Hay que hacer un fetching de datos




const Products = () => {
 return (
    
        <ProductList  title={`Todos los productos`} productsStatus={ProductStatus.All} />
      
    
  )
}

export default Products