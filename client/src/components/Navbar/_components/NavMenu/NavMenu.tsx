import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { CategoryStatus } from "@/types";
import { capitalizeFirstLetter } from "@/utilities";
import { LoaderCircle } from "lucide-react";

import { Link } from "react-router-dom";

const NavMenu = () => {
  const { status, error, categories } = useFetchCategories({
    categoriesStatus: CategoryStatus.All,
  });

 
  
  if (!categories) return <p></p>;
  

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink>INICIO</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>PRODUCTOS</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              <div className="flex flex-col">
                {(status === "loading") && <LoaderCircle className="animate-spin" />}
                {(error) && <p></p>}
                {(!categories || categories.length === 0) && <li>No hay categorias</li>}
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link to={`/categories/${category.slug}`}>
                      <NavigationMenuLink>{capitalizeFirstLetter(category.name)}</NavigationMenuLink>
                    </Link>
                  </li>
                ))}
              </div>
              <div className="flex flex-col">
                <li>
                  
                    <Link to="/products">
                      <NavigationMenuLink>Todos los Productos</NavigationMenuLink>
                    </Link>
                  
                </li>
                <li>
                  
                    <Link to="/promotion">
                      <NavigationMenuLink>Promoción</NavigationMenuLink>
                    </Link>
                  
                </li>
                <li>
                  
                    <Link to="/featured">
                      <NavigationMenuLink>Destacado</NavigationMenuLink>
                    </Link>
                  
                </li>
                <li>
                  
                  <Link to="/new">
                    <NavigationMenuLink>Nuevo</NavigationMenuLink>
                  </Link>
                
              </li>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/promotion">
            <NavigationMenuLink>PROMOCIÓN</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/featured">
            <NavigationMenuLink>DESTACADO</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/new">
            <NavigationMenuLink>NUEVO</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
