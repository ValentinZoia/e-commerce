import { SelectContent, SelectItem } from "@/components/ui/select";
import { useCategoriesSuspense } from "@/hooks/Categories/useCategories";

function CategorySelect() {
  const { data } = useCategoriesSuspense({
    page: 1,
    limit: 5,
  });
  return (
    <SelectContent>
      {data.data?.map((category) => (
        <SelectItem key={category.name} value={category.name}>
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  );
}
export default CategorySelect;
