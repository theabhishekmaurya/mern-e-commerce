import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import activeProdReducer from "./activeProdSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  activeProd: activeProdReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
