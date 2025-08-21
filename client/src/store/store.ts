import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Importación correcta
import {
  cartSlice,
  //  productsSlice,
  //  categoriesSlice,
  authSlice,
} from "./states";
import { useDispatch } from "react-redux";

// Configuración de persistencia
const cartPersistConfig = {
  key: "cart",
  storage, // Usa el storage importado de redux-persist
  whitelist: ["items", "totalItems", "totalPrice"], // Especifica qué campos persistir
};

export const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartSlice.reducer),
    // products: productsSlice.reducer,
    // categories: categoriesSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store); // Exporta el persistor

// Tipado para TypeScript (opcional pero recomendado)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hook personalizado para useDispatch con tipos
export const useAppDispatch = () => useDispatch<AppDispatch>();
