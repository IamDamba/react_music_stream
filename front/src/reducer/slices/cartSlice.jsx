import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart_list: JSON.parse(localStorage.getItem("Cart")) || [],
    cart_item: {
      id: null,
      image: null,
      title: null,
      licensing: null,
      price: null,
    },
    cart_text: "Add to cart",
  },
  reducers: {
    setCartTextFromReducer: (state, action) => {
      if (action.payload.surrogate !== action.payload.id) {
        state.cart_text = "Add to cart";
      } else {
        state.cart_text = "Already in cart";
      }
    },
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
      localStorage.removeItem("Cart");
    },
    removeCartListItemToReducer: (state, action) => {
      state.cart_list.splice(
        state.cart_list.findIndex((e) => e.id === action.payload),
        1
      );
      localStorage.setItem("Cart", JSON.stringify(state.cart_list));
      if (state.cart_list.length <= 0) {
        localStorage.removeItem("Cart");
      }
    },
    addItemToReducerList: (state, action) => {
      state.cart_list.push({
        id: state.cart_item.id,
        image: state.cart_item.image,
        title: state.cart_item.title,
        licensing: action.payload.licensing,
        price: action.payload.price,
      });
      let listString = JSON.stringify(state.cart_list);
      localStorage.setItem("Cart", listString);
    },
  },
});

export const {
  setCartItemToReducer,
  resetCartItemToReducer,
  addItemToReducerList,
  resetCartListToReducer,
  removeCartListItemToReducer,
  setCartTextFromReducer,
} = cartSlice.actions;
export default cartSlice.reducer;
