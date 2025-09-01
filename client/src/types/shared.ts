export type LoadingState = "idle" | "pending" | "succeeded" | "failed";

export interface BaseEntity {
  id: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface DBResponseQuery<T> {
  data: T[];
  total: number; // total de registros en la colección (para paginación)
  page: number; // 1-based
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface DBResponseCommand<T> {
  data: T;
  message: string;
  success: boolean;
}

export type SortDir = "asc" | "desc";

export interface GetItemParamsBase<T> {
  page: number; // 1-based
  limit: number;
  search?: string;
  sortBy?: keyof T | string;
  sortDir?: SortDir;
}

export enum ReactQueryKeys {
  PRODUCTS = "products",
  PRODUCT = "product",
  CATEGORIES = "categories",
  ORDERS = "orders",
  ORDER = "order",
  CHECKOUT = "checkout-session",
  AI = "ai",
  STORE_CUSTOMER = "store-customer",
  SESSION = "session",
}
