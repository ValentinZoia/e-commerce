import { ProductList } from "@/components"
import { ProductStatus } from "@/types"


const NewProducts = () => {
  return (
    <ProductList  title={`Productos Nuevos`} productsStatus={ProductStatus.NEW} />
  )
}

export default NewProducts