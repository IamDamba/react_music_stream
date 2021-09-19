import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart_list: [],
    cart_item: {
      id: null,
      image: null,
      title: null,
      licensing: null,
      price: null,
    },
  },
  reducers: {
    setCartItemToReducer: (state, action) => {
      state.cart_item.id = action.payload.id;
      state.cart_item.image = action.payload.image;
      state.cart_item.title = action.payload.title;
    },
    resetCartItemToReducer: (state) => {
      state.cart_item.id = null;
      state.cart_item.image = null;
      state.cart_item.title = null;
      state.cart_item.licensing = null;
      state.cart_item.price = null;
    },
    resetCartListToReducer: (state) => {
      state.cart_list = [];
    },
    addItemToReducerList: (state, action) => {
      state.cart_list.push({
        id: state.cart_item.id,
        image: state.cart_item.image,
        title: state.cart_item.title,
        licensing: action.payload.licensing,
        price: action.payload.price,
      });
    },
  },
});

export const {
  setCartItemToReducer,
  resetCartItemToReducer,
  addItemToReducerList,
  resetCartListToReducer,
} = cartSlice.actions;
export default cartSlice.reducer;
