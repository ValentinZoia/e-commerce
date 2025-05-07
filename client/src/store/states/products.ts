import { Product, ProductsState } from "@/types";
import { createSlice } from '@reduxjs/toolkit';
import {fetchFeaturedProducts,fetchProductById,fetchProducts,fetchPromotionalProducts,fetchNewProducts, fetchProductsByCategory} from '@/utilities/productSlice';
const initialState: ProductsState = {
    products: [],
    featuredProducts: [],
    promotionalProducts: [],
    newProducts:[],
    categoryProducts: [],
    currentProduct: null,
    status: 'idle',
    error: null,
    lastFetched: {
      all: undefined,
      new: undefined,
      featured: undefined,
      promotion: undefined,
      singleProduct: undefined,
      forCategory: undefined,
    } 
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
            state.lastFetched.all = Date.now(); 
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
            state.featuredProducts = action.payload as Product[];
            state.lastFetched.featured = Date.now();
          })
          .addCase(fetchFeaturedProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })

          // Promotional Products
          .addCase(fetchPromotionalProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchPromotionalProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.promotionalProducts = action.payload as Product[];
            state.lastFetched.promotion = Date.now();
          })
          .addCase(fetchPromotionalProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })

           // New Products
           .addCase(fetchNewProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchNewProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.newProducts = action.payload as Product[];
            state.lastFetched.new = Date.now();
          })
          .addCase(fetchNewProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })

          
          // Product by ID
          .addCase(fetchProductById.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.currentProduct = action.payload;
            state.lastFetched.singleProduct = Date.now();
          })
          .addCase(fetchProductById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          })

          // Product by Category
          .addCase(fetchProductsByCategory.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categoryProducts = action.payload as Product[];
            state.lastFetched.forCategory = Date.now();
          })
          .addCase(fetchProductsByCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
          });
      }
});
export const { clearCurrentProduct } = productsSlice.actions;
export default productsSlice.reducer;