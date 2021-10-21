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
    tokenDuration: localStorage.getItem("user_token_duration") || null,
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
    setTokenDurationToReducer: (state, action) => {
      state.tokenDuration = action.payload;
      localStorage.setItem("user_token_duration", state.tokenDuration);
    },
    resetTokenToReducer: (state) => {
      state.token = null;
      state.tokenDuration = null;
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_token_duration");
    },
  },
});

export const {
  setUserToReducer,
  setOrdersToReducer,
  setTokenToReducer,
  resetTokenToReducer,
  setTokenDurationToReducer,
} = userSlice.actions;
export default userSlice.reducer;
