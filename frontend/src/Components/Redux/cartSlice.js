import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
