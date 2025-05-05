import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MobileMenu, SearchInput } from "./_components";
import { CartPanel } from "../ShoppingCart";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side -  Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1>LOGO</h1>
        </Link>

        {/* Center Side - Input Search */}

        <div className="flex-1 mx-4 md:mx-8 lg:mx-12">
          <SearchInput />
        </div>

        {/* Right Side -  Cart */}

        <div className="flex items-center gap-4">
          

          {/* Shopping Cart */}
          <CartPanel />

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
      <div className="w-full bg-white border-y-1 hidden md:block">
        <div className="container flex h-16 items-center justify-center ">
          {/* Menu Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm  font-medium transition-colors "
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className=" cursor-pointer text-black p-0 h-auto font-medium text-sm flex items-center gap-1  "
                >
                  Categories
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/categories/electronics">Electronics</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categories/clothing">Clothing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categories/home">Home & Kitchen</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/categories/beauty">Beauty</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="products"
              className="text-sm font-medium transition-colors  "
            >
              Products
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
