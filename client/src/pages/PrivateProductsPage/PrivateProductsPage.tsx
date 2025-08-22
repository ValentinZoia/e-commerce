import { PrivateItemPage } from "@/components/PrivateItemPage/PrivateItemPage";
import { Product } from "@/types/product";
import { ProductFormValues } from "@/lib/zod-schemas/productSchema";
import { useProductMutations } from "@/hooks/Products/useProductMutations";
import ProductDataTableFilters from "./_components/ProductsTable/data-table-filters";
import DataTableProducts from "./_components/ProductsTable/DataTableProducts";
import { ProductDialogForm } from "./_components/ProductDialogForm";

const PAGESIZE = import.meta.env.VITE_PRODUCT_TABLE_PAGESIZE;

function PrivateProductsPage() {
  return (
    <PrivateItemPage<Product, ProductFormValues>
      titlePlural="productos"
      titleSingular="producto"
      useMutations={useProductMutations}
      FiltersComponent={ProductDataTableFilters}
      TableComponent={DataTableProducts}
      FormComponent={ProductDialogForm}
      defaultFilters={{
        categoryFilter: "",
        featuredFilter: "all",
        promotionFilter: "all",
        newFilter: "all",
      }}
      pageSizeProp={PAGESIZE}
    />
  );
}
export default PrivateProductsPage;
