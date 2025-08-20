export interface Filters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  freeShipping?: boolean;
  size?: string;
  isNew?: boolean;
  isPromotion?: boolean;
  isFeatured?: boolean;
  searchQuery?: string;
  sortBy?: "price-asc" | "price-desc" | "newest" | "best-discount";
  priceRange?: string;
}
