import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import productSlice from "./slices/productSlice";
export const store = configureStore({
  reducer: {
    account: accountReducer,
    product: productSlice,
  },
});
