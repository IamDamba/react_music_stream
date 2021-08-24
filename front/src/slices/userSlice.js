import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;

      let localUserToken = localStorage.getItem("user_token");
      if (localUserToken == null) {
        localStorage.setItem("user_token", state.token);
      }
    },
    getUserToken: (state) => {
      state.token = localStorage.getItem("user_token");
    },
  },
});

export const { getUser, setUserToken, getUserToken } = userSlice.actions;
export default userSlice.reducer;
