import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../slices/searchSlice";
import userReducer from "../slices/userSlice";
import trackReducer from "../slices/trackSlice";
import cartReducer from "../slices/cartSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    user: userReducer,
    trackSlice: trackReducer,
    cartSlice: cartReducer,
  },
});
