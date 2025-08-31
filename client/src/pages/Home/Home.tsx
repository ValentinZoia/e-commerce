import { ProductsHeader } from "@/components";
import { CarouselHome } from "./_components";
import { ProductStatus } from "@/types";

const Home = () => {
  return (
    <>
      <CarouselHome />
      <div className="container">
        <ProductsHeader
          title="Productos en Promoción"
          productsStatus={ProductStatus.PROMOTION}
        />
        <ProductsHeader
          title="Productos Destacados"
          productsStatus={ProductStatus.FEATURED}
        />
        <ProductsHeader
          title="Productos Nuevos"
          productsStatus={ProductStatus.NEW}
        />
      </div>
    </>
  );
};

export default Home;
