// hooks/useProductsFilters.ts
import { useState, useEffect } from "react";
import { Filters } from "@/types/filters";
import { GetProductsParams, ProductStatus } from "@/types";

interface UseProductsFiltersProps {
  productsStatus: ProductStatus;
  categoryId?: string;
  search?: string;
}

export const useProductsFilters = ({
  productsStatus,
  categoryId,
  search,
}: UseProductsFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Mapear filtros locales a parámetros de query para useProductsSuspense
  const mapFiltersToQuery = (filters: Filters) => {
    const queryParams: Omit<GetProductsParams, "page" | "limit"> = {};

    // Filtros booleanos específicos del ProductStatus
    if (productsStatus === ProductStatus.FEATURED) queryParams.featured = true;
    if (productsStatus === ProductStatus.PROMOTION)
      queryParams.promotion = true;
    if (productsStatus === ProductStatus.NEW) queryParams.new = true;

    // Categoría - usar categoryId prop o filtro
    if (categoryId) {
      queryParams.category = categoryId;
    } else if (filters.category && filters.category !== "all") {
      queryParams.category = filters.category;
    }

    // Search query
    if (search) {
      queryParams.search = search;
    } else if (filters.searchQuery) {
      queryParams.search = filters.searchQuery;
    }

    // Filtros de precio
    if (filters.minPrice !== undefined) {
      queryParams.priceMin = filters.minPrice;
    }
    if (filters.maxPrice !== undefined) {
      queryParams.priceMax = filters.maxPrice;
    }

    // Filtros booleanos
    if (filters.inStock) {
      queryParams.inStock = true;
    }
    if (filters.freeShipping) {
      queryParams.freeShipping = true;
    }

    // Solo agregar estos filtros si no están definidos por ProductStatus
    if (productsStatus !== ProductStatus.FEATURED && filters.isFeatured) {
      queryParams.featured = true;
    }
    if (productsStatus !== ProductStatus.PROMOTION && filters.isPromotion) {
      queryParams.promotion = true;
    }
    if (productsStatus !== ProductStatus.NEW && filters.isNew) {
      queryParams.new = true;
    }

    // Filtro de talla
    if (filters.size && filters.size !== "all") {
      queryParams.size = filters.size;
    }

    // Ordenamiento - mapear formato local a formato API
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          queryParams.sortBy = "price";
          queryParams.sortDir = "asc";
          break;
        case "price-desc":
          queryParams.sortBy = "price";
          queryParams.sortDir = "desc";
          break;
        case "newest":
          queryParams.sortBy = "createdAt";
          queryParams.sortDir = "desc";
          break;
        case "best-discount":
          queryParams.sortBy = "discountPercentage";
          queryParams.sortDir = "desc";
          break;
        default:
          queryParams.sortBy = undefined;
          queryParams.sortDir = undefined;
      }
    } else {
      // Default sorting
      queryParams.sortBy = undefined;
      queryParams.sortDir = undefined;
    }

    return queryParams;
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, search, categoryId]);

  const clearFilters = () => {
    setFilters({});
  };

  const removeFilter = (filterKey: keyof Filters) => {
    const newFilters = { ...filters };
    if (filterKey === "category" || filterKey === "size") {
      newFilters[filterKey] = "all";
    } else if (filterKey === "priceRange") {
      delete newFilters.minPrice;
      delete newFilters.maxPrice;
    } else {
      delete newFilters[filterKey];
    }
    setFilters(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.category && filters.category !== "all") count++;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined)
      count++;
    if (filters.inStock) count++;
    if (filters.isFeatured) count++;
    if (filters.isPromotion) count++;
    if (filters.isNew) count++;
    if (filters.freeShipping) count++;
    if (filters.size && filters.size !== "all") count++;
    if (filters.sortBy && filters.sortBy !== "price-desc") count++;
    return count;
  };

  const queryParams = mapFiltersToQuery(filters);

  return {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    queryParams,
    clearFilters,
    removeFilter,
    getActiveFiltersCount,
  };
};
