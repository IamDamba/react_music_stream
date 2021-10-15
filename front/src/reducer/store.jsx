import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import tracksReducer from "./slices/tracksSlices";
import playerReducer from "./slices/playerSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";

const store = configureStore({
  reducer: {
    searchReducer: searchReducer,
    tracksReducer: tracksReducer,
    playerReducer: playerReducer,
    cartReducer: cartReducer,
    userReducer: userReducer,
    toastReducer: toastReducer,
  },
});

export default store;
