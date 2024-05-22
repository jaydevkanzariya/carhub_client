import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  variant: [],
  search: "",
};

export const variantSlice = createSlice({
  name: "Variant",
  initialState: initialState,
  reducers: {
    setVariant: (state, action) => {
      state.variant= action.payload;
    },
    setSearchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setVariant, setSearchItem } = variantSlice.actions;
export const variantReducer = variantSlice.reducer;
