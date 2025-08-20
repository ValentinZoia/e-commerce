import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useCategoriesSuspense } from "@/hooks/Categories/useCategories";
import { capitalizeFirstLetter } from "@/utilities";

import { Link } from "react-router-dom";

function CategoriesList() {
  const { data } = useCategoriesSuspense({
    page: 1,
    limit: 5,
  });
  return (
    <div className="flex flex-col">
      {data.data.length === 0 && <p>No hay categorias</p>}
      {data.data.map((category) => (
        <li key={category.id}>
          <Link to={`/categories/${category.slug}`}>
            <NavigationMenuLink>
              {capitalizeFirstLetter(category.name)}
            </NavigationMenuLink>
          </Link>
        </li>
      ))}
    </div>
  );
}
export default CategoriesList;
