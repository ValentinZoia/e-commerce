import { Link } from "react-router-dom";
import {  ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { HeaderBasket, MobileMenu } from "./_components";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1>LOGO</h1>
        </Link>

        {/* Menu Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="link"
                className=" cursor-pointer p-0 h-auto font-medium text-sm flex items-center gap-1"
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
            to="about-us"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav>

        {/* Right Side - Auth & Cart */}

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">

            <Link to='/login'>
              <Button variant={"ghost"} size="sm">Login</Button>
            </Link>
            <Link to='/register'>
              <Button  size="sm">Register</Button>
            </Link>

          </div>

          {/* Shopping Cart */}
         
            <HeaderBasket />
          
          {/* Mobile Menu */}
            <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
