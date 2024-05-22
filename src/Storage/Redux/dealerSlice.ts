import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dealer: [],
  search: "",
};

export const dealerSlice = createSlice({
  name: "Dealer",
  initialState: initialState,
  reducers: {
    setDealer: (state, action) => {
      state.dealer = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setDealer, setSearchItem } = dealerSlice.actions;
export const dealerReducer = dealerSlice.reducer;
