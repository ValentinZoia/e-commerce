import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {ProductsCarousel} from './_components'
import { ProductStatus, Product } from "@/types";


interface PoductsHeaderProps{
    title:string;
    produsctsStatus: ProductStatus
    products: Product[]

}


const ProductsHeader = ({title, produsctsStatus, products}:PoductsHeaderProps) => {
  return (
    <section className="py-10">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{title}</h2>
              <Link to="/" className="text-sm font-medium flex items-center hover:underline">
                Ver todos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <ProductsCarousel productsStatus={produsctsStatus} products={products}/>
          </div>
        </section>
  )
}

export default ProductsHeader