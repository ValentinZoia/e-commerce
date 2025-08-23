import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";
import CategoriesList from "../CategoriesList/CategoriesList";
import { Link } from "react-router-dom";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

function NavMenuContent({ children }: { children?: React.ReactNode }) {
  return (
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
      {children}
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
  );
}
export default NavMenuContent;
