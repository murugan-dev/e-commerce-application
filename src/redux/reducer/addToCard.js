import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const addToCardSlice = createSlice({
  name: "addToCard",
  initialState,
  reducers: {
    addToCard: (state, { payload }) => {
      state.cartItems = [...state.cartItems, payload];
    },
    removeCard: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
    }
  },
});

export const { addToCard, removeCard } = addToCardSlice.actions;
export default addToCardSlice.reducer;