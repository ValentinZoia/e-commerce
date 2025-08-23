import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";

import { NavMenuContent } from "../NavMenuContent";

const NavMenu = () => {
  return (
    <NavigationMenu className="h-full w-full flex items-start justify-start max-w-full">
      <div>
        <NavigationMenuList className="h-full w-full flex flex-col justify-between items-start md:flex-row">
          <NavigationMenuItem className="w-ful">
            <Link to="/">
              <NavigationMenuLink>INICIO</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>PRODUCTOS</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavMenuContent />
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
      </div>
    </NavigationMenu>
  );
};

export default NavMenu;
