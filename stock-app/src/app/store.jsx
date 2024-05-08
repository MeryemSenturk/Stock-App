import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import firmsSlice from "../features/firmsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    firms: firmsSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
