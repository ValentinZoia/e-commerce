
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const PRODUCTS_URL = `${API_BASE_URL}/api/products`;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}


// Función helper para manejar fetch requests
async function fetchAPI<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<ApiResponse<Product[]>>(PRODUCTS_URL);
      
      

      return data.data || []; 
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<ApiResponse<Product[]>>(`${PRODUCTS_URL}/featured`);
      
    

      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const fetchPromotionalProducts = createAsyncThunk(
  "products/fetchPromotional",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<ApiResponse<Product[]>>(`${PRODUCTS_URL}/promotional`);
      
     

      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const fetchNewProducts = createAsyncThunk(
  "products/fetchNew",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<ApiResponse<Product[]>>(`${PRODUCTS_URL}/new`);
      
      

      return data.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId: string, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<ApiResponse<Product>>(`${PRODUCTS_URL}/${productId}`);
      
      

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<ApiResponse<Product[]>>(`${PRODUCTS_URL}/categories/v2/${categoryId}`);
      
      

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);