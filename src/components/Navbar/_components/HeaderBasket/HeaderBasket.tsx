
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const HeaderBasket = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  
  return (
    <Button variant="ghost" size="icon" className="relative">
    <ShoppingCart className="h-5 w-5" />
    {cartItemCount > 0 && (
      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs ">
        {cartItemCount}
      </Badge>
    )}
    <span className="sr-only">Shopping Cart</span>
  </Button>
  );
};

export default HeaderBasket;
