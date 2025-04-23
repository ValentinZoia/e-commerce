
import { ProductCard } from "@/components";
import { Product } from "@/types";

interface ProductListProps{
  products: Product[];
  title: string;
}


const ProductsList = ({products, title}: ProductListProps) => {
  
  return (
    
        
        
        <div>
          <h1 className="mb-8 text-3xl font-bold">{title}</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}  />
            ))}
          </div>
        </div>
      
  );
};

export default ProductsList;
