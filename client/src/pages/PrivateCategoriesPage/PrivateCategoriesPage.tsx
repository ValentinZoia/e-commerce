import { PrivateItemPage } from "@/components/PrivateItemPage/PrivateItemPage";
import { useCategoryMutations } from "@/hooks/Categories/useCategoryMutations";
import { CategoryFormValues } from "@/lib/zod-schemas/categorySchema";
import { Category } from "@/types/category";
import DataTableCategories from "./_components/CategoriesTable/DataTableCategories";
import CategoryDialogForm from "./_components/CategoryDialogForm/CategoryDialogForm";

function PrivateCategoriesPage() {
  return (
    <PrivateItemPage<Category, CategoryFormValues>
      titlePlural="categorias"
      titleSingular="categoria"
      useMutations={useCategoryMutations}
      TableComponent={DataTableCategories}
      FormComponent={CategoryDialogForm}
      extraDeleteMessage="Si eliminas una categoria, recuerda que eliminas todos los productos dentro de ella."
    />
  );
}
export default PrivateCategoriesPage;
