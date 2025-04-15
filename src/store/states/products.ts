import { ProductsState } from "@/types";
import { createSlice } from '@reduxjs/toolkit';
import {fetchFeaturedProducts,fetchProductById,fetchProducts} from '@/utilities/productSlice';
const initialState: ProductsState = {
    products: [],
    featuredProducts: [],
    currentProduct: null,
    status: 'idle',
    error: null
  };
  


export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
          },
    },
    extraReducers: (builder) => {
        builder
          // Fetch Products
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })
          
          // Featured Products
          .addCase(fetchFeaturedProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.featuredProducts = action.payload;
          })
          
          // Product by ID
          .addCase(fetchProductById.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentProduct = action.payload;
          })
          .addCase(fetchProductById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          });
      }
});
export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;