import { ProductList } from "@/components"
import { ProductStatus } from "@/types"


const FeaturedProducts = () => {
  return (
    <ProductList  title={`Productos Destacados`} productsStatus={ProductStatus.FEATURED} />
  )
}

export default FeaturedProducts