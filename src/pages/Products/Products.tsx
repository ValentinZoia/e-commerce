import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts} from "@/utilities/productSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ProductList } from "./_components"

//En esta pagina se mostrarian todos los productos
//Hay que hacer un fetching de datos




const Products = () => {
  const dispatch = useAppDispatch();
  const { products,  status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
        
      } catch (error) {
        console.error("Failed to load products:", error);
        // Puedes mostrar un mensaje de error al usuario aquí
      }
    };

    loadProducts();
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-4">
        <ProductList products={products} title="Todos los productos" />
      </div>
    </div>
    
  )
}

export default Products