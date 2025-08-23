import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ChevronRight,
  Home,
  LoaderCircle,
  Menu,
  Package,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";

import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Suspense, useState } from "react";
import { PublicRoutes } from "@/types";
import CategoriesList from "../CategoriesList/CategoriesList";
import { NavigationMenu } from "@/components/ui/navigation-menu";

const MobileMenu = () => {
  const [showProducts, setShowProducts] = useState(false);

  const handleProductsClick = () => {
    setShowProducts(!showProducts);
  };
  return (
    <div className="p-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>Navegación</SheetTitle>
          </SheetHeader>

          <nav className="mt-6 space-y-2">
            {/* INICIO */}
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-12"
            >
              <Link to={`/`} className="flex items-center w-full">
                <Home className="mr-3 h-4 w-4" />
                INICIO
              </Link>
            </Button>

            {/* PRODUCTOS */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between text-left h-12"
                onClick={handleProductsClick}
              >
                <div className="flex items-center">
                  <Package className="mr-3 h-4 w-4" />
                  PRODUCTOS
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    showProducts ? "rotate-90" : ""
                  }`}
                />
              </Button>

              {/* Submenu de productos */}
              {showProducts && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-border pl-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-left font-medium text-primary"
                  >
                    <Link to={`/${PublicRoutes.PRODUCTS}`} className="w-full">
                      Todos los productos
                    </Link>
                  </Button>
                  <Separator className="my-2" />
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    CATEGORÍAS
                  </div>
                  <NavigationMenu>
                    <ul>
                      <Suspense
                        fallback={
                          <LoaderCircle className="h-4 w-4 animate-spin text-blue-500" />
                        }
                      >
                        <CategoriesList />
                      </Suspense>
                    </ul>
                  </NavigationMenu>
                </div>
              )}
            </div>

            {/* NUEVO */}
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-12"
            >
              <Link
                to={`/${PublicRoutes.NEW}`}
                className="flex items-center w-full h-full"
              >
                <Sparkles className="mr-3 h-4 w-4" />
                NUEVO
              </Link>
            </Button>

            {/* PROMOCION */}
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-12"
            >
              <Link
                to={`/${PublicRoutes.PROMOTION}`}
                className="w-full flex items-center"
              >
                <Tag className="mr-3 h-4 w-4" />
                PROMOCIÓN
              </Link>
            </Button>

            {/* DESTACADO */}
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-12"
            >
              <Link
                to={`/${PublicRoutes.FEATURED}`}
                className="w-full flex items-center"
              >
                <Star className="mr-3 h-4 w-4" />
                DESTACADO
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
