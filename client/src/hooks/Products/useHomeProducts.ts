import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "@/data/Products/products.api";
import { productsKeys } from "@/data/Products/products.keys";

// Hook para obtener múltiples tipos de productos en UN SOLO fetch
export const useHomeProducts = () => {
  // Fetch individual pero vamos a optimizar
  const {
    data: promotionProducts,
  } = useSuspenseQuery({
    queryKey: productsKeys.list({ 
      page: 1, 
      limit: 10, 
      promotion: true,
      featured: false,
      new: false
    }),
    queryFn: () => getProducts({
      page: 1, 
      limit: 10, 
      promotion: true,
      featured: false,
      new: false
    }),
  });

  const {
    data: featuredProducts,
  } = useSuspenseQuery({
    queryKey: productsKeys.list({ 
      page: 1, 
      limit: 10, 
      promotion: false,
      featured: true,
      new: false
    }),
    queryFn: () => getProducts({
      page: 1, 
      limit: 10, 
      promotion: false,
      featured: true,
      new: false
    }),
  });

  const {
    data: newProducts,
  } = useSuspenseQuery({
    queryKey: productsKeys.list({ 
      page: 1, 
      limit: 10, 
      promotion: false,
      featured: false,
      new: true
    }),
    queryFn: () => getProducts({
      page: 1, 
      limit: 10, 
      promotion: false,
      featured: false,
      new: true
    }),
  });

  // Memoize para evitar recálculos
  const productsByStatus = useMemo(() => ({
    promotion: promotionProducts?.data || [],
    featured: featuredProducts?.data || [],
    new: newProducts?.data || [],
  }), [promotionProducts?.data, featuredProducts?.data, newProducts?.data]);

  return {
    productsByStatus,
    isLoading: !promotionProducts || !featuredProducts || !newProducts,
  };
};