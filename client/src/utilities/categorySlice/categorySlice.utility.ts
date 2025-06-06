
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const CATEGORIES_URL = `${API_BASE_URL}/api/categories`;




// Función helper para manejar fetch requests
async function fetchAPI<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<Category[]>(CATEGORIES_URL);
      
      

      return data || []; 
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);



export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const data = await fetchAPI<Category>(`${CATEGORIES_URL}/${categoryId}`);
      
      

      return data || null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);
