import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts, fetchFeaturedProducts } from "@/utilities/productSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ProductCard } from "@/components";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const { products, featuredProducts, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
        await dispatch(fetchFeaturedProducts()).unwrap();
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
        <div>
          <h1 className="mb-8 text-3xl font-bold">Featured Products</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="mb-8 text-3xl font-bold">Our Products</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
