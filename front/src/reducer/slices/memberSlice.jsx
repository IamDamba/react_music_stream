import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "memberSlice",
  initialState: {
    member_token: localStorage.getItem("member_token") || null,
    member: {
      username: null,
      email: null,
    },
  },
  reducers: {
    setMemberToReducer: (state, action) => {
      state.member = action.payload;
    },
    setMemberTokenToReducer: (state, action) => {
      state.member_token = action.payload;
      localStorage.setItem("member_token", action.payload);
    },
    resetMemberFromReducer: (state, action) => {
      state.member = {
        username: null,
        email: null,
      };
    },
  },
});

export const {
  setMemberToReducer,
  setMemberTokenToReducer,
  resetMemberFromReducer,
} = memberSlice.actions;
export default memberSlice.reducer;
