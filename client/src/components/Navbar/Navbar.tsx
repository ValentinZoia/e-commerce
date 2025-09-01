import { Link } from "react-router-dom";

import { MobileMenu, SearchInput } from "./_components";
import { CartPanel } from "../ShoppingCart";
import { NavMenu } from "./_components";
import { Suspense } from "react";
import { Logo } from "../Logo";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background  ">
      {/* piso de arriba */}
      <div className="container flex h-16 items-center justify-between">
        {/* Left Side -  Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Suspense fallback={<Skeleton className="rounded-full size-6" />}>
            <Logo />
          </Suspense>
        </Link>

        {/* Center Side - Input Search */}

        <div className="hidden md:block flex-1 mx-4 md:mx-8 lg:mx-12">
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

      {/* piso de abajo */}
      <div className="w-full bg-white border-y-1">
        <div className="container flex h-16 items-center justify-center ">
          {/* Menu Navigation */}
          <nav className="w-full md:hidden">
            <SearchInput />
          </nav>
          <nav className="hidden md:flex items-center gap-6">
            <NavMenu />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
