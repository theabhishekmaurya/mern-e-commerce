import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: "",
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
