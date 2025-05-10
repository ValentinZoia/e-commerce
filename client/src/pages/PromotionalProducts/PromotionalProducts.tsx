import { ProductList } from "@/components"
import { ProductStatus } from "@/types"


const PromotionalProducts = () => {
  return (
    <ProductList  title={`Productos en Promoción`} productsStatus={ProductStatus.PROMOTION} />
  )
}

export default PromotionalProducts