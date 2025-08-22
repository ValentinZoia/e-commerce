import { Product } from "@/types/product";

export const renderStockMessage = (producto: Product) => {
  if (!producto.stock) return;
  if (producto.stock === 1) {
    return (
      <div className="flex items-center gap-1 mt-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <p className="text-red-600 font-medium text-xs">¡Último disponible!</p>
      </div>
    );
  } else if (producto.stock < 5) {
    return (
      <div className="flex items-center gap-1 mt-2">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <p className="text-orange-600 font-medium text-xs">
          Solo {producto.stock} en stock
        </p>
      </div>
    );
  }
  return null;
};
