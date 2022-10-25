import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartTotal: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    resetCart: (state, action) => {
      state.cartItems = [];
      state.cartTotal = 0;
    },
  },
});

export const { setCart, setCartTotal, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
