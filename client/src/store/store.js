import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./reducer";
import { apiSlice } from "./apiSlice";
import  authSlice  from "./authSlice";

export const store = configureStore({
  reducer: {
    expense: expenseSlice,
    user: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
