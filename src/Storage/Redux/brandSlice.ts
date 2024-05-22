import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: [],
  search: "",
};

export const brandSlice = createSlice({
  name: "Brand",
  initialState: initialState,
  reducers: {
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setBrand, setSearchItem } = brandSlice.actions;
export const brandReducer = brandSlice.reducer;
