import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    value: "",
  },
  reducers: {
    setSearchValuetoReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchValuetoReducer } = searchSlice.actions;
export default searchSlice.reducer;
