import { AuthState, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createSession: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    deleteSession: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {createSession, deleteSession} = authSlice.actions

// Selectores simples



export default authSlice.reducer;