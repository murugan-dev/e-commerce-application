import { configureStore } from "@reduxjs/toolkit";
import addToCardReducer from "./reducer/addToCard";

export default configureStore({
  reducer: {
    addToCard: addToCardReducer,
  },
});