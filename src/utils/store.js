import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice";
import { productSlice } from "./ProductApi";

export const store = configureStore ({
   reducer:{
     cart:cartReducer,
     [productSlice.reducerPath]:productSlice.reducer,
   },
   middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware().concat(productSlice.middleware)
})