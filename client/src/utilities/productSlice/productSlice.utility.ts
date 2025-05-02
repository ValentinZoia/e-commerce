// import { db } from "@/lib/firebase";
// import { Product } from "@/types";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   query,
//   where,
// } from "firebase/firestore";

// const collectionName = "productos";

// export function isProduct(data: any): data is Product {
//   return (
//     data &&
//     typeof data?.name === "string" &&
//     typeof data?.description === "string" &&
//     typeof data?.price === "number" &&
//     typeof data?.categoryId === "string" &&
//     typeof data?.image === "string" &&
//     typeof data?.stock === "number"
//   );
// }
// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const productsCol = collection(db, collectionName);

//       const snapshot = await getDocs(productsCol);

//       const products = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         const product = {
//           id: doc.id,
//           ...data,
//         };

//         if (!isProduct(product)) {
//           throw new Error(`Invalid product data for document ${doc.id}`);
//         }

//         return product;
//       });

//       return products;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const fetchFeaturedProducts = createAsyncThunk(
//   "products/fetchFeatured",
//   async (_, { rejectWithValue }) => {
//     try {
//       const q = query(
//         collection(db, collectionName),
//         where("isFeatured", "==", true)
//       );
//       const snapshot = await getDocs(q);
//       const products = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         const product = {
//           id: doc.id,
//           ...data,
//         };

//         if (!isProduct(product)) {
//           throw new Error(`Invalid product data for document ${doc.id}`);
//         }

//         return product;
//       });

//       return products;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );
// export const fetchPromotionalProducts = createAsyncThunk(
//   "products/fetchPromotional",
//   async (_, { rejectWithValue }) => {
//     try {
//       const q = query(
//         collection(db, collectionName),
//         where("isPromotion", "==", true)
//       );
//       const snapshot = await getDocs(q);
//       const products = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         const product = {
//           id: doc.id,
//           ...data,
//         };

//         if (!isProduct(product)) {
//           throw new Error(`Invalid product data for document ${doc.id}`);
//         }

//         return product;
//       });

//       return products;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const fetchNewProducts = createAsyncThunk(
//   "products/fetchNew",
//   async (_, { rejectWithValue }) => {
//     try {
//       const q = query(
//         collection(db, collectionName),
//         where("isNew", "==", true)
//       );
//       const snapshot = await getDocs(q);
//       const products = snapshot.docs.map((doc) => {
//         const data = doc.data();
//         const product = {
//           id: doc.id,
//           ...data,
//         };

//         if (!isProduct(product)) {
//           throw new Error(`Invalid product data for document ${doc.id}`);
//         }

//         return product;
//       });

//       return products;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const fetchProductById = createAsyncThunk(
//   "products/fetchById",
//   async (productId: string, { rejectWithValue }) => {
//     try {
//       const docRef = doc(db, collectionName, productId);

//       const docSnap = await getDoc(docRef);

//       if (!docSnap.exists()) {
//         throw new Error("Product not found");
//       }

//       const productData = {
//         id: docSnap.id,
//         ...docSnap.data(),
//       };

//       // Validación de tipo segura
//       if (!isProduct(productData)) {
//         throw new Error("Received data does not match Product type");
//       }

//       // Conversión de fechas de Firestore a Date
//       const product: Product = {
//         ...productData,
//         createdAt: productData.createdAt,
//         updatedAt: productData.updatedAt,
//       };

//       return product;
//     } catch (error) {
//       // Pasa solo el mensaje de error, no el objeto completo
//       return rejectWithValue(error);
//     }
//   }
// );
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/products";

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
      const data = await fetchAPI<ApiResponse<Product[]>>(API_BASE_URL);
      
      

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
      const data = await fetchAPI<ApiResponse<Product[]>>(`${API_BASE_URL}/featured`);
      
    

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
      const data = await fetchAPI<ApiResponse<Product[]>>(`${API_BASE_URL}/promotional`);
      
     

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
      const data = await fetchAPI<ApiResponse<Product[]>>(`${API_BASE_URL}/new`);
      
      

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
      const data = await fetchAPI<ApiResponse<Product>>(`${API_BASE_URL}/${productId}`);
      
      

      return data.data || null;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);