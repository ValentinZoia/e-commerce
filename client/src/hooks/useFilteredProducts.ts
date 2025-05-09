import { Product, ProductStatus } from "@/types"
import { useFetchProducts } from "./useFetchProducts"
import { useEffect, useState } from "react"
import { Filters } from "@/types/filters"

interface Props {
    productsStatus: ProductStatus
    categoryId?: string
}

export const useFilteredProducts = ({productsStatus, categoryId}: Props)=>{
    const { status, error, products} = useFetchProducts({productsStatus: productsStatus, categoryId: categoryId});
    const [filters, setFilters] = useState<Filters>({});
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        if (products) {
          let result = [...products];
          
          // Aplicar filtros
          if (filters.category && !categoryId) {
            if(filters.category === 'all') result = result.filter(p => p.categoryId);

            if(filters.category !== 'all'){
              result = result.filter(p => p.categoryId === filters.category);
            
            }
            
          }
          
          if (filters.minPrice !== undefined) {
            result = result.filter(p => p.price >= filters.minPrice!);
          }
          
          if (filters.maxPrice !== undefined) {
            result = result.filter(p => p.price <= filters.maxPrice!);
          }
          
          if (filters.inStock) {
            result = result.filter(p => p.stock > 0);
          }
          
          if (filters.isFeatured) {
            result = result.filter(p => p.isFeatured);
          }
          
          if (filters.isPromotion) {
            result = result.filter(p => p.isPromotion || p.discountPercentage);
          }
          
          if (filters.isNew) {
            result = result.filter(p => p.isNew);
          }
          
          if (filters.size) {
            if(filters.size === 'all') result = result.filter(p => p.sizes?.some(size => size.stock > 0));

            if(filters.size !== 'all'){
              result = result.filter(p => 
              p.sizes?.some(size => size.name === filters.size && size.stock > 0)
            );
            }
            
            
          }
          
          if (filters.freeShipping) {
            result = result.filter(p => p.isFreeShipping);
          }
          
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(p => 
              p.name.toLowerCase().includes(query) || 
              (p.description && p.description.toLowerCase().includes(query))
            );
          }
          
          // Aplicar ordenamiento
          if (filters.sortBy) {
            switch(filters.sortBy) {
              case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
              case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
              case 'newest':
                result.sort((a, b) => 
                  new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
                );
                break;
              case 'best-discount':
                result.sort((a, b) => 
                  (b.discountPercentage || 0) - (a.discountPercentage || 0)
                );
                break;
            }
          }
          
          setFilteredProducts(result);
        }
      }, [products, filters]);

      return {
        status,
        error,
        products: filteredProducts,
        filters,
        setFilters,
        originalProducts: products
      };
}