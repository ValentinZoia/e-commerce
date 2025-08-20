import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Suspense } from "react";

import { Link } from "react-router-dom";
import CategoriesList from "../CategoriesList/CategoriesList";

import { LoaderCircle } from "lucide-react";

const NavMenu = () => {
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
              <Suspense
                fallback={
                  <LoaderCircle className="h-4 w-4 animate-spin text-blue-500" />
                }
              >
                <CategoriesList />
              </Suspense>
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
