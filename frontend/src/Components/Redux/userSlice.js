import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDet: {
      name: "",
      type: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.userDet.name = action.payload.name;
      state.userDet.type = action.payload.type;
    },
    resetUser: (state) => {
      state.userDet = {};
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
