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
  },
});

export const { setCart, setCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
