import { Category, CategoriesState } from "@/types";
import { createSlice } from '@reduxjs/toolkit';
import {fetchCategories, fetchCategoryById} from '@/utilities/categorySlice';
const initialState: CategoriesState = {
    categories: [],
    currentCategory: null,
    status: 'idle',
    error: null,
    lastFetched: {
      all: undefined,
      
      singleCategory: undefined
    } 
  };
  


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearCurrentCategory: (state) => {
            state.currentCategory = null;
          },
    },
    extraReducers: (builder) => {
        builder
          // Fetch Products
          .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categories = action.payload as Category[];
            state.lastFetched.all = Date.now(); 
          })
          .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })
        
          // Category by ID
          .addCase(fetchCategoryById.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentCategory = action.payload as Category;
            state.lastFetched.singleCategory = Date.now();
          })
          .addCase(fetchCategoryById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })

          
      }
});
export const { clearCurrentCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;