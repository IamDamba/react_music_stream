import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {
      username: null,
      email: null,
    },
    orders: [],
    token: localStorage.getItem("user_token") || null,
  },
  reducers: {
    setUserToReducer: (state, action) => {
      state.user = action.payload;
    },
    setOrdersToReducer: (state, action) => {
      state.orders = action.payload;
    },
    setTokenToReducer: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("user_token", state.token);
    },
    resetTokenToReducer: (state) => {
      state.token = null;
      localStorage.removeItem("user_token");
    },
  },
});

export const {
  setUserToReducer,
  setOrdersToReducer,
  setTokenToReducer,
  resetTokenToReducer,
} = userSlice.actions;
export default userSlice.reducer;
