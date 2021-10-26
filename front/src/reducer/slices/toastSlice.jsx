import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toastSlice",
  initialState: {
    toast_list: [],
    check_color: "#5cb85c",
    error_color: "#d9534f",
    info_color: "#5bc0de",
    warning_color: "#f0ad4e",
  },
  reducers: {
    setToastItemToReducer: (state, action) => {
      state.toast_list.push(action.payload);
    },
    removeToastItemFromReducer: (state, action) => {
      state.toast_list.splice(
        state.toast_list.findIndex((e) => e.id === action.payload),
        1
      );
    },
  },
});

export const { setToastItemToReducer, removeToastItemFromReducer } =
  toastSlice.actions;
export default toastSlice.reducer;
