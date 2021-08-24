import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartSlice: [],
  },
  reducers: {
    addCartItem: (state, action) => {
      state.cartSlice.push(action.payload);
    },
    deleteCartItem: (state, action) => {
      let values = state.cartSlice.filter((v) => v.id !== id);
      state.cartSlice = values;
    },
    resetCart: (state, action) => {
      let values = [];
      state.cartSlice = values;
    },
  },
});

export const { addCartItem, deleteCartItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
